import { describe, it, expect } from 'vitest';
import { getZhongwenLink } from '../src/lib/dictionary-utils';

describe('Zhongwen Link Generator', () => {
  it('deve gerar o link correto para um único caractere chinês ("中")', () => {
    const char = '中';
    const expectedUrl = 'https://zhongwen.com/cgi-bin/zipfind.cgi?terms=%E4%B8%AD';
    expect(getZhongwenLink(char)).toBe(expectedUrl);
  });

  it('deve gerar o link correto codificando múltiplos caracteres ("商业")', () => {
    const word = '商业';
    const expectedUrl = 'https://zhongwen.com/cgi-bin/zipfind.cgi?terms=%E5%95%86%E4%B8%9A';
    expect(getZhongwenLink(word)).toBe(expectedUrl);
  });

  it('deve retornar a página principal do Zhongwen se o termo for vazio', () => {
    expect(getZhongwenLink('')).toBe('https://zhongwen.com/');
  });

  it('deve retornar a página principal do Zhongwen se o termo for nulo ou indefinido', () => {
    // @ts-ignore
    expect(getZhongwenLink(null)).toBe('https://zhongwen.com/');
    // @ts-ignore
    expect(getZhongwenLink(undefined)).toBe('https://zhongwen.com/');
  });
});
