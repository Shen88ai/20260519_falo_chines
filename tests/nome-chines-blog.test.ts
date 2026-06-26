import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Blog Post: Nome Chinês Completo com Sobrenome', () => {
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
  const imageDir = path.join(process.cwd(), 'public', 'images', 'nome-chines');

  function findBlogFile(slug: string): string | null {
    const files = fs.readdirSync(blogDir);
    const match = files.find(f => f.includes(slug));
    return match ? path.join(blogDir, match) : null;
  }

  it('deve existir o arquivo do blog post sobre nome chinês completo', () => {
    const file = findBlogFile('nome-chines-completo');
    expect(file).not.toBeNull();
  });

  it('deve conter frontmatter válido com título, descrição, data, autor', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('title:');
    expect(content).toContain('description:');
    expect(content).toContain('date:');
    expect(content).toContain('author:');
    expect(content).toContain('tags:');
  });

  it('deve conter a palavra "sobrenome" no conteúdo (tema principal)', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content.toLowerCase()).toContain('sobrenome');
  });

  it('deve referenciar imagens de exemplo dos nomes chineses', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('nome-chines');
    expect(content).toContain('.png');
  });

  it('deve conter pelo menos 3 seções com headings (## ou ###)', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    const headings = content.match(/^#{2,3}\s/gm);
    expect(headings?.length).toBeGreaterThanOrEqual(3);
  });

  it('deve conter call-to-action para encomendar', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('WhatsApp');
  });

  it('deve ter pelo menos 500 caracteres de conteúdo', () => {
    const file = findBlogFile('nome-chines-completo');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content.length).toBeGreaterThan(500);
  });
});
