export type AnswerField = 'name' | 'translationType' | 'motivation' | 'style' | 'dedication';

export type Answers = {
  name: string;
  translationType: string;
  motivation: string;
  style: string;
  dedication: boolean;
};

export interface QuizState {
  currentStep: number;
  answers: Answers;
  totalSteps: number;
  answer(field: AnswerField, value: string | boolean): QuizState;
  isComplete(): boolean;
  toWhatsAppText(): string;
}

const FIELDS: AnswerField[] = ['name', 'translationType', 'motivation', 'style', 'dedication'];

function findFirstEmpty(a: Answers): number {
  for (let i = 0; i < FIELDS.length; i++) {
    const v = a[FIELDS[i]];
    if (v === '' || v === false) return i;
  }
  return FIELDS.length;
}

export function createQuiz(): QuizState {
  const empty: Answers = { name: '', translationType: '', motivation: '', style: '', dedication: false };

  function build(answers: Answers): QuizState {
    const step = findFirstEmpty(answers);
    return {
      currentStep: step,
      answers: { ...answers },
      totalSteps: FIELDS.length + 1,
      answer(field, value) {
        const next = { ...answers, [field]: value };
        return build(next);
      },
      isComplete() {
        return answers.name !== '' && answers.translationType !== '' &&
          answers.motivation !== '' && answers.style !== '' &&
          answers.dedication !== false;
      },
      toWhatsAppText() {
        return (
          '🀄 *Pedido de Nome Chinês*\n\n' +
          `👤 *Nome:* ${answers.name}\n` +
          `🎯 *Tradução:* ${answers.translationType}\n` +
          `💖 *Motivação:* ${answers.motivation}\n` +
          `🎨 *Estilo:* ${answers.style}\n` +
          `📝 *Dedicatória:* ${answers.dedication ? 'Sim 💖' : 'Não 🙅‍♀️'}`
        );
      },
    };
  }

  return build(empty);
}
