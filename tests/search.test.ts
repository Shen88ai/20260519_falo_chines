import { describe, it, expect } from 'vitest';
import { createSearchIndex, searchItems, renderSearchResults, type SearchItem } from '../src/lib/search';

describe('Módulo de Busca Global (Fuse.js)', () => {

  const mockLessons: SearchItem[] = [
    {
      id: 'phase-a/01-tons-primordiais',
      title: 'Lição 1: Os Quatro Tons Primordiais',
      description: 'Domine os quatro tons do Mandarim de forma intuitiva com analogias em português.',
      content: '妈 (mā) significa Mãe. 麻 (má) significa Cânhamo. 马 (mǎ) significa Cavalo. 骂 (mà) significa Xingar.',
      phase: 'A',
      tags: ['pinyin', 'tons', 'iniciante'],
      slug: '01-tons-primordiais',
    },
    {
      id: 'phase-a/02-pinyin-iniciais',
      title: 'Lição 2: Iniciais do Pinyin',
      description: 'Aprenda as consoantes iniciais do sistema Pinyin.',
      content: 'As iniciais do Pinyin incluem b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s.',
      phase: 'A',
      tags: ['pinyin', 'iniciante'],
      slug: '02-pinyin-iniciais',
    },
    {
      id: 'phase-b/03-radicais-fundamentais',
      title: 'Lição 3: Radicais Fundamentais',
      description: 'Desvende a lógica visual dos radicais chineses.',
      content: 'Radicais como 水 (água), 火 (fogo), 木 (árvore) formam a base dos caracteres chineses.',
      phase: 'B',
      tags: ['radicais', 'hanzi', 'intermediario'],
      slug: '03-radicais-fundamentais',
    },
    {
      id: 'phase-d/06-mae-chinesa-fluencia',
      title: 'Lição 6: Mãe Chinesa — Fluência Total',
      description: 'Imersão total com a metodologia Mãe Chinesa.',
      content: 'A imersão afetiva e a repetição natural são a chave para a fluência real em mandarim.',
      phase: 'D',
      tags: ['cultura', 'fluencia', 'avancado'],
      slug: '06-mae-chinesa-fluencia',
    },
  ];

  it('deve criar um índice de busca com Fuse.js', () => {
    const fuse = createSearchIndex(mockLessons);
    expect(fuse).toBeDefined();
  });

  it('deve retornar resultados para uma busca por título', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'tons');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].title).toContain('Tons');
  });

  it('deve retornar resultados para uma busca por tag', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'hanzi');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].title).toContain('Radicais');
  });

  it('deve retornar resultados para uma busca por descrição', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'metodologia');
    expect(results. length).toBeGreaterThanOrEqual(1);
    expect(results[0].slug).toBe('06-mae-chinesa-fluencia');
  });

  it('deve retornar array vazio para busca sem resultados', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'zzzznotfound');
    expect(results).toHaveLength(0);
  });

  it('deve limitar o número de resultados', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'pinyin', 1);
    expect(results.length).toBe(1);
  });

  it('deve incluir o slug e a fase em cada resultado', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'tons');
    expect(results[0]).toHaveProperty('slug');
    expect(results[0]).toHaveProperty('phase');
    expect(results[0]).toHaveProperty('title');
    expect(results[0]).toHaveProperty('description');
  });

  it('deve encontrar lição ao buscar por caractere chinês presente no conteúdo', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, '妈');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].slug).toBe('01-tons-primordiais');
  });

  it('deve encontrar lição ao buscar por radical chinês no conteúdo', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, '水');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].slug).toBe('03-radicais-fundamentais');
  });

  it('deve buscar também em itens sem fase (ex: blog posts)', () => {
    const items: SearchItem[] = [
      {
        id: 'blog/reflexao',
        title: 'Reflexão sobre Aprender Chinês',
        description: 'Um texto sobre a jornada pessoal de aprendizado.',
        content: 'Aprender chinês é uma jornada de autoconhecimento.',
        phase: '',
        tags: ['reflexao', 'cultura'],
        slug: 'reflexao',
      },
    ];
    const fuse = createSearchIndex(items);
    const results = searchItems(fuse, 'jornada');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].slug).toBe('reflexao');
  });

  it('deve renderizar resultados de busca como HTML', () => {
    const fuse = createSearchIndex(mockLessons);
    const results = searchItems(fuse, 'tons');
    const getPhaseLabel = (p: string) => {
      const labels: Record<string, string> = { A: 'Fonética', B: 'Hanzi', C: 'Gramática', D: 'Imersão' };
      return labels[p] ?? p;
    };
    const getPhaseColor = (p: string) => {
      const colors: Record<string, string> = { A: 'border-brand-red/30 text-brand-red', B: 'border-brand-jade/30 text-brand-jade', C: 'border-brand-purple/30 text-brand-purple', D: 'border-brand-blue/30 text-brand-blue' };
      return colors[p] ?? 'border-white/20 text-gray-400';
    };
    const html = renderSearchResults(results, getPhaseLabel, getPhaseColor);
    expect(html).toContain('01-tons-primordiais');
    expect(html).toContain('Os Quatro Tons Primordiais');
    expect(html).toContain('Fonética');
  });
});
