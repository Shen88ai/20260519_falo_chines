import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Landing Page Diagnóstico China - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'diagnostico-china.astro');

  it('deve existir o arquivo da Landing Page', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter title e description de SEO', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Diagnóstico China');
    expect(content).toContain('negócio com a China');
  });

  it('deve conter a Headline principal', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Descubra em que fase está');
    expect(content).toContain('negócio com a China');
  });

  it('deve conter o quiz interativo de diagnóstico com componente', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('DiagnosticoChinaQuiz');
    expect(content).toContain('quiz');
    expect(content).toContain('recomendação personalizada');
  });

  it('deve conter seção de quiz com descrição clara', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('7 perguntas rápidas');
    expect(content).toContain('Preencha e receba');
  });

  it('deve conter link para o WhatsApp 5511996990939', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('5511996990939');
  });

  it('deve conter os 4 planos com preços corretos e promoção', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Diagnóstico Inicial');
    expect(content).toContain('Consultoria Avulsa');
    expect(content).toContain('45 min');
    expect(content).toContain('90 min');
    expect(content).toContain('Plano Mensal');
    expect(content).toContain('R$ 247');
    expect(content).toContain('R$ 370');
    expect(content).toContain('R$ 670');
    expect(content).toContain('R$ 2.470');
  });

  it('deve exibir o valor original riscado e o valor promocional', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('R$ 480');
    expect(content).toContain('R$ 980');
    expect(content).toContain('R$ 3.680');
    expect(content).toContain('grátis');
    expect(content).toContain('hoje');
  });

  it('deve conter as perguntas do quiz dentro do componente', () => {
    const compPath = path.join(process.cwd(), 'src', 'components', 'DiagnosticoChinaQuiz.astro');
    const compContent = fs.readFileSync(compPath, 'utf-8');
    expect(compContent).toContain('Você já iniciou negociações');
    expect(compContent).toContain('Seu objetivo principal');
    expect(compContent).toContain('Qual o tamanho do seu negócio');
    expect(compContent).toContain('Qual seu maior desafio');
    expect(compContent).toContain('Em quanto tempo pretende fechar');
    expect(compContent).toContain('experiência em negociações internacionais');
  });

  it('deve conter seção "O que é o Diagnóstico Inicial"', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('O que é');
    expect(content).toContain('30 minutos');
    expect(content).toContain('WhatsApp');
    expect(content).toContain('saúde atual');
  });

  it('deve conter botões CTA "Quero meu checklist + diagnóstico"', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Quero meu checklist');
    expect(content).toContain('Quero meu diagnóstico grátis');
  });

  it('deve conter seção de Como funciona com bullets', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Como funciona');
    expect(content).toContain('Responda');
    expect(content).toContain('Receba');
    expect(content).toContain('Agende');
  });

  it('deve conter o lead magnet "Checklist 7 Erros"', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Checklist');
    expect(content).toContain('7 Erros ao Negociar');
  });

  it('deve conter indicador de escassez com vagas restantes dinâmico', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('vagas-restantes');
    expect(content).toContain('TOTAL_VAGAS');
    expect(content).toContain('vagasRestantes');
  });

  it('deve conter a explicação de "Consultoria Shen" como autoridade', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Consultoria Shen');
  });

  it('deve usar cores da marca (brand-red, brand-gold)', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('brand-red');
    expect(content).toContain('brand-gold');
  });
});
