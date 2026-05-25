# Hanzi Wheel Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Bussola3D.astro on the homepage hero with an interactive 3D Hanzi memorization wheel.

**Architecture:** Three.js scene with orbiting character sprites + DOM overlays (tooltip, detail panel, category tabs). Event-driven state machine inspired by FateWheel from the Brazil compass project. Data sourced from `dictionary.ts`.

**Tech Stack:** Astro 6, Three.js, GSAP, Tailwind v4, TypeScript

**Spec:** `docs/superpowers/specs/2026-05-25-hanzi-wheel-design.md`

---

## Chunk 1: Data Layer & Utilities

### Task 1: Extend DictionaryEntry and add entries

**Files:**
- Modify: `src/data/dictionary.ts`

- [ ] **Step 1: Add `fase` and `topic` to `DictionaryEntry`**

```typescript
export interface DictionaryEntry {
  character: string;
  pinyin: string;
  portuguese: string;
  radical: string;
  strokeCount: number;
  mnemonica?: string;
  audioFilename?: string;
  fase: 'A' | 'B' | 'C' | 'D';
  topic: string;
}
```

- [ ] **Step 2: Update existing 9 entries with `fase` and `topic` values**

```typescript
'中': { ...existing, fase: 'A', topic: 'cultura' },
'文': { ...existing, fase: 'A', topic: 'cultura' },
'商': { ...existing, fase: 'B', topic: 'negocios' },
'业': { ...existing, fase: 'B', topic: 'negocios' },
'国': { ...existing, fase: 'A', topic: 'cultura' },
'学': { ...existing, fase: 'A', topic: 'educacao' },
'妈': { ...existing, fase: 'A', topic: 'familia' },
'小': { ...existing, fase: 'A', topic: 'descricao' },
'儿': { ...existing, fase: 'A', topic: 'familia' },
```

- [ ] **Step 3: Add 15-20 more dictionary entries for richer wheel content**

