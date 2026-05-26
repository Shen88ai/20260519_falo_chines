export interface LessonMeta {
  title: string;
  characters: string[];
  phaseLabel: string;
  tags: string[];
  description: string;
}

type TeaserTemplate = (l: LessonMeta) => string | null;

const TEASER_TEMPLATES: TeaserTemplate[] = [
  (l) => {
    if (l.characters.length > 0) {
      const char = l.characters[Math.floor(Math.random() * l.characters.length)];
      return `🔒 O segredo do caractere ${char}`;
    }
    return null;
  },
  (l) => {
    if (l.tags.length > 0) {
      const tag = l.tags[Math.floor(Math.random() * l.tags.length)];
      return `🔒 Domine os ${tag} como um nativo`;
    }
    return null;
  },
  (l) => {
    const topic = l.phaseLabel.split(' & ')[0];
    return `🔒 O erro que todo brasileiro comete em ${topic.toLowerCase()}`;
  },
  (l) => `🔒 Próxima parada: ${l.title.split(':')[0]}`,
];

export function generateTeaser(lesson: LessonMeta): string {
  const shuffled = [...TEASER_TEMPLATES].sort(() => Math.random() - 0.5);
  for (const tmpl of shuffled) {
    const result = tmpl(lesson);
    if (result) return result;
  }
  return `🔒 Próxima lição: ${lesson.title}`;
}
