import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Landing Page Nome Chinês - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'nome-chines.astro');
  const compPath = path.join(process.cwd(), 'src', 'components', 'NomeChinesQuiz.astro');

  it('deve existir o arquivo da landing page', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve existir o componente NomeChinesQuiz', () => {
    const exists = fs.existsSync(compPath);
    expect(exists).toBe(true);
  });

  it('deve conter SEO title e description', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Nome Chinês Exclusivo');
  });

  it('deve conter headline principal', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Descubra como seu nome vira arte');
  });

  it('deve conter a seção dos 3 estilos de caligrafia', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lower = content.toLowerCase();
    expect(lower).toContain('ink');
    expect(lower).toContain('futuristic');
    expect(lower).toContain('translucent');
  });

  it('deve conter o componente NomeChinesQuiz', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('NomeChinesQuiz');
  });

  it('deve conter botões de CTA com texto correto', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('ENCOMENDAR MEU NOME CHINÊS');
  });

  it('deve conter a jornada intercultural da autora', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Taiwan');
    expect(content).toContain('Paraguai');
    expect(content).toContain('Chile');
    expect(content).toContain('Brasil');
  });

  it('deve conter o modal de checkout com pergunta', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('checkout-modal');
    expect(content).toContain('Para quem será esse nome chinês');
  });

  it('deve conter o número do WhatsApp 5511996990939', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('5511996990939');
  });

  it('deve conter referência às imagens de exemplo dos 3 estilos', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/images/nome-chines/ink.png');
    expect(content).toContain('/images/nome-chines/futuristic.png');
    expect(content).toContain('/images/nome-chines/translucent.png');
  });
});
