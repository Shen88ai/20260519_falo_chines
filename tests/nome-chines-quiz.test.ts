import { describe, it, expect } from 'vitest';
import { createQuiz } from '../src/lib/nome-chines-quiz';

describe('NomeChinesQuiz - state management', () => {
  it('deve criar um quiz state inicial com todas as perguntas', () => {
    const quiz = createQuiz();
    expect(quiz.currentStep).toBe(0);
    expect(quiz.answers.name).toBe('');
    expect(quiz.answers.surname).toBe('');
    expect(quiz.answers.translationType).toBe('');
    expect(quiz.answers.specialNameDescription).toBe('');
    expect(quiz.answers.motivation).toBe('');
    expect(quiz.answers.style).toBe('');
    expect(quiz.answers.dedication).toBe(false);
    expect(quiz.totalSteps).toBe(7);
  });

  it('deve registrar resposta de nome e avançar para sobrenome', () => {
    const quiz = createQuiz();
    const updated = quiz.answer('name', 'Maria');
    expect(updated.answers.name).toBe('Maria');
    expect(updated.currentStep).toBe(1);
  });

  it('deve registrar sobrenome e avançar para tipo de tradução', () => {
    const quiz = createQuiz();
    const s1 = quiz.answer('name', 'João');
    const s2 = s1.answer('surname', 'Silva');
    expect(s2.answers.surname).toBe('Silva');
    expect(s2.currentStep).toBe(2);
  });

  it('deve completar sem descrição especial quando tradução não é "especial"', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'João')
      .answer('surname', 'Silva')
      .answer('translationType', 'som')
      .answer('motivation', 'tattoo')
      .answer('style', 'ink')
      .answer('dedication', true);
    expect(finalQuiz.isComplete()).toBe(true);
    expect(finalQuiz.currentStep).toBe(6);
  });

  it('deve rejeitar completude quando tradução é "especial" sem descrição', () => {
    const quiz = createQuiz();
    const partial = quiz
      .answer('name', 'Maria')
      .answer('surname', 'Oliveira')
      .answer('translationType', 'especial')
      .answer('motivation', 'presente')
      .answer('style', 'futuristic')
      .answer('dedication', true);
    expect(partial.isComplete()).toBe(false);
  });

  it('deve aceitar completude quando tradução é "especial" com descrição', () => {
    const quiz = createQuiz();
    const complete = quiz
      .answer('name', 'Maria')
      .answer('surname', 'Oliveira')
      .answer('translationType', 'especial')
      .answer('specialNameDescription', 'Força e coragem, me identifico com a deusa Atena')
      .answer('motivation', 'presente')
      .answer('style', 'futuristic')
      .answer('dedication', true);
    expect(complete.isComplete()).toBe(true);
  });

  it('deve gerar mensagem WhatsApp com descrição especial incluída', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'Ana Clara')
      .answer('surname', 'Oliveira')
      .answer('translationType', 'especial')
      .answer('specialNameDescription', 'Luz e sabedoria, me identifico com a minha avó')
      .answer('motivation', 'presente')
      .answer('style', 'futuristic')
      .answer('dedication', true);
    const msg = finalQuiz.toWhatsAppText();
    expect(msg).toContain('Ana Clara');
    expect(msg).toContain('Oliveira');
    expect(msg).toContain('especial');
    expect(msg).toContain('Luz e sabedoria');
    expect(msg).toContain('Sim');
  });
});
