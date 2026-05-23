export type LevelingState = 'idle' | 'answering' | 'diagnosis-complete';

export interface LevelingStateData {
  state: LevelingState;
  answers: {
    motivation: string | null;
    goal: string | null;
    progress: string | null;
  };
  currentQuestion: number;
  determinedPath: string | null;
}

const STORAGE_KEY = 'falo-chines-journey';

class LevelingStateManager {
  private data: LevelingStateData = {
    state: 'idle',
    answers: { motivation: null, goal: null, progress: null },
    currentQuestion: 1,
    determinedPath: null,
  };

  getState(): LevelingState {
    return this.data.state;
  }

  getData(): LevelingStateData {
    return { 
      ...this.data, 
      answers: { ...this.data.answers } 
    };
  }

  /**
   * Reseta o estado interno para reinicialização ou início de nova jornada.
   */
  reset(): void {
    this.data = {
      state: 'idle',
      answers: { motivation: null, goal: null, progress: null },
      currentQuestion: 1,
      determinedPath: null,
    };
  }

  /**
   * Processa a resposta para uma das 3 perguntas do nivelamento.
   */
  answerQuestion(questionNum: number, answer: string): void {
    const key = questionNum === 1 ? 'motivation' : questionNum === 2 ? 'goal' : 'progress';
    this.data.answers[key] = answer;
    this.data.currentQuestion = Math.min(questionNum + 1, 3);

    if (questionNum < 3) {
      this.data.state = 'answering';
      this.emit('question-answered', { question: questionNum, answer });
    } else {
      this.completeDiagnosis();
    }
  }

  private completeDiagnosis(): void {
    const { motivation } = this.data.answers;
    
    // Mapeia a motivação principal para a rota de aprendizado correspondente
    if (motivation === 'commercial') {
      this.data.determinedPath = 'A'; // Rota do Executivo
    } else if (motivation === 'travel') {
      this.data.determinedPath = 'B'; // Rota do Viajante Rápido
    } else if (motivation === 'academic') {
      this.data.determinedPath = 'C'; // Rota do Acadêmico
    } else {
      this.data.determinedPath = 'D'; // Rota do Entusiasta Cultural
    }

    this.data.state = 'diagnosis-complete';
    this.saveToStorage();
    this.emit('diagnosis-complete', { path: this.data.determinedPath });
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        path: this.data.determinedPath,
        diagnosis: this.data.answers,
        startedAt: new Date().toISOString(),
      }));
    } catch { /* ignore */ }
  }

  private emit(event: string, detail: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`falo-chines:${event}`, { detail }));
    }
  }
}

export const stateManager = new LevelingStateManager();
