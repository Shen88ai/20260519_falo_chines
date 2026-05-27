import { describe, it, expect } from 'vitest';
import { getZhongwenLink } from '../src/lib/dictionary-utils';

describe('Zdic Link Generator', () => {
  it('deve gerar o link correto para um único caractere chinês ("中")', () => {
    const char = '中';
    const expectedUrl = 'https://zdic.net/hans/%E4%B8%AD';
    expect(getZhongwenLink(char)).toBe(expectedUrl);
  });

  it('deve gerar o link correto codificando múltiplos caracteres ("商业")', () => {
    const word = '商业';
    const expectedUrl = 'https://zdic.net/hans/%E5%95%86%E4%B8%9A';
    expect(getZhongwenLink(word)).toBe(expectedUrl);
  });

  it('deve retornar a página principal do zdic.net se o termo for vazio', () => {
    expect(getZhongwenLink('')).toBe('https://zdic.net/');
  });

  it('deve retornar a página principal do zdic.net se o termo for nulo ou indefinido', () => {
    // @ts-ignore
    expect(getZhongwenLink(null)).toBe('https://zdic.net/');
    // @ts-ignore
    expect(getZhongwenLink(undefined)).toBe('https://zdic.net/');
  });
});