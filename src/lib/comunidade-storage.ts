export interface DifficultyReport {
  character: string;
  type: 'tone' | 'strokes' | 'meaning' | 'radical' | 'other';
  lessonSlug: string;
  timestamp: number;
}

export interface Mnemonic {
  id: string;
  character: string;
  text: string;
  author: string;
  votes: number;
  timestamp: number;
}

export interface Situation {
  id: string;
  title: string;
  description: string;
  tags: string[];
  votes: number;
  status: 'pendente' | 'em andamento' | 'publicado';
  author: string;
  timestamp: number;
}

const KEYS = {
  difficulties: 'falo-chines-difficulties',
  mnemonics: 'falo-chines-mnemonics',
  situations: 'falo-chines-situations',
} as const;

function read<T>(key: string): T[] {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function getDifficulties(): DifficultyReport[] {
  return read<DifficultyReport>(KEYS.difficulties);
}

export function addDifficulty(character: string, type: DifficultyReport['type'], lessonSlug: string): DifficultyReport {
  const list = getDifficulties();
  const report: DifficultyReport = { character, type, lessonSlug, timestamp: Date.now() };
  list.push(report);
  write(KEYS.difficulties, list);
  return report;
}

export function getMnemonics(): Mnemonic[] {
  return read<Mnemonic>(KEYS.mnemonics);
}

export function getMnemonicsByChar(character: string): Mnemonic[] {
  return getMnemonics().filter(m => m.character === character);
}

export function addMnemonic(character: string, text: string, author: string): Mnemonic {
  const list = getMnemonics();
  const m: Mnemonic = { id: uid(), character, text, author, votes: 0, timestamp: Date.now() };
  list.push(m);
  write(KEYS.mnemonics, list);
  return m;
}

export function voteMnemonic(id: string): Mnemonic | null {
  const list = getMnemonics();
  const idx = list.findIndex(m => m.id === id);
  if (idx === -1) return null;
  list[idx].votes++;
  write(KEYS.mnemonics, list);
  return list[idx];
}

export function getSituations(): Situation[] {
  return read<Situation>(KEYS.situations);
}

export function addSituation(title: string, description: string, tags: string[], author?: string): Situation {
  const list = getSituations();
  const s: Situation = {
    id: uid(), title, description, tags,
    votes: 1, status: 'pendente', author: author || 'Anônimo', timestamp: Date.now(),
  };
  list.push(s);
  write(KEYS.situations, list);
  return s;
}

export function voteSituation(id: string): Situation | null {
  const list = getSituations();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return null;
  list[idx].votes++;
  write(KEYS.situations, list);
  return list[idx];
}

const SEED_FLAG_KEY = 'falo-chines-seeded';

const SEED_SITUATIONS: Array<Omit<Situation, 'id' | 'timestamp'>> = [
  { title: 'Como peço comida vegetariana em Beijing?', description: 'Vou viajar para Beijing e como evitar carne sem passar fome', tags: ['restaurante', 'viagem'], votes: 12, status: 'publicado', author: 'Ana' },
  { title: 'O que falar quando encontro um amigo chinês pela primeira vez?', description: 'Quais saudações e perguntas são educadas no primeiro encontro?', tags: ['social', 'saudação'], votes: 9, status: 'publicado', author: 'Carlos' },
  { title: 'Como negocio preço no mercado de rua?', description: 'Barganhar é comum na China, mas nunca sei as palavras certas', tags: ['compras', 'negócios'], votes: 7, status: 'em andamento', author: 'Maria' },
  { title: 'O que dizer se me atrasar para uma reunião?', description: 'No trânsito de SP fico preso e preciso me desculpar profissionalmente', tags: ['trabalho', 'desculpa'], votes: 5, status: 'pendente', author: 'João' },
  { title: 'Como elogiar a comida da minha sogra chinesa?', description: 'Minha sogra é chinesa e cozinha muito, quero elogiar sem parecer superficial', tags: ['social', 'cultura'], votes: 4, status: 'pendente', author: 'Ling' },
];

const SEED_MNEMONICS: Array<Omit<Mnemonic, 'id' | 'timestamp'>> = [
  { character: '妈', text: 'Mãe (女) trabalha como cavalo (马) — dois empregos!', author: 'Pedro', votes: 15 },
  { character: '好', text: 'Mulher (女) com criança (子) = tudo bom!', author: 'Sofia', votes: 12 },
  { character: '休', text: 'Pessoa (亻) encostada na árvore (木) = descansar', author: 'Lucas', votes: 8 },
  { character: '安', text: 'Mulher (女) em casa (宀) = paz e tranquilidade', author: 'Julia', votes: 6 },
  { character: '家', text: 'Porco (豕) debaixo do teto (宀) = lar', author: 'Tiago', votes: 5 },
];

const SEED_DIFFICULTIES: DifficultyReport[] = [
  { character: '学', type: 'tone', lessonSlug: '04-sintaxe-basica', timestamp: Date.now() - 86400000 * 7 },
  { character: '学', type: 'tone', lessonSlug: '04-sintaxe-basica', timestamp: Date.now() - 86400000 * 6 },
  { character: '学', type: 'tone', lessonSlug: '04-sintaxe-basica', timestamp: Date.now() - 86400000 * 5 },
  { character: '学', type: 'tone', lessonSlug: '06-mae-chinesa-fluencia', timestamp: Date.now() - 86400000 * 4 },
  { character: '学', type: 'meaning', lessonSlug: '04-sintaxe-basica', timestamp: Date.now() - 86400000 * 3 },
  { character: '学', type: 'meaning', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 2 },
  { character: '学', type: 'radical', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 1 },
  { character: '学', type: 'radical', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() },
  { character: '国', type: 'strokes', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 6 },
  { character: '国', type: 'strokes', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 5 },
  { character: '国', type: 'strokes', lessonSlug: '02-pinyin-iniciais', timestamp: Date.now() - 86400000 * 4 },
  { character: '国', type: 'meaning', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 2 },
  { character: '国', type: 'meaning', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 1 },
  { character: '国', type: 'tone', lessonSlug: '02-pinyin-iniciais', timestamp: Date.now() },
  { character: '妈', type: 'tone', lessonSlug: '01-tons-primordiais', timestamp: Date.now() - 86400000 * 5 },
  { character: '妈', type: 'tone', lessonSlug: '01-tons-primordiais', timestamp: Date.now() - 86400000 * 3 },
  { character: '妈', type: 'tone', lessonSlug: '06-mae-chinesa-fluencia', timestamp: Date.now() - 86400000 * 1 },
  { character: '妈', type: 'meaning', lessonSlug: '01-tons-primordiais', timestamp: Date.now() },
  { character: '妈', type: 'other', lessonSlug: '01-tons-primordiais', timestamp: Date.now() },
  { character: '马', type: 'tone', lessonSlug: '01-tons-primordiais', timestamp: Date.now() - 86400000 * 4 },
  { character: '马', type: 'tone', lessonSlug: '01-tons-primordiais', timestamp: Date.now() - 86400000 * 2 },
  { character: '马', type: 'tone', lessonSlug: '01-tons-primordiais', timestamp: Date.now() },
  { character: '马', type: 'radical', lessonSlug: '01-tons-primordiais', timestamp: Date.now() },
  { character: '爱', type: 'radical', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 3 },
  { character: '爱', type: 'radical', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() - 86400000 * 1 },
  { character: '爱', type: 'meaning', lessonSlug: '03-radicais-fundamentais', timestamp: Date.now() },
];

export function seedInitialData(): void {
  if (localStorage.getItem(SEED_FLAG_KEY)) return;
  const situations = getSituations();
  if (situations.length > 0) return;
  const now = Date.now();
  write(KEYS.situations, SEED_SITUATIONS.map((s, i) => ({ ...s, id: uid(), timestamp: now - i * 86400000 })));
  write(KEYS.mnemonics, SEED_MNEMONICS.map((m, i) => ({ ...m, id: uid(), timestamp: now - i * 86400000 })));
  write(KEYS.difficulties, SEED_DIFFICULTIES);
  localStorage.setItem(SEED_FLAG_KEY, '1');
}