Include characters covering all 4 fases. Minimum 3 per fase. Also normalize existing radical values to short form (e.g. `'一'` instead of `'一 (horizontal)'`) for consistent grouping. Example additions:
```typescript
// Fase A entries (existing normalized + new)
'中': { character: '中', pinyin: 'zhōng', portuguese: 'Centro / Meio / China', radical: '丨', strokeCount: 4, mnemonica: 'Um retângulo atravessado por uma linha vertical exatamente no centro.', fase: 'A', topic: 'cultura' },
'文': { character: '文', pinyin: 'wén', portuguese: 'Escrita / Idioma / Cultura', radical: '文', strokeCount: 4, mnemonica: 'Uma pessoa de braços abertos mostrando padrões.', fase: 'A', topic: 'cultura' },
'国': { character: '国', pinyin: 'guó', portuguese: 'País / Nação / Pátria', radical: '囗', strokeCount: 8, mnemonica: 'Jade (玉) guardado dentro de uma fronteira (囗).', fase: 'A', topic: 'cultura' },
'学': { character: '学', pinyin: 'xué', portuguese: 'Estudar / Aprender / Ciência', radical: '子', strokeCount: 8, mnemonica: 'Garras de conhecimento sobre um filho (子) sob um teto.', fase: 'A', topic: 'educacao' },
'妈': { character: '妈', pinyin: 'mā', portuguese: 'Mãe', radical: '女', strokeCount: 6, mnemonica: 'Mulher (女) ao lado de um cavalo (马).', fase: 'A', topic: 'familia' },
'小': { character: '小', pinyin: 'xiǎo', portuguese: 'Pequeno / Menor', radical: '小', strokeCount: 3, mnemonica: 'Três traços como pequenas gotas.', fase: 'A', topic: 'descricao' },
'儿': { character: '儿', pinyin: 'ér', portuguese: 'Filho / Criança', radical: '儿', strokeCount: 2, mnemonica: 'Perninhas de uma criança.', fase: 'A', topic: 'familia' },
'好': { character: '好', pinyin: 'hǎo', portuguese: 'Bom / Bem', radical: '女', strokeCount: 6, mnemonica: 'Mulher (女) com criança (子) — ter ambos é bom.', fase: 'A', topic: 'descricao' },
'大': { character: '大', pinyin: 'dà', portuguese: 'Grande', radical: '大', strokeCount: 3, mnemonica: 'Pessoa de braços abertos.', fase: 'A', topic: 'descricao' },
'人': { character: '人', pinyin: 'rén', portuguese: 'Pessoa / Humano', radical: '人', strokeCount: 2, fase: 'A', topic: 'social' },
'你': { character: '你', pinyin: 'nǐ', portuguese: 'Tu / Você', radical: '亻', strokeCount: 7, fase: 'A', topic: 'social' },
'我': { character: '我', pinyin: 'wǒ', portuguese: 'Eu / Me', radical: '戈', strokeCount: 7, fase: 'A', topic: 'social' },
'口': { character: '口', pinyin: 'kǒu', portuguese: 'Boca', radical: '口', strokeCount: 3, fase: 'A', topic: 'corpo' },
'手': { character: '手', pinyin: 'shǒu', portuguese: 'Mão', radical: '手', strokeCount: 4, fase: 'A', topic: 'corpo' },
'天': { character: '天', pinyin: 'tiān', portuguese: 'Céu / Dia', radical: '大', strokeCount: 4, fase: 'A', topic: 'natureza' },
'日': { character: '日', pinyin: 'rì', portuguese: 'Sol / Dia', radical: '日', strokeCount: 4, fase: 'A', topic: 'tempo' },
'上': { character: '上', pinyin: 'shàng', portuguese: 'Acima / Subir', radical: '一', strokeCount: 3, fase: 'A', topic: 'direcao' },
'下': { character: '下', pinyin: 'xià', portuguese: 'Abaixo / Descer', radical: '一', strokeCount: 3, fase: 'A', topic: 'direcao' },
'一': { character: '一', pinyin: 'yī', portuguese: 'Um', radical: '一', strokeCount: 1, fase: 'A', topic: 'numeros' },
'二': { character: '二', pinyin: 'èr', portuguese: 'Dois', radical: '二', strokeCount: 2, fase: 'A', topic: 'numeros' },
'三': { character: '三', pinyin: 'sān', portuguese: 'Três', radical: '一', strokeCount: 3, fase: 'A', topic: 'numeros' },
// Fase B entries
'商': { character: '商', pinyin: 'shāng', portuguese: 'Comércio / Negócios', radical: '口', strokeCount: 11, mnemonica: 'Derivado de um pedestal ritualístico da Dinastia Shang.', fase: 'B', topic: 'negocios' },
'业': { character: '业', pinyin: 'yè', portuguese: 'Indústria / Profissão', radical: '一', strokeCount: 5, mnemonica: 'Painel de madeira ou ramificações prosperando.', fase: 'B', topic: 'negocios' },
'水': { character: '水', pinyin: 'shuǐ', portuguese: 'Água', radical: '水', strokeCount: 4, fase: 'B', topic: 'natureza' },
'火': { character: '火', pinyin: 'huǒ', portuguese: 'Fogo', radical: '火', strokeCount: 4, fase: 'B', topic: 'natureza' },
'山': { character: '山', pinyin: 'shān', portuguese: 'Montanha', radical: '山', strokeCount: 3, fase: 'B', topic: 'natureza' },
'月': { character: '月', pinyin: 'yuè', portuguese: 'Lua / Mês', radical: '月', strokeCount: 4, fase: 'B', topic: 'tempo' },
'金': { character: '金', pinyin: 'jīn', portuguese: 'Ouro / Metal', radical: '金', strokeCount: 8, fase: 'B', topic: 'negocios' },
// Fase C entries
'心': { character: '心', pinyin: 'xīn', portuguese: 'Coração / Mente', radical: '心', strokeCount: 4, fase: 'C', topic: 'emocao' },
'语': { character: '语', pinyin: 'yǔ', portuguese: 'Idioma / Fala', radical: '讠', strokeCount: 9, fase: 'C', topic: 'educacao' },
'书': { character: '书', pinyin: 'shū', portuguese: 'Livro / Escrever', radical: '一', strokeCount: 4, fase: 'C', topic: 'educacao' },
'老': { character: '老', pinyin: 'lǎo', portuguese: 'Velho / Antigo / Sempre', radical: '老', strokeCount: 6, fase: 'C', topic: 'social' },
'师': { character: '师', pinyin: 'shī', portuguese: 'Professor / Mestre', radical: '巾', strokeCount: 6, fase: 'C', topic: 'educacao' },
// Fase D entries
'爱': { character: '爱', pinyin: 'ài', portuguese: 'Amor / Gostar', radical: '爫', strokeCount: 10, mnemonica: 'Coração (心) dentro de uma mão amiga sob um teto.', fase: 'D', topic: 'emocao' },
'家': { character: '家', pinyin: 'jiā', portuguese: 'Casa / Família', radical: '宀', strokeCount: 10, fase: 'D', topic: 'familia' },
'安': { character: '安', pinyin: 'ān', portuguese: 'Paz / Calmo', radical: '宀', strokeCount: 6, fase: 'D', topic: 'emocao' },
'乐': { character: '乐', pinyin: 'lè', portuguese: 'Alegria / Feliz', radical: '丿', strokeCount: 5, fase: 'D', topic: 'emocao' },
'花': { character: '花', pinyin: 'huā', portuguese: 'Flor', radical: '艹', strokeCount: 7, fase: 'D', topic: 'natureza' },
```

