import { describe, it, expect, beforeEach } from 'vitest';
import {
  getDifficulties,
  addDifficulty,
  getMnemonics,
  addMnemonic,
  voteMnemonic,
  getMnemonicsByChar,
  getSituations,
  addSituation,
  voteSituation,
  getComments,
  addComment,
  getCommentsByPost,
  getCommentsByLesson,
  seedInitialData,
} from '../src/lib/comunidade-storage';

describe('comunidade-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getDifficulties returns empty array initially', () => {
    expect(getDifficulties()).toEqual([]);
  });

  it('addDifficulty stores and returns the report', () => {
    const report = addDifficulty('学', 'tone', 'lesson-slug');
    expect(report.character).toBe('学');
    expect(report.type).toBe('tone');
    expect(report.lessonSlug).toBe('lesson-slug');
    expect(report.timestamp).toBeTypeOf('number');
    expect(getDifficulties()).toHaveLength(1);
  });

  it('addDifficulty appends multiple reports', () => {
    addDifficulty('学', 'tone', 'l1');
    addDifficulty('国', 'strokes', 'l1');
    addDifficulty('学', 'meaning', 'l2');
    expect(getDifficulties()).toHaveLength(3);
  });

  it('getMnemonics returns empty array initially', () => {
    expect(getMnemonics()).toEqual([]);
  });

  it('addMnemonic stores a mnemonic with 0 votes and an id', () => {
    const m = addMnemonic('学', 'Lembre que 学 tem uma criança sob um telhado', 'Maria');
    expect(m.character).toBe('学');
    expect(m.text).toContain('criança');
    expect(m.author).toBe('Maria');
    expect(m.votes).toBe(0);
    expect(m.id).toBeTypeOf('string');
    expect(getMnemonics()).toHaveLength(1);
  });

  it('voteMnemonic increments vote count', () => {
    const m = addMnemonic('学', 'Macete legal', 'João');
    const updated = voteMnemonic(m.id);
    expect(updated?.votes).toBe(1);
    voteMnemonic(m.id);
    expect(voteMnemonic(m.id)?.votes).toBe(3);
  });

  it('voteMnemonic returns null for unknown id', () => {
    expect(voteMnemonic('fake-id')).toBeNull();
  });

  it('getMnemonicsByChar filters correctly', () => {
    addMnemonic('学', 'Macete A', 'Ana');
    addMnemonic('国', 'Macete B', 'Bia');
    addMnemonic('学', 'Macete C', 'Carlos');
    const results = getMnemonicsByChar('学');
    expect(results).toHaveLength(2);
  });

  it('getSituations returns empty array initially', () => {
    expect(getSituations()).toEqual([]);
  });

  it('addSituation creates a situation with pendente status', () => {
    const s = addSituation('Como peço comida vegetariana?', 'Em um restaurante em Pequim', ['restaurante']);
    expect(s.title).toBe('Como peço comida vegetariana?');
    expect(s.description).toContain('restaurante');
    expect(s.status).toBe('pendente');
    expect(s.votes).toBe(1);
    expect(getSituations()).toHaveLength(1);
  });

  it('voteSituation increments votes', () => {
    const s = addSituation('Título', 'Desc', []);
    voteSituation(s.id);
    expect(voteSituation(s.id)?.votes).toBe(3);
  });

  it('getComments returns empty array initially', () => {
    expect(getComments()).toEqual([]);
  });

  it('addComment stores a comment with approved false', () => {
    const c = addComment('alma-do-mandarim', '', 'Ótimo post!', 'Pedro');
    expect(c.postSlug).toBe('alma-do-mandarim');
    expect(c.text).toContain('Ótimo');
    expect(c.author).toBe('Pedro');
    expect(c.approved).toBe(false);
    expect(c.id).toBeTypeOf('string');
    expect(getComments()).toHaveLength(1);
  });

  it('getCommentsByPost filters correctly', () => {
    addComment('post-1', '', 'Comentário 1', 'Ana');
    addComment('post-2', '', 'Comentário 2', 'Bia');
    addComment('post-1', '', 'Comentário 3', 'Carlos');
    expect(getCommentsByPost('post-1')).toHaveLength(2);
    expect(getCommentsByPost('post-2')).toHaveLength(1);
  });

  it('getCommentsByLesson filters correctly', () => {
    addComment('', 'licao-1', 'Comentário lição 1', 'Ana');
    addComment('', 'licao-2', 'Comentário lição 2', 'Bia');
    addComment('', 'licao-1', 'Outro comentário', 'Carlos');
    expect(getCommentsByLesson('licao-1')).toHaveLength(2);
    expect(getCommentsByLesson('licao-2')).toHaveLength(1);
  });

  it('seed includes 5 comments', () => {
    seedInitialData();
    expect(getComments()).toHaveLength(5);
  });

  it('getSituations returns 5 entries after seed', () => {
    seedInitialData();
    expect(getSituations()).toHaveLength(5);
    expect(getMnemonics()).toHaveLength(5);
  });

  it('seedInitialData is idempotent', () => {
    seedInitialData();
    seedInitialData();
    expect(getSituations()).toHaveLength(5);
  });
});
