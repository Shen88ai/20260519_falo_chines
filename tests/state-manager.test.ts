import { describe, it, expect, beforeEach, vi } from 'vitest';
import { stateManager } from '../src/lib/state-manager';

describe('Leveling State Manager', () => {
  beforeEach(() => {
    // Limpa o localStorage antes de cada teste
    localStorage.clear();
    // Reseta o estado interno do gerenciador
    stateManager.reset();
  });

  it('deve iniciar no estado "idle"', () => {
    expect(stateManager.getState()).toBe('idle');
    const data = stateManager.getData();
    expect(data.currentQuestion).toBe(1);
    expect(data.answers.motivation).toBeNull();
    expect(data.answers.goal).toBeNull();
    expect(data.answers.progress).toBeNull();
  });

  it('deve atualizar o estado para "answering" ao responder a primeira pergunta', () => {
    stateManager.answerQuestion(1, 'commercial');
    const data = stateManager.getData();
    expect(stateManager.getState()).toBe('answering');
    expect(data.answers.motivation).toBe('commercial');
    expect(data.currentQuestion).toBe(2);
  });

  it('deve transicionar para "diagnosis-complete" e calcular a Rota correta após responder todas as 3 perguntas', () => {
    // Mock do CustomEvent disparado no window
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');

    stateManager.answerQuestion(1, 'commercial');
    stateManager.answerQuestion(2, 'business');
    stateManager.answerQuestion(3, 'zero');

    const data = stateManager.getData();
    expect(stateManager.getState()).toBe('diagnosis-complete');
    expect(data.determinedPath).toBe('A'); // Rota Comercial / Negócios

    // Verifica se salvou no localStorage
    const saved = localStorage.getItem('falo-chines-journey');
    expect(saved).not.toBeNull();
    if (saved) {
      const journey = JSON.parse(saved);
      expect(journey.path).toBe('A');
      expect(journey.diagnosis.motivation).toBe('commercial');
    }

    // Verifica se emitiu o CustomEvent correto
    expect(dispatchSpy).toHaveBeenCalled();
    const eventCalls = dispatchSpy.mock.calls.map(call => call[0].type);
    expect(eventCalls).toContain('falo-chines:diagnosis-complete');
  });

  it('deve determinar Rota "B" (Viajante) se o foco principal for turismo ("travel")', () => {
    stateManager.answerQuestion(1, 'travel');
    stateManager.answerQuestion(2, 'survival');
    stateManager.answerQuestion(3, 'zero');

    const data = stateManager.getData();
    expect(data.determinedPath).toBe('B'); // Rota do Viajante Rápido
  });
});