- [ ] **Step 4: Verify file compiles with TypeScript**

Run: `npx tsc --noEmit src/data/dictionary.ts`
Expected: No type errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/dictionary.ts
git commit -m "feat: extend dictionary with fase, topic, and 20 entries for Hanzi wheel"
```

### Task 2: Create types

**Files:**
- Create: `src/lib/hanzi-wheel/types.ts`

- [ ] **Step 1: Write `types.ts`**

```typescript
export type DeviceTier = 'high' | 'medium' | 'low';

export type WheelCategory = 'tone' | 'radical' | 'topic' | 'fase';

export type WheelState =
  | 'idle'
  | 'hovering'
  | 'detail'
  | 'switching-category'
  | 'rotating';

export interface WheelStateData {
  state: WheelState;
  currentCategory: WheelCategory;
  currentGroup: string;
  centerCharacter: string | null;
  hoveredCharacter: string | null;
  selectedCharacter: string | null;
  orbitingCharacters: string[];
}

export interface WheelGroup {
  id: string;
  label: string;
  color: string;
  characters: string[];
}

export interface CategoryConfig {
  id: WheelCategory;
  label: string;
  icon: string;
  color: string;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/types.ts
git commit -m "feat: add Hanzi wheel types"
```

### Task 3: Create config

**Files:**
- Create: `src/lib/hanzi-wheel/config.ts`

- [ ] **Step 1: Write `config.ts`**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/config.ts
git commit -m "feat: add Hanzi wheel config with group builder"
```

### Task 4: Create character utilities and device tier

**Files:**
- Create: `src/lib/hanzi-wheel/character-utils.ts`
- Create: `src/lib/hanzi-wheel/device-tier.ts`

- [ ] **Step 1: Write `character-utils.ts`**

```typescript
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
```

- [ ] **Step 2: Write `device-tier.ts`** (adapted from FateWheel)

```typescript
import type { DeviceTier } from './types';

export function detectDeviceTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'high';
  const gpu = (navigator as any).gpu;
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;

  if (memory <= 2 || cores <= 2) return 'low';
  if (memory >= 8 && cores >= 8 && gpu) return 'high';
  return 'medium';
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/hanzi-wheel/character-utils.ts src/lib/hanzi-wheel/device-tier.ts
git commit -m "feat: add character utils and device tier detection"
```

---

## Chunk 2: State Machine

### Task 5: Create state manager

**Files:**
- Create: `src/lib/hanzi-wheel/state-manager.ts`

- [ ] **Step 1: Write `state-manager.ts`**

```typescript
import type { WheelState, WheelStateData, WheelCategory } from './types';
import { buildGroups } from './config';

class HanziWheelStateManager {
  private data: WheelStateData = {
    state: 'idle',
    currentCategory: 'fase',
    currentGroup: '',
    centerCharacter: null,
    hoveredCharacter: null,
    selectedCharacter: null,
    orbitingCharacters: [],
  };

  getState(): WheelState { return this.data.state; }
  getData(): WheelStateData { return { ...this.data }; }

  init(): void {
    const groups = buildGroups('fase');
    if (groups.length > 0) {
      this.data.currentGroup = groups[0].id;
      this.data.orbitingCharacters = [...groups[0].characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
  }

  switchCategory(category: WheelCategory): void {
    this.data.state = 'switching-category';
    this.emit('switching-category', { category });
    this.data.currentCategory = category;
    const groups = buildGroups(category);
    if (groups.length > 0) {
      this.data.currentGroup = groups[0].id;
      this.data.orbitingCharacters = [...groups[0].characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
    this.data.state = 'idle';
    this.emit('category-change', { category, group: this.data.currentGroup });
  }

  switchGroup(groupId: string): void {
    this.data.currentGroup = groupId;
    const groups = buildGroups(this.data.currentCategory);
    const group = groups.find(g => g.id === groupId);
    if (group) {
      this.data.orbitingCharacters = [...group.characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
    this.emit('group-change', { group: groupId });
  }

  hoverCharacter(character: string | null): void {
    this.data.hoveredCharacter = character;
    this.data.state = character ? 'hovering' : 'idle';
    this.emit('character-hover', { character });
  }

  selectCharacter(character: string): void {
    this.data.selectedCharacter = character;
    this.data.state = 'detail';
    this.emit('character-click', { character });
  }

  closeDetail(): void {
    this.data.selectedCharacter = null;
    this.data.state = 'idle';
    this.emit('close-detail', {});
  }

  private emit(event: string, detail: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`hanzi-wheel:${event}`, { detail }));
    }
  }
}

export const stateManager = new HanziWheelStateManager();
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/state-manager.ts
git commit -m "feat: add Hanzi wheel state manager"
```

---

## Chunk 3: Three.js Scene

### Task 6: Create wheel-core (center + ring)

**Files:**
- Create: `src/lib/hanzi-wheel/wheel-core.ts`

- [ ] **Step 1: Write `wheel-core.ts`**

```typescript
import * as THREE from 'three';
import type { DeviceTier } from './types';

let centerGroup: THREE.Group;
let centerSprite: THREE.Sprite | null = null;

export function initWheelCore(parent: THREE.Group, deviceTier: DeviceTier): void {
  centerGroup = new THREE.Group();

  // Outer ring
  const ringGeo = new THREE.RingGeometry(1.15, 1.2, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xD4A843,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  centerGroup.add(ring);

  // Dashed orbit line
  const segments = 48;
  const vertices: number[] = [];
  const radius = 1.2;
  for (let i = 0; i < segments; i += 2) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 1) / segments) * Math.PI * 2;
    vertices.push(
      Math.cos(a1) * radius, Math.sin(a1) * radius, 0,
      Math.cos(a2) * radius, Math.sin(a2) * radius, 0,
    );
  }
  const dashGeo = new THREE.BufferGeometry();
  dashGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const dashMat = new THREE.LineBasicMaterial({ color: 0xD4A843, transparent: true, opacity: 0.12 });
  const ringLine = new THREE.Line(dashGeo, dashMat);
  centerGroup.add(ringLine);

  // Center character sprite (created but empty; updated later via updateCenterSprite)
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  centerSprite = new THREE.Sprite(spriteMat);
  centerSprite.scale.set(0.6, 0.6, 1);
  centerSprite.position.z = 0.1;
  centerGroup.add(centerSprite);

  parent.add(centerGroup);
}

export function updateCenterSprite(character: string, color: string): void {
  if (!centerSprite) return;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = 'bold 56px "Noto Serif SC", "SimSun", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = `${color}88`;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(character, 64, 64);
  (centerSprite.material as THREE.SpriteMaterial).map!.needsUpdate = true;
}

export function animateWheel(time: number): void {
  centerGroup.rotation.z += 0.001;
  if (centerSprite) {
    centerSprite.material.rotation += 0.003;
  }
}

export function getWheelGroup(): THREE.Group {
  return centerGroup;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/wheel-core.ts
git commit -m "feat: add wheel core with ring geometry"
```

### Task 7: Create orbiting-chars

**Files:**
- Create: `src/lib/hanzi-wheel/orbiting-chars.ts`

- [ ] **Step 1: Write `orbiting-chars.ts`**

```typescript
import * as THREE from 'three';

let sprites: THREE.Sprite[] = [];
const ORBIT_RADIUS = 1.8;
const FONT_SIZE = 36;

export function createOrbitingCharacters(
  scene: THREE.Scene,
  characters: string[],
  color: string,
): THREE.Sprite[] {
  clearOrbitingCharacters(scene);

  sprites = characters.map((char, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 64, 64);
    ctx.font = `bold ${FONT_SIZE}px "Noto Serif SC", "SimSun", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowColor = `${color}66`;
    ctx.shadowBlur = 8;
    ctx.fillText(char, 32, 34);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(material);

