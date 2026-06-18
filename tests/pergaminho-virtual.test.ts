import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Pergaminho Virtual - Plano 2 (Híbrido Conversão) - TDD', () => {
  const componentPath = path.join(process.cwd(), 'src', 'components', 'PergaminhoVirtual.astro');
  const indexPagePath = path.join(process.cwd(), 'src', 'pages', 'index.astro');

  it('deve existir o arquivo do componente PergaminhoVirtual.astro', () => {
    const exists = fs.existsSync(componentPath);
    expect(exists).toBe(true);
  });

  it('deve conter o título "O Caminho do Foco e da Disciplina Através do Pincel"', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('O Caminho do Foco e da Disciplina Através do Pincel');
  });

  it('deve conter o texto de copy com "meditação ativa para desacelerar a mente"', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('meditação ativa para desacelerar a mente');
    expect(content).toContain('segredos etimológicos');
    expect(content).toContain('ordem dos traços');
  });

  it('deve conter o botão CTA "Adquirir o Manual de Caligrafia Chinesa"', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('Adquirir o Manual de Caligrafia Chinesa');
  });

  it('deve conter referência à foto da Stefany Shen', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('foto_StefanyShen.png');
  });

  it('deve conter referência à capa do ebook', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('capa_ebook_numero.png');
  });

  it('deve usar a classe parchment-scroll', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('parchment-scroll');
  });

  it('deve estar importado e renderizado no index.astro', () => {
    const content = fs.readFileSync(indexPagePath, 'utf-8');
    expect(content).toContain('PergaminhoVirtual');
  });

  it('deve conter micro-prova social com "45 mil" no componente', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('45 mil');
  });

  it('deve conter link para a página /manual no componente', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('/manual');
  });

  it('deve conter selo decorativo com o caractere 書 (caligrafia)', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('書');
  });

  it('deve conter menção a "Método Shen Ai"', () => {
    const content = fs.readFileSync(componentPath, 'utf-8');
    expect(content).toContain('Método Shen Ai');
  });
});
