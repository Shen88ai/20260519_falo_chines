import { describe, it, expect } from 'vitest';
import { lessonSchema } from '../src/lib/schemas';

describe('Obsidian Lesson Schema (Zod)', () => {
  it('deve validar com sucesso um frontmatter completo e correto', () => {
    const validFrontmatter = {
      title: 'Introdução ao Pinyin',
      description: 'Aprenda as iniciais, finais e as bases fonéticas do mandarim.',
      phase: 'A',
      phaseLabel: 'Fase 1: Fonética & Tons',
      order: 1,
      icon: '🎵',
      featured: true,
      characters: ['中', '国'],
      tags: ['pinyin', 'iniciante']
    };

    const parsed = lessonSchema.safeParse(validFrontmatter);
    expect(parsed.success).toBe(true);
  });

  it('deve falhar se faltar o campo obrigatório "title"', () => {
    const invalidFrontmatter = {
      description: 'Sem título...',
      phase: 'A',
      phaseLabel: 'Fase 1: Fonética & Tons',
      order: 1,
    };

    const parsed = lessonSchema.safeParse(invalidFrontmatter);
    expect(parsed.success).toBe(false);
  });

  it('deve falhar se o campo "phase" for inválido (não for A, B, C, ou D)', () => {
    const invalidFrontmatter = {
      title: 'Título Válido',
      description: 'Descrição...',
      phase: 'Z', // Fase inválida!
      phaseLabel: 'Fase Inválida',
      order: 1,
    };

    const parsed = lessonSchema.safeParse(invalidFrontmatter);
    expect(parsed.success).toBe(false);
  });

  it('deve usar valores padrão para campos opcionais (featured, characters, tags)', () => {
    const minimalFrontmatter = {
      title: 'Título Mínimo',
      description: 'Descrição...',
      phase: 'B',
      phaseLabel: 'Fase 2',
      order: 2,
    };

    const parsed = lessonSchema.safeParse(minimalFrontmatter);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.featured).toBe(false);
      expect(parsed.data.characters).toEqual([]);
      expect(parsed.data.tags).toEqual([]);
    }
  });
});