    const angle = (i / characters.length) * Math.PI * 2;
    sprite.position.set(
      Math.cos(angle) * ORBIT_RADIUS,
      Math.sin(angle) * ORBIT_RADIUS,
      0,
    );
    sprite.scale.set(0.4, 0.4, 1);
    sprite.userData = { character: char, angle, baseColor: color };

    scene.add(sprite);
    return sprite;
  });

  return sprites;
}

export function updateOrbitPositions(deltaTime: number): void {
  sprites.forEach(sprite => {
    const angle = sprite.userData.angle;
    sprite.userData.angle = angle + deltaTime * 0.15;
    sprite.position.x = Math.cos(sprite.userData.angle) * ORBIT_RADIUS;
    sprite.position.y = Math.sin(sprite.userData.angle) * ORBIT_RADIUS;
  });
}

export function highlightSprite(sprite: THREE.Sprite | null): void {
  sprites.forEach(s => {
    if (s === sprite) {
      s.scale.set(0.55, 0.55, 1);
      (s.material as THREE.SpriteMaterial).opacity = 1;
    } else {
      s.scale.set(0.4, 0.4, 1);
      (s.material as THREE.SpriteMaterial).opacity = 0.7;
    }
  });
}

export function resetHighlight(): void {
  sprites.forEach(s => {
    s.scale.set(0.4, 0.4, 1);
    (s.material as THREE.SpriteMaterial).opacity = 1;
  });
}

