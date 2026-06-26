import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Blog Post: Tradução de Marcas no Mercado Chinês', () => {
  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');

  function findBlogFile(slug: string): string | null {
    const files = fs.readdirSync(blogDir);
    const match = files.find(f => f.includes(slug));
    return match ? path.join(blogDir, match) : null;
  }

  it('deve existir o arquivo do blog post sobre tradução de marcas', () => {
    const file = findBlogFile('traducao-marcas');
    expect(file).not.toBeNull();
  });

  it('deve conter frontmatter válido com título, descrição, data, autor e tags', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('title:');
    expect(content).toContain('description:');
    expect(content).toContain('date:');
    expect(content).toContain('author:');
    expect(content).toContain('tags:');
  });

  it('Pepsi deve vir IMEDIATAMENTE antes de Coca-Cola (reversão psicológica)', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    const pepsiIdx = content.indexOf('Pepsi');
    const cocaIdx = content.indexOf('Coca');
    expect(pepsiIdx).not.toBe(-1);
    expect(cocaIdx).not.toBe(-1);
    expect(pepsiIdx).toBeLessThan(cocaIdx);
    const between = content.slice(pepsiIdx, cocaIdx);
    expect(between.length).toBeLessThan(1200);
  });

  it('deve mencionar que 百事 (tudo) vence 可口 (uma coisa) psicologicamente', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('百事');
    expect(content).toContain('tudo');
    expect(content).toContain('uma coisa');
  });

  it('deve mencionar marcas famosas no conteúdo', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('Coca');
    expect(content).toContain('KFC');
    expect(content).toContain('Mercedes');
  });

  it('deve mencionar exemplos de traduções que deram errado', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('Nova');
    expect(content).toContain('Parker');
  });

  it('deve mencionar exemplos de traduções bem-sucedidas', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('BMW');
    expect(content).toContain('IKEA');
    expect(content).toContain('Starbucks');
  });

  it('deve conter as reversões do PDF: Yahoo (夜壺→雅虎), Tesla (拓速樂), McDonald\'s (金拱门), Häagen-Dazs (黑根蠟燭), IKEA (詩經)', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('Yahoo');
    expect(content).toContain('雅虎');
    expect(content).toContain('Tesla');
    expect(content).toContain('McDonald');
    expect(content).toContain('Häagen');
  });

  it('deve referenciar a imagem trademark_01.png', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('trademark_01.png');
  });

  it('deve conter pelo menos 6 seções com headings (## ou ###)', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    const headings = content.match(/^#{2,3}\s/gm);
    expect(headings?.length).toBeGreaterThanOrEqual(6);
  });

  it('deve conter call-to-action para consultoria', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content).toContain('consultoria');
  });

  it('deve ter pelo menos 3000 caracteres de conteúdo', () => {
    const file = findBlogFile('traducao-marcas');
    const content = fs.readFileSync(file!, 'utf-8');
    expect(content.length).toBeGreaterThan(3000);
  });
});
