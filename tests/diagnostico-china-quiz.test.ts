import { describe, it, expect } from 'vitest';
import { createDiagnosticoQuiz } from '../src/lib/diagnostico-china-quiz';

describe('DiagnosticoChinaQuiz - state management', () => {
  it('deve criar um quiz state inicial com todas as perguntas', () => {
    const quiz = createDiagnosticoQuiz();
    expect(quiz.currentStep).toBe(0);
    expect(quiz.answers.negociacao).toBe('');
    expect(quiz.answers.objetivo).toBe('');
    expect(quiz.answers.porte).toBe('');
    expect(quiz.answers.maiorDesafio).toBe('');
    expect(quiz.answers.prazo).toBe('');
    expect(quiz.answers.experiencia).toBe('');
    expect(quiz.totalSteps).toBe(8);
  });

  it('deve registrar resposta e avançar para o próximo passo', () => {
    const quiz = createDiagnosticoQuiz();
    const updated = quiz.answer('negociacao', 'pesquisando');
    expect(updated.answers.negociacao).toBe('pesquisando');
    expect(updated.currentStep).toBe(1);
  });

  it('deve registrar respostas sequencialmente até completar', () => {
    const quiz = createDiagnosticoQuiz();
    const finalQuiz = quiz
      .answer('negociacao', 'pesquisando')
      .answer('objetivo', 'importar')
      .answer('porte', 'pequena')
      .answer('produtos', 'Eletrônicos')
      .answer('maiorDesafio', 'fornecedores')
      .answer('prazo', 'imediato')
      .answer('experiencia', 'nao');
    expect(finalQuiz.isComplete()).toBe(true);
  });

  it('deve gerar mensagem para WhatsApp com todas as respostas', () => {
    const quiz = createDiagnosticoQuiz();
    const finalQuiz = quiz
      .answer('negociacao', 'pesquisando')
      .answer('objetivo', 'importar')
      .answer('porte', 'pequena')
      .answer('produtos', 'Eletrônicos e automação')
      .answer('maiorDesafio', 'fornecedores')
      .answer('prazo', 'imediato')
      .answer('experiencia', 'nao');
    const msg = finalQuiz.toWhatsAppText();
    expect(msg).toContain('Diagnóstico China');
    expect(msg).toContain('7 Erros ao Negociar');
    expect(msg).toContain('pesquisando');
    expect(msg).toContain('importar');
    expect(msg).toContain('pequena');
    expect(msg).toContain('Eletrônicos e automação');
    expect(msg).toContain('fornecedores');
    expect(msg).toContain('imediato');
    expect(msg).toContain('nao');
  });

  it('deve retornar produto recomendado baseado nas respostas', () => {
    const quiz = createDiagnosticoQuiz();
    const finalQuiz = quiz
      .answer('negociacao', 'pesquisando')
      .answer('objetivo', 'importar')
      .answer('porte', 'pequena')
      .answer('produtos', 'Roupas')
      .answer('maiorDesafio', 'fornecedores')
      .answer('prazo', 'imediato')
      .answer('experiencia', 'nao');
    expect(finalQuiz.recomendacao).toBe('plano-mensal');
  });

  it('deve recomendar consultoria avulsa para quem já tem experiencia', () => {
    const quiz = createDiagnosticoQuiz();
    const finalQuiz = quiz
      .answer('negociacao', 'sim-contato')
      .answer('objetivo', 'importar')
      .answer('porte', 'media')
      .answer('produtos', 'Maquinário')
      .answer('maiorDesafio', 'precos')
      .answer('prazo', 'medio')
      .answer('experiencia', 'sim');
    expect(finalQuiz.recomendacao).toBe('consultoria-avulsa-90');
  });

  it('deve recomendar diagnostico inicial para quem está pesquisando', () => {
    const quiz = createDiagnosticoQuiz();
    const finalQuiz = quiz
      .answer('negociacao', 'pesquisando')
      .answer('objetivo', 'importar')
      .answer('porte', 'mei')
      .answer('produtos', 'Acessórios')
      .answer('maiorDesafio', 'cultura')
      .answer('prazo', 'longo')
      .answer('experiencia', 'nao');
    expect(finalQuiz.recomendacao).toBe('diagnostico-inicial');
  });
});
