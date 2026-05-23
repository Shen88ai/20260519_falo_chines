import { z } from 'zod';

/**
 * Esquema de validação para o frontmatter de lições criadas no Obsidian.
 * Garante consistência de dados para renderização estática do Astro.
 */
export const lessonSchema = z.object({
  title: z.string({
    required_error: 'O título da lição é obrigatório.'
  }),
  description: z.string({
    required_error: 'A descrição da lição é obrigatória.'
  }),
  phase: z.enum(['A', 'B', 'C', 'D'], {
    invalid_type_error: 'A fase deve ser "A" (Pinyin), "B" (Ideogramas), "C" (Gramática) ou "D" (HSK/Cultura).'
  }),
  phaseLabel: z.string({
    required_error: 'O rótulo da fase é obrigatório.'
  }),
  order: z.number({
    required_error: 'A ordem numérica da lição é obrigatória.'
  }),
  icon: z.string().default('📋'),
  featured: z.boolean().default(false),
  characters: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([])
});
