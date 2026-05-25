import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { lessonSchema, blogPostSchema } from './lib/schemas';

// Define a coleção de lições integradas ao Obsidian
const lessons = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/lessons' }),
  schema: lessonSchema
});

// Define a coleção de posts do blog
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: blogPostSchema
});

export const collections = { lessons, blog };
