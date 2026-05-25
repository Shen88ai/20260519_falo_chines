import { dictionary } from '../../data/dictionary';

export function getCharInfo(character: string) {
  return dictionary[character] || null;
}

export function getPinyinDisplay(character: string): string {
  const info = getCharInfo(character);
  return info ? info.pinyin : '';
}

export function getMeaning(character: string): string {
  const info = getCharInfo(character);
  return info ? info.portuguese : '';
}
