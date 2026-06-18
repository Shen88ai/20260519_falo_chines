import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Homepage Banner do Manual de Caligrafia - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'index.astro');

  it('deve existir o arquivo index.astro da página inicial', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter o link para a página /manual', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Deve conter uma referência de link para a nova página
    expect(content).toContain('/manual');
  });

  it('deve conter o texto de anúncio do lançamento da caligrafia no banner', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    // O texto principal do banner
    expect(content).toContain('LANÇAMENTO');
    expect(content).toContain('Manual de Caligrafia Chinesa');
  });
});
