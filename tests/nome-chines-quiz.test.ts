import { describe, it, expect } from 'vitest';
import { createQuiz } from '../src/lib/nome-chines-quiz';

describe('NomeChinesQuiz - state management', () => {
  it('deve criar um quiz state inicial com todas as perguntas', () => {
    const quiz = createQuiz();
    expect(quiz.currentStep).toBe(0);
    expect(quiz.answers.name).toBe('');
    expect(quiz.answers.translationType).toBe('');
    expect(quiz.answers.motivation).toBe('');
    expect(quiz.answers.style).toBe('');
    expect(quiz.answers.dedication).toBe(false);
    expect(quiz.totalSteps).toBe(6);
  });

  it('deve registrar resposta e avançar para o próximo passo', () => {
    const quiz = createQuiz();
    const updated = quiz.answer('name', 'Maria');
    expect(updated.answers.name).toBe('Maria');
    expect(updated.currentStep).toBe(1);
  });

  it('deve indicar quando chegou ao fim do quiz', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'João')
      .answer('translationType', 'som')
      .answer('motivation', 'tattoo')
      .answer('style', 'ink')
      .answer('dedication', true);
    expect(finalQuiz.isComplete()).toBe(true);
  });

  it('deve gerar mensagem para WhatsApp com todas as respostas', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'Ana Clara')
      .answer('translationType', 'significado')
      .answer('motivation', 'presente')
      .answer('style', 'futuristic')
      .answer('dedication', true);
    const msg = finalQuiz.toWhatsAppText();
    expect(msg).toContain('Ana Clara');
    expect(msg).toContain('significado');
    expect(msg).toContain('presente');
    expect(msg).toContain('futuristic');
    expect(msg).toContain('Sim');
  });
});
