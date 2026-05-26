import { describe, it, expect } from 'vitest';
import { simplifiedToTraditional, getTraditional } from '../src/data/simplified-to-traditional';

describe('simplifiedToTraditional map', () => {
  it('should map 学 to 學', () => {
    expect(simplifiedToTraditional['学']).toBe('學');
  });

  it('should map 国 to 國', () => {
    expect(simplifiedToTraditional['国']).toBe('國');
  });

  it('should map 马 to 馬', () => {
    expect(simplifiedToTraditional['马']).toBe('馬');
  });

  it('should have entries for all differing characters in dictionary', () => {
    const expected = ['国','学','妈','马','语','书','师','爱','乐','旧','临','刘','斋','园','图','孙','尘','头','个','从','们','体','战','戏','吗','时','云','灯','烧','烟','岁','岛','银','铁','铜','针','说','话','请','谢','带','药','丰','觅','业','骂','儿'];
    expected.forEach(char => {
      expect(simplifiedToTraditional[char]).toBeTruthy();
      expect(simplifiedToTraditional[char]).not.toBe(char);
    });
  });
});

describe('getTraditional', () => {
  it('should return traditional form if it differs', () => {
    expect(getTraditional('学')).toBe('學');
  });

  it('should return undefined if character is same in both scripts', () => {
    expect(getTraditional('中')).toBeUndefined();
    expect(getTraditional('人')).toBeUndefined();
  });
});
