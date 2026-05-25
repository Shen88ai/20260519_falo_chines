import type { CategoryConfig, WheelGroup } from './types';
import { dictionary } from '../../data/dictionary';

export const categories: CategoryConfig[] = [
  { id: 'tone', label: 'Tom', icon: '🎵', color: '#EF4444' },
  { id: 'radical', label: 'Radical', icon: '🪓', color: '#10B981' },
  { id: 'topic', label: 'Tópico', icon: '📖', color: '#8B5CF6' },
  { id: 'fase', label: 'Nível', icon: '📊', color: '#3B82F6' },
];

export const categoryColors: Record<string, string> = {
  tone: '#EF4444',
  radical: '#10B981',
  topic: '#8B5CF6',
  fase: '#3B82F6',
};

const toneNames = ['neutro', '1º Tom', '2º Tom', '3º Tom', '4º Tom'];
const toneColors = ['#6B7280', '#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

export function getToneNumber(pinyin: string): number {
  const toneChar = pinyin.match(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/);
  if (!toneChar) return 0;
  const tones = 'āēīōūǖáéíóúǘǎěǐǒǔǚàèìòùǜ';
  const idx = tones.indexOf(toneChar[0]);
  if (idx === -1) return 0;
  if (idx < 6) return 1;
  if (idx < 11) return 2;
  if (idx < 16) return 3;
  return 4;
}

export function buildGroups(category: WheelCategory): WheelGroup[] {
  const entries = Object.values(dictionary);

  switch (category) {
    case 'tone': {
      const groups: Map<number, string[]> = new Map();
      entries.forEach(e => {
        const t = getToneNumber(e.pinyin);
        const arr = groups.get(t) || [];
        arr.push(e.character);
        groups.set(t, arr);
      });
      return Array.from(groups.entries())
        .sort(([a], [b]) => a - b)
        .map(([tone, chars]) => ({
          id: `tone-${tone}`,
          label: toneNames[tone],
          color: toneColors[tone],
          characters: chars,
        }));
    }
    case 'radical': {
      const groups: Map<string, string[]> = new Map();
      entries.forEach(e => {
        const key = e.radical;
        const arr = groups.get(key) || [];
        arr.push(e.character);
        groups.set(key, arr);
      });
      return Array.from(groups.entries()).map(([radical, chars]) => ({
        id: `radical-${radical.replace(/\s/g, '-')}`,
        label: radical,
        color: categoryColors.radical,
        characters: chars,
      }));
    }
    case 'topic': {
      const groups: Map<string, string[]> = new Map();
      entries.forEach(e => {
        const arr = groups.get(e.topic) || [];
        arr.push(e.character);
        groups.set(e.topic, arr);
      });
      return Array.from(groups.entries()).map(([topic, chars]) => ({
        id: `topic-${topic}`,
        label: topic.charAt(0).toUpperCase() + topic.slice(1),
        color: categoryColors.topic,
        characters: chars,
      }));
    }
    case 'fase': {
      const fases = ['A', 'B', 'C', 'D'] as const;
      return fases.map(fase => ({
        id: `fase-${fase}`,
        label: `Fase ${fase}`,
        color: categoryColors.fase,
        characters: entries.filter(e => e.fase === fase).map(e => e.character),
      }));
    }
  }
}
