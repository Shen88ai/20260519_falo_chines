import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Strokes Page Bento Card - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'strokes.astro');

  it('deve existir o arquivo strokes.astro', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter o link para /manual', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/manual');
  });

  it('deve conter o caminho da imagem de capa do ebook', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/ebook/capa_ebook_numero.png');
  });

  it('deve conter o título do Bento Card de caligrafia', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Domine a Arte dos Traços Tradicionais');
  });
});