export function clearOrbitingCharacters(scene: THREE.Scene): void {
  sprites.forEach(s => {
    scene.remove(s);
    s.material.map?.dispose();
    s.material.dispose();
  });
  sprites = [];
}

export function getOrbitingSprites(): THREE.Sprite[] {
  return sprites;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/orbiting-chars.ts
git commit -m "feat: add orbiting character sprites"
```

### Task 8: Create scene-manager

**Files:**
- Create: `src/lib/hanzi-wheel/scene-manager.ts`

- [ ] **Step 1: Write `scene-manager.ts`**

```typescript
import * as THREE from 'three';
import type { DeviceTier } from './types';
import { detectDeviceTier } from './device-tier';
import { initWheelCore, updateCenterSprite, animateWheel } from './wheel-core';
import { createOrbitingCharacters, updateOrbitPositions, getOrbitingSprites, highlightSprite, resetHighlight, clearOrbitingCharacters } from './orbiting-chars';
import { stateManager } from './state-manager';
import { categoryColors } from './config';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let animationId: number | null = null;
let lastTime = 0;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
let isInitialized = false;
let wheelGroup: THREE.Group;
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

export async function initScene(canvas: HTMLCanvasElement): Promise<void> {
  if (isInitialized) return;
  isInitialized = true;

  const deviceTier: DeviceTier = detectDeviceTier();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 2.8;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: deviceTier !== 'medium',
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(deviceTier === 'high' ? 2 : 1, window.devicePixelRatio));

  wheelGroup = new THREE.Group();
  scene.add(wheelGroup);

  initWheelCore(wheelGroup, deviceTier);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  stateManager.init();
  loadCurrentGroup();

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onClick, true);
  window.addEventListener('resize', onResize);
  window.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('hanzi-wheel:category-change', onCategoryChange as EventListener);
  window.addEventListener('hanzi-wheel:group-change', onGroupChange as EventListener);

  startRenderLoop();
}

function loadCurrentGroup(): void {
  const data = stateManager.getData();
  const color = categoryColors[data.currentCategory];
  clearOrbitingCharacters(wheelGroup);
  createOrbitingCharacters(wheelGroup, data.orbitingCharacters, color);
  if (data.centerCharacter) {
    updateCenterSprite(data.centerCharacter, color);
  }
}

function onCategoryChange(e: CustomEvent): void {
  loadCurrentGroup();
}

function onGroupChange(_e: CustomEvent): void {
  loadCurrentGroup();
}

function onMouseMove(e: MouseEvent): void {
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const sprites = getOrbitingSprites();
  const intersects = raycaster.intersectObjects(sprites);

  if (intersects.length > 0) {
    const sprite = intersects[0].object as THREE.Sprite;
    const char = sprite.userData.character as string;
    highlightSprite(sprite);
    stateManager.hoverCharacter(char);
    window.dispatchEvent(new CustomEvent('hanzi-wheel:character-hover', {
      detail: { character: char, mouseX: e.clientX, mouseY: e.clientY }
    }));
  } else {
    resetHighlight();
    if (stateManager.getState() === 'hovering') {
      stateManager.hoverCharacter(null);
    }
  }
}

