import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonSchema } from './lib/schemas';

// Define a coleção de lições integradas ao Obsidian
const lessons = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/lessons' }),
  schema: lessonSchema
});

export const collections = { lessons };
