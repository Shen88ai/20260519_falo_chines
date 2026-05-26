import { describe, it, expect } from 'vitest';
import { getCharDisplay } from '../src/lib/char-converter';

describe('getCharDisplay', () => {
  it('should return "学 (學)" for a character that differs', () => {
    expect(getCharDisplay('学')).toBe('学 (學)');
  });

  it('should return just "中" for a character same in both scripts', () => {
    expect(getCharDisplay('中')).toBe('中');
  });

  it('should handle empty string', () => {
    expect(getCharDisplay('')).toBe('');
  });
});