function onClick(e: MouseEvent): void {
  if (stateManager.getState() === 'detail') return;

  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const sprites = getOrbitingSprites();
  const intersects = raycaster.intersectObjects(sprites);

  if (intersects.length > 0) {
    const sprite = intersects[0].object as THREE.Sprite;
    const char = sprite.userData.character as string;
    stateManager.selectCharacter(char);
  }
}

function startRenderLoop(): void {
  function loop(time: number) {
    animationId = requestAnimationFrame(loop);
    const delta = time - lastTime;
    if (delta < FRAME_INTERVAL) return;
    lastTime = time - (delta % FRAME_INTERVAL);

    if (stateManager.getState() !== 'detail') {
      updateOrbitPositions(0.016);
      animateWheel(time * 0.001);
    }

    renderer.render(scene, camera);
  }
  animationId = requestAnimationFrame(loop);
}

function onResize(): void {
  const canvas = renderer.domElement;
  const parent = canvas.parentElement;
  if (!parent) return;
  const w = parent.clientWidth;
  const h = parent.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function onVisibilityChange(): void {
  if (document.hidden && animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  } else if (!document.hidden && !animationId) {
    startRenderLoop();
  }
}

export function disposeScene(): void {
  if (animationId) cancelAnimationFrame(animationId);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('click', onClick, true);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('hanzi-wheel:category-change', onCategoryChange as EventListener);
  window.removeEventListener('hanzi-wheel:group-change', onGroupChange as EventListener);
  renderer.dispose();
  isInitialized = false;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/hanzi-wheel/scene-manager.ts
git commit -m "feat: add Hanzi wheel Three.js scene manager"
```

---

## Chunk 4: Astro Components & Integration

### Task 9: Create HanziWheel.astro (main component)

**Files:**
- Create: `src/components/HanziWheel.astro`

- [ ] **Step 1: Write `HanziWheel.astro`**

```astro
---
import '../styles/hanzi-wheel.css';
import { categories } from '../lib/hanzi-wheel/config';
---

<div class="hanzi-wheel-wrapper" id="hanzi-wheel-root">
  <canvas class="hanzi-wheel-canvas" id="hanzi-wheel-canvas"></canvas>

  <div class="hw-tooltip-mouse" id="hw-tooltip-mouse" style="display:none;">
    <span class="hw-tooltip-char" id="hw-tooltip-char"></span>
    <span class="hw-tooltip-pinyin" id="hw-tooltip-pinyin"></span>
    <span class="hw-tooltip-meaning" id="hw-tooltip-meaning"></span>
  </div>

  <div class="hw-detail-panel" id="hw-detail-panel" style="display:none;">
    <button class="hw-detail-close" id="hw-detail-close">&times;</button>
    <div class="hw-detail-char" id="hw-detail-char"></div>
    <div class="hw-detail-pinyin" id="hw-detail-pinyin">
      <span id="hw-detail-pinyin-text"></span>
      <button class="hw-detail-audio" id="hw-detail-audio">🔊</button>
    </div>
    <div class="hw-detail-tags" id="hw-detail-tags"></div>
    <div class="hw-detail-radical" id="hw-detail-radical"></div>
    <div class="hw-detail-strokes" id="hw-detail-strokes"></div>
    <div class="hw-detail-mnemonic" id="hw-detail-mnemonic"></div>
    <div class="hw-detail-lesson" id="hw-detail-lesson">
      <a href="#" id="hw-lesson-link">Ver na lição →</a>
    </div>
  </div>

  <div class="hw-footer">
    <div class="hw-tabs">
      {categories.map(cat => (
        <button class="hw-tab" data-category={cat.id}>
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
    <div class="hw-dots" id="hw-dots"></div>
  </div>
</div>

<script>
  import { initScene, disposeScene } from '../lib/hanzi-wheel/scene-manager';
  import { stateManager } from '../lib/hanzi-wheel/state-manager';
  import { buildGroups } from '../lib/hanzi-wheel/config';
  import { getCharInfo } from '../lib/hanzi-wheel/character-utils';

  const root = document.getElementById('hanzi-wheel-root')!;
  const canvas = document.getElementById('hanzi-wheel-canvas') as HTMLCanvasElement;
  const tooltip = document.getElementById('hw-tooltip-mouse')!;
  const tooltipChar = document.getElementById('hw-tooltip-char')!;
  const tooltipPinyin = document.getElementById('hw-tooltip-pinyin')!;
  const tooltipMeaning = document.getElementById('hw-tooltip-meaning')!;
  const detailPanel = document.getElementById('hw-detail-panel')!;
  const detailClose = document.getElementById('hw-detail-close')!;
  const detailChar = document.getElementById('hw-detail-char')!;
  const detailPinyinText = document.getElementById('hw-detail-pinyin-text')!;
  const detailAudio = document.getElementById('hw-detail-audio') as HTMLButtonElement;
  const detailTags = document.getElementById('hw-detail-tags')!;
  const detailRadical = document.getElementById('hw-detail-radical')!;
  const detailStrokes = document.getElementById('hw-detail-strokes')!;
  const detailMnemonic = document.getElementById('hw-detail-mnemonic')!;
  const lessonLink = document.getElementById('hw-lesson-link') as HTMLAnchorElement;
  const tabs = document.querySelectorAll('.hw-tab');
  const dotsContainer = document.getElementById('hw-dots')!;

  function getActiveCategory(): string {
    return document.querySelector('.hw-tab.active')?.getAttribute('data-category') || 'fase';
  }

  function updateDots(category: string): void {
    const groups = buildGroups(category as any);
    const currentGroup = stateManager.getData().currentGroup;
    dotsContainer.innerHTML = groups.map(g => `
      <button class="hw-dot ${g.id === currentGroup ? 'active' : ''}" data-group="${g.id}"></button>
    `).join('');
    dotsContainer.querySelectorAll('.hw-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        stateManager.switchGroup(btn.getAttribute('data-group')!);
      });
    });
  }

  function showTooltip(char: string, x: number, y: number): void {
    const info = getCharInfo(char);
    if (!info) return;
    tooltipChar.textContent = char;
    tooltipPinyin.textContent = info.pinyin;
    tooltipMeaning.textContent = info.portuguese;
    tooltip.style.left = `${x + 16}px`;
    tooltip.style.top = `${y - 10}px`;
    tooltip.style.display = 'flex';
  }

  function hideTooltip(): void {
    tooltip.style.display = 'none';
  }

  function showDetail(char: string): void {
    const info = getCharInfo(char);
    if (!info) return;
    detailChar.textContent = char;
    detailPinyinText.textContent = `${info.pinyin} — ${info.portuguese}`;
    detailTags.innerHTML = `<span class="hw-tag">${info.fase}</span><span class="hw-tag">${info.topic}</span><span class="hw-tag">${info.radical}</span>`;
    detailRadical.textContent = `Radical: ${info.radical}`;
    detailStrokes.textContent = `Traços: ${info.strokeCount}`;
    detailMnemonic.textContent = info.mnemonica || '';
    if (info.audioFilename) {
      detailAudio.style.display = 'inline-block';
      detailAudio.onclick = () => {
        const audio = new Audio(`/audio/${info.audioFilename}`);
        audio.play();
      };
    } else {
      detailAudio.style.display = 'none';
    }
    const fase = info.fase;
    lessonLink.href = `/licoes#fase-${fase}`;
    detailPanel.classList.add('active');
    detailPanel.style.display = 'block';
  }

  function hideDetail(): void {
    detailPanel.classList.remove('active');
    detailPanel.style.display = 'none';
  }

  detailClose.addEventListener('click', () => {
    stateManager.closeDetail();
    hideDetail();
  });

  window.addEventListener('hanzi-wheel:character-hover', ((e: CustomEvent) => {
    const { character } = e.detail;
    if (character) showTooltip(character, e.detail.mouseX || 0, e.detail.mouseY || 0);
    else hideTooltip();
  }) as EventListener);

  window.addEventListener('hanzi-wheel:character-click', ((e: CustomEvent) => {
    const { character } = e.detail;
    if (character) showDetail(character);
    hideTooltip();
  }) as EventListener);

  window.addEventListener('hanzi-wheel:close-detail', hideDetail);

  window.addEventListener('hanzi-wheel:category-change', ((e: CustomEvent) => {
    const { category } = e.detail;
    tabs.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-category') === category);
    });
    updateDots(category);
  }) as EventListener);

  window.addEventListener('hanzi-wheel:group-change', ((_e: CustomEvent) => {
    updateDots(getActiveCategory());
  }) as EventListener);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category')!;
      stateManager.switchCategory(category as any);
    });
  });

  // Init: activate first tab, render dots
  const firstTab = tabs[0];
  if (firstTab) {
    firstTab.classList.add('active');
    updateDots('fase');
  }

  if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initScene(canvas));
    } else {
      initScene(canvas);
    }
    window.addEventListener('beforeunload', disposeScene);
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HanziWheel.astro
git commit -m "feat: add HanziWheel main component"
```

### Task 10: Create CSS styles

**Files:**
- Create: `src/styles/hanzi-wheel.css`

- [ ] **Step 1: Write `hanzi-wheel.css`**

```css
.hanzi-wheel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hanzi-wheel-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: pointer;
}

