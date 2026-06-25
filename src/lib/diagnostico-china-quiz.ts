export type AnswerField = 'negociacao' | 'objetivo' | 'porte' | 'produtos' | 'maiorDesafio' | 'prazo' | 'experiencia';

export type Answers = {
  negociacao: string;
  objetivo: string;
  porte: string;
  produtos: string;
  maiorDesafio: string;
  prazo: string;
  experiencia: string;
};

export interface QuizState {
  currentStep: number;
  answers: Answers;
  totalSteps: number;
  recomendacao: string;
  answer(field: AnswerField, value: string): QuizState;
  isComplete(): boolean;
  toWhatsAppText(): string;
}

const FIELDS: AnswerField[] = ['negociacao', 'objetivo', 'porte', 'produtos', 'maiorDesafio', 'prazo', 'experiencia'];

function findFirstEmpty(a: Answers): number {
  for (let i = 0; i < FIELDS.length; i++) {
    const v = a[FIELDS[i]];
    if (v === '') return i;
  }
  return FIELDS.length;
}

function calcularRecomendacao(a: Answers): string {
  if (a.experiencia === 'sim') return 'consultoria-avulsa-90';
  if (a.prazo === 'longo') return 'diagnostico-inicial';
  return 'plano-mensal';
}

export function createDiagnosticoQuiz(): QuizState {
  const empty: Answers = {
    negociacao: '',
    objetivo: '',
    porte: '',
    produtos: '',
    maiorDesafio: '',
    prazo: '',
    experiencia: '',
  };

  function build(answers: Answers): QuizState {
    const step = findFirstEmpty(answers);
    return {
      currentStep: step,
      answers: { ...answers },
      totalSteps: FIELDS.length + 1,
      recomendacao: calcularRecomendacao(answers),
      answer(field, value) {
        const next = { ...answers, [field]: value };
        return build(next);
      },
      isComplete() {
        return answers.negociacao !== '' && answers.objetivo !== '' &&
          answers.porte !== '' && answers.produtos !== '' &&
          answers.maiorDesafio !== '' && answers.prazo !== '' &&
          answers.experiencia !== '';
      },
      toWhatsAppText() {
        const recomendacoes: Record<string, string> = {
          'diagnostico-inicial': 'Diagnóstico Inicial (30 min)',
          'consultoria-avulsa-45': 'Consultoria Avulsa 45 min',
          'consultoria-avulsa-90': 'Consultoria Avulsa 90 min',
          'plano-mensal': 'Plano Mensal (4 sessões)',
        };
        return (
          '🇨🇳 *Diagnóstico China*\n\n' +
          '📥 *Checklist solicitado:* 7 Erros ao Negociar com China\n\n' +
          `📋 *Negociações:* ${answers.negociacao}\n` +
          `🎯 *Objetivo:* ${answers.objetivo}\n` +
          `🏢 *Porte:* ${answers.porte}\n` +
          `📦 *Produtos:* ${answers.produtos}\n` +
          `💪 *Maior Desafio:* ${answers.maiorDesafio}\n` +
          `⏱ *Prazo:* ${answers.prazo}\n` +
          `🌐 *Experiência:* ${answers.experiencia}\n` +
          `\n🔹 *Recomendação:* ${recomendacoes[calcularRecomendacao(answers)] || 'Plano Mensal'}`
        );
      },
    };
  }

  return build(empty);
}
