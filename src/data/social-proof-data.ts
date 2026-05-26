export interface LessonProof {
  students: number;
}

export interface PhaseProof {
  students: number;
  charactersLearned: number;
}

export interface SocialProofData {
  lessons: Record<string, LessonProof>;
  phases: Record<string, PhaseProof>;
  weeklyStats: {
    studentsActive: number;
    newCharacters: number;
  };
}

export const socialProof: SocialProofData = {
  lessons: {
    'tons-primordiais': { students: 186 },
    'pinyin-iniciais': { students: 152 },
    'radicais-fundamentais': { students: 98 },
    'sintaxe-basica': { students: 74 },
    'hsk-negocios': { students: 56 },
    'mae-chinesa-fluencia': { students: 63 },
    'crianca-interior-fluencia': { students: 48 },
  },
  phases: {
    A: { students: 186, charactersLearned: 12 },
    B: { students: 98, charactersLearned: 8 },
    C: { students: 74, charactersLearned: 10 },
    D: { students: 63, charactersLearned: 15 },
  },
  weeklyStats: {
    studentsActive: 142,
    newCharacters: 23,
  },
};
