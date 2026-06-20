import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Landing Page do Manual de Caligrafia Chinesa - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'manual.astro');

  it('deve existir o arquivo do template da Landing Page', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter as informações corretas de SEO no frontmatter ou HTML', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Título da página
    expect(content).toContain('Manual de Caligrafia Chinesa');
    
    // Descrição SEO
    expect(content.toLowerCase()).toContain('domine a caligrafia chinesa');
  });

  it('deve conter a headline e subheadline otimizadas da Opção 3', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Headline fragments (due to HTML formatting)
    expect(content).toContain('Quem disse que escrever em chinês é impossível?');
    expect(content).toContain('Descubra o método');
    expect(content).toContain('que já ensinou milhares de pessoas a dar os primeiros traços.');
    
    // Subheadline
    expect(content).toContain('Com mais de 45 mil visualizações comprovando a simplicidade do método no YouTube, a professora Shen Yung Ying preparou o guia definitivo para você dominar a ordem dos traços, a disciplina visual e os significados da escrita sem complicação.');
  });

  it('deve conter a imagem de capa correta do e-book', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/ebook/capa_ebook_numero.png');
  });

  it('deve conter o vídeo incorporado do YouTube com ID correto', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('https://www.youtube.com/embed/HI704EY7gSs');
  });

  it('deve conter o link para o canal do YouTube oficial', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('https://www.youtube.com/@StefanyShen');
  });

  it('deve conter a jornada da autora (Taiwan → Paraguai → Chile → Brasil)', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Taiwan');
    expect(content).toContain('Paraguai');
    expect(content).toContain('Chile');
    expect(content).toContain('Brasil');
  });

  it('deve conter os 3 benefícios principais descritos', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Ordem dos Traços');
    expect(content).toContain('Foco');
    expect(content).toContain('Significados Culturais');
  });

  it('deve conter botões de CTA com nomes corretos', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('GARANTIR MEU MANUAL');
  });

  it('deve conter o modal de checkout com overlay', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('checkout-modal');
    expect(content).toContain('modal-overlay');
  });

  it('deve conter a pergunta "Por que você quer aprender chinês?" no modal', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Por que você quer aprender chinês');
  });

  it('deve conter o numero do WhatsApp 5511996990939 para envio da resposta', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('5511996990939');
  });

  it('deve conter o link de pagamento da Hotmart no JavaScript do modal', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('pay.hotmart.com');
  });

  it('deve conter link para /nome-chines', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/nome-chines');
  });
});