/* Tooltip */
.hw-tooltip-mouse {
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(8px);
  z-index: 100;
  pointer-events: none;
  font-family: 'Inter', sans-serif;
}

.hw-tooltip-char {
  font-size: 24px;
  font-family: 'Noto Serif SC', serif;
  color: #D4A843;
}

.hw-tooltip-pinyin {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.hw-tooltip-meaning {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* Detail panel */
.hw-detail-panel {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 220px;
  background: rgba(15, 15, 20, 0.95);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 16px;
  z-index: 20;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.hw-detail-panel.active {
  transform: translateX(0);
}

.hw-detail-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 20px;
  cursor: pointer;
}

.hw-detail-char {
  font-size: 42px;
  font-family: 'Noto Serif SC', serif;
  color: #D4A843;
  text-align: center;
  margin-bottom: 8px;
}

.hw-detail-pinyin {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.hw-detail-audio {
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.hw-detail-audio:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hw-detail-tags {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.hw-tag {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hw-detail-radical,
.hw-detail-strokes {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
}

.hw-detail-mnemonic {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.hw-detail-lesson {
  margin-top: 16px;
  text-align: center;
}

.hw-detail-lesson a {
  color: #3B82F6;
  font-size: 12px;
  text-decoration: none;
}

.hw-detail-lesson a:hover {
  text-decoration: underline;
}

/* Footer: tabs + dots */
.hw-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
}

.hw-tabs {
  display: flex;
  gap: 4px;
}

.hw-tab {
  padding: 4px 10px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Inter', sans-serif;
}

.hw-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.hw-tab.active {
  background: rgba(212, 168, 67, 0.15);
  border-color: #D4A843;
  color: #D4A843;
}

.hw-dots {
  display: flex;
  gap: 6px;
}

.hw-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;
}

.hw-dot.active {
  background: #D4A843;
  transform: scale(1.3);
}

.hw-dot:hover {
  background: rgba(255, 255, 255, 0.4);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/hanzi-wheel.css
git commit -m "feat: add Hanzi wheel CSS"
```

### Task 11: Integrate into homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Find and replace `<Bussola3D />` with `<HanziWheel />`**

Search for the Bussola3D import and usage. Replace:

```astro
import Bussola3D from '../components/Bussola3D.astro';
```

With:

```astro
import HanziWheel from '../components/HanziWheel.astro';
```

And replace:

```astro
<Bussola3D />
```

With:

```astro
<HanziWheel />
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: replace Bussola3D with HanziWheel on homepage"
```

### Task 12: Final verification

- [ ] **Step 1: Build the project**

Run: `npm run build`
Expected: No errors, output in `dist/`

- [ ] **Step 2: Verify homepage renders**

Run: `npm run dev`
Navigate to homepage. Verify:
  - Canvas appears in right column
  - Category tabs show (Tom, Radical, Tópico, Nível)
  - First tab active, dots rendered
  - Hovering over canvas area triggers tooltip
  - Clicking sprite opens detail panel
  - Clicking close restores idle state
  - Switching category changes dots

- [ ] **Step 3: Verify no other imports of Bussola3D before cleanup**

Run: `rg "Bussola3D" src/ --type ts --type astro`
Expected: Only results in `src/pages/index.astro` (which was already updated).

- [ ] **Step 4: Clean up (optional)**

If no other files import Bussola3D:
```bash
git rm src/components/Bussola3D.astro
git commit -m "chore: remove Bussola3D replaced by HanziWheel"
```
