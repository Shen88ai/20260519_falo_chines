import { getTraditional } from '../data/simplified-to-traditional';

export function getCharDisplay(char: string): string {
  if (!char) return '';
  const traditional = getTraditional(char);
  return traditional ? `${char} (${traditional})` : char;
}
