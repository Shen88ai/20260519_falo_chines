import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Sobre Mim - Banner do Manual de Caligrafia - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'sobre-mim.astro');

  it('deve existir o arquivo sobre-mim.astro', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter link para /manual-v2 no banner contextual', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/manual-v2');
  });

  it('deve conter o texto do banner sobre caligrafia chinesa', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Caligrafia');
    expect(content).toContain('Manual');
  });

  it('deve conter chamada para açao contextual relacionada a historia', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // O banner deve conter texto que conecta a história da autora com o manual
    const hasContextualText =
      content.includes('história') ||
      content.includes('trajetória') ||
      content.includes('jornada') ||
      content.includes('essência');
    expect(hasContextualText).toBe(true);
  });

  it('deve manter o conteudo original da pagina sobre-mim intacto', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Conteúdo principal deve continuar existindo
    expect(content).toContain('Sobre Mim');
    expect(content).toContain('Stefany');
    expect(content).toContain('Taiwan');
    expect(content).toContain('Paraguai');
    expect(content).toContain('Chile');
    expect(content).toContain('Brasil');
  });
});
