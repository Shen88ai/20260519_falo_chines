import { describe, it, expect } from 'vitest';
import { generateTeaser } from '../src/lib/teaser-generator';

describe('generateTeaser', () => {
  it('should generate a teaser for a lesson with characters', () => {
    const lesson = {
      title: 'Os Quatro Tons Primordiais',
      characters: ['妈', '麻', '马', '骂'],
      phaseLabel: 'Fonética & Tons',
      tags: ['tons', 'pinyin'],
      description: 'Aprenda os 4 tons do mandarim',
    };
    const teaser = generateTeaser(lesson);
    expect(teaser).toBeTruthy();
    expect(teaser.length).toBeGreaterThan(5);
    expect(teaser.startsWith('🔒')).toBe(true);
  });

  it('should generate a teaser for a lesson without characters', () => {
    const lesson = {
      title: 'Sintaxe Básica',
      characters: [],
      phaseLabel: 'Sintaxe & Diálogo',
      tags: ['gramática', 'estrutura'],
      description: 'Entenda a estrutura das frases',
    };
    const teaser = generateTeaser(lesson);
    expect(teaser).toBeTruthy();
    expect(teaser.length).toBeGreaterThan(5);
    expect(teaser).toContain('🔒');
  });

  it('should generate different teasers for different lessons', () => {
    const lesson1 = { title: 'A', characters: ['妈'], phaseLabel: 'F', tags: ['t'], description: 'd' };
    const lesson2 = { title: 'B', characters: ['文'], phaseLabel: 'G', tags: ['g'], description: 'e' };
    const t1 = generateTeaser(lesson1);
    const t2 = generateTeaser(lesson2);
    expect(t1).not.toBe(t2);
  });
});
