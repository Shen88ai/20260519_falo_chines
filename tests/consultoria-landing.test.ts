import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Landing Page Consultoria Negociação com Chineses - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'consultoria-negociacao-chineses.astro');

  it('deve existir o arquivo da Landing Page', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter title e description de SEO', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Consultoria em Negociação com Chineses');
    expect(content.toLowerCase()).toContain('negociar com chineses');
  });

  it('deve conter a Headline principal com a verdade sobre negociar com chineses', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Negociar com chineses não é só sobre preço');
    expect(content).toContain('cultura, confiança e estratégia');
  });

  it('deve conter a Subheadline', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('evitar erros caros');
  });

  it('deve conter a seção de Dor com 3 bullets', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('não entender o silêncio');
    expect(content).toContain('não respeitar hierarquia');
    expect(content).toContain('não construir confiança');
  });

  it('deve conter a seção de Transformação', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Imagine se fosse diferente');
  });

  it('deve conter a seção de Autoridade com bio', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Quem vai te ajudar');
    expect(content).toContain('especialista em negociação com chineses');
  });

  it('deve conter os 3 planos com preços corretos', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('R$ 247');
    expect(content).toContain('R$ 670');
    expect(content).toContain('R$ 2.470');
    expect(content).toContain('Diagnóstico Inicial');
    expect(content).toContain('Consultoria Avulsa');
    expect(content).toContain('Plano Mensal');
  });

  it('deve conter botões CTA "Quero garantir minha vaga"', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Quero garantir minha vaga');
  });

  it('deve conter a seção de Depoimentos', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Veja quem já transformou');
    expect(content).toContain('consegui fechar meu primeiro contrato');
  });

  it('deve conter a seção de Fechamento com agenda limitada', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Agenda limitada');
    expect(content).toContain('Falar no WhatsApp agora');
  });

  it('deve conter link para o WhatsApp 5511996990939', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('5511996990939');
  });

  it('deve conter imagens da pasta /Consultoria/', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('/Consultoria/');
  });

  it('deve usar cores vermelho e dourado (brand-red e brand-gold)', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('brand-red');
    expect(content).toContain('brand-gold');
  });

  // === Melhorias aprovadas ===

  it('[Melhoria 1] deve conter mini-quiz de diagnóstico interativo com 3 perguntas', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('diagnostico-rapido');
    expect(content).toContain('pergunta');
    expect(content).toContain('resultado-diagnostico');
  });

  it('[Melhoria 2] deve conter indicador de escassez com vagas restantes', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('vagas-restantes');
    expect(content).toContain('escassez');
  });

  it('[Melhoria 3] deve conter micro-depoimentos no formato Antes → Depois', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Antes:');
    expect(content).toContain('Depois:');
  });

  it('deve conter WhatsAppButton fixo com telephone', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('fixed');
    expect(content).toContain('WhatsApp');
  });
});
