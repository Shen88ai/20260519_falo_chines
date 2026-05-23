import { describe, it, expect } from 'vitest';
// Importações virtuais do módulo que vamos criar
import { 
  courses, 
  specialCourses, 
  differentials, 
  stefanyShen, 
  translationService, 
  getWhatsAppEnrollUrl, 
  getWhatsAppQuoteUrl,
  CONTACT_PHONE
} from '../src/lib/courses-data';

describe('Módulo de Dados dos Cursos e Serviços', () => {
  
  it('deve conter as informações corretas sobre o contato principal', () => {
    expect(CONTACT_PHONE).toBe('551196990939');
  });

  it('deve possuir exatamente os 5 cursos regulares com seus detalhes', () => {
    expect(courses).toHaveLength(5);
    
    // Testando o curso Iniciante
    const iniciante = courses.find(c => c.id === 'iniciante');
    expect(iniciante).toBeDefined();
    expect(iniciante?.title).toBe('Iniciante – Sobrevivência 100');
    expect(iniciante?.hours).toBe('30h');
    expect(iniciante?.material).toBe('100 caracteres essenciais');
    expect(iniciante?.objective).toContain('Aprender vocabulário de sobrevivência');
    
    // Testando o curso Básico
    const basico = courses.find(c => c.id === 'basico');
    expect(basico).toBeDefined();
    expect(basico?.title).toBe('Básico – Falo Chinês 300');
    expect(basico?.hours).toBe('30h');
    expect(basico?.material).toBe('300 caracteres');
    expect(basico?.objective).toContain('Ler, escrever e digitar em chinês');
    
    // Testando o curso Intermediário
    const intermediario = courses.find(c => c.id === 'intermediario');
    expect(intermediario).toBeDefined();
    expect(intermediario?.title).toBe('Intermediário I & II – Falo Chinês 500');
    expect(intermediario?.hours).toBe('30h cada módulo');
    expect(intermediario?.material).toBe('500 caracteres e 1.000 frases curtas');
    expect(intermediario?.objective).toContain('Comunicação fluente em entrevistas');

    // Testando o curso Avançado
    const avancado = courses.find(c => c.id === 'avancado');
    expect(avancado).toBeDefined();
    expect(avancado?.title).toBe('Avançado I–IV – Falo Chinês 1000');
    expect(avancado?.hours).toBe('30h cada módulo');
    expect(avancado?.material).toBe('1.000 caracteres e gramática avançada');
    expect(avancado?.objective).toContain('Ler jornais, revistas e literatura');

    // Testando o curso de Conversação Comercial
    const comercial = courses.find(c => c.id === 'comercial');
    expect(comercial).toBeDefined();
    expect(comercial?.title).toBe('Conversação Comercial');
    expect(comercial?.hours).toBe('30h');
    expect(comercial?.material).toBe('Customizado para negócios');
    expect(comercial?.objective).toContain('Fluência em negociações, vocabulário técnico');
  });

  it('deve possuir os 4 cursos especiais', () => {
    expect(specialCourses).toHaveLength(4);
    
    const cultura = specialCourses.find(c => c.title.includes('Cultura'));
    expect(cultura).toBeDefined();
    expect(cultura?.hours).toBe('8h');
    expect(cultura?.description).toContain('mitos, lendas e sabedoria ancestral');

    const etiqueta = specialCourses.find(c => c.title.includes('Etiqueta'));
    expect(etiqueta).toBeDefined();
    expect(etiqueta?.hours).toBe('8h');
    expect(etiqueta?.description).toContain('convivência, namoro, casamento');
  });

  it('deve conter a biografia de Stefany Shen e seus diferenciais', () => {
    expect(stefanyShen.name).toBe('Stefany Shen');
    expect(stefanyShen.origin).toContain('Taiwan');
    expect(stefanyShen.raised).toContain('Paraguai');
    expect(stefanyShen.educated).toContain('Chile');
    expect(stefanyShen.resides).toContain('Brasil');
    expect(stefanyShen.languages).toContain('quatro idiomas');
    expect(stefanyShen.mission).toContain('aproximar culturas');

    expect(differentials).toContain('Método exclusivo Right Brain Chinese');
    expect(differentials).toContain('Cursos práticos e customizados');
    expect(differentials).toContain('Experiência internacional em ensino e tradução');
    expect(differentials).toContain('Atendimento virtualmente para pessoas físicas e empresas');
  });

  it('deve conter as informações dos serviços de Tradução & Interpretação', () => {
    expect(translationService.title).toBe('Serviços de Tradução & Interpretação');
    expect(translationService.types).toContain('Tradução simultânea e consecutiva');
    expect(translationService.languages).toEqual(expect.arrayContaining(['Mandarim', 'Português', 'Espanhol', 'Inglês']));
    expect(translationService.clients).toEqual(expect.arrayContaining(['CNI', 'HSBC', 'FIESP', 'Global Word', 'Bureau Translations']));
  });

  it('deve gerar URLs do WhatsApp válidas e devidamente codificadas', () => {
    const enrollUrl = getWhatsAppEnrollUrl('Sobrevivência 100');
    expect(enrollUrl).toContain('wa.me/551196990939');
    expect(enrollUrl).toContain('text=');
    expect(enrollUrl).toContain('Sobreviv%C3%AAncia%20100');

    const quoteUrl = getWhatsAppQuoteUrl('Tradução Simultânea');
    expect(quoteUrl).toContain('wa.me/551196990939');
    expect(quoteUrl).toContain('text=');
    expect(quoteUrl).toContain('Tradu%C3%A7%C3%A3o%20Simult%C3%A2nea');
  });
});
