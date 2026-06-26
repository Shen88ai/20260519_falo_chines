export type AnswerField = 'name' | 'surname' | 'translationType' | 'specialNameDescription' | 'motivation' | 'style' | 'dedication';

export type Answers = {
  name: string;
  surname: string;
  translationType: string;
  specialNameDescription: string;
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

const FIELDS: AnswerField[] = ['name', 'surname', 'translationType', 'motivation', 'style', 'dedication'];

function findFirstEmpty(a: Answers): number {
  for (let i = 0; i < FIELDS.length; i++) {
    const v = a[FIELDS[i]];
    if (v === '' || v === false) return i;
  }
  return FIELDS.length;
}

export function createQuiz(): QuizState {
  const empty: Answers = { name: '', surname: '', translationType: '', specialNameDescription: '', motivation: '', style: '', dedication: false };

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
        if (answers.name === '' || answers.surname === '' || answers.translationType === '' ||
          answers.motivation === '' || answers.style === '' ||
          answers.dedication === false) return false;
        if (answers.translationType === 'especial' && answers.specialNameDescription === '') return false;
        return true;
      },
      toWhatsAppText() {
        let desc = '';
        if (answers.translationType === 'especial' && answers.specialNameDescription) {
          desc = `\n💬 *Descrição:* ${answers.specialNameDescription}`;
        }
        return (
          '🀄 *Pedido de Nome Chinês Completo*\n\n' +
          `👤 *Nome:* ${answers.name}\n` +
          `🏮 *Sobrenome:* ${answers.surname}\n` +
          `🎯 *Tradução:* ${answers.translationType}${desc}\n` +
          `💖 *Motivação:* ${answers.motivation}\n` +
          `🎨 *Estilo:* ${answers.style}\n` +
          `📝 *Dedicatória:* ${answers.dedication ? 'Sim 💖' : 'Não 🙅‍♀️'}`
        );
      },
    };
  }

  return build(empty);
}
