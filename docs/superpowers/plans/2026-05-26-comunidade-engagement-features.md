# Comunidade Engagement Features — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three user-engagement features (situational requests, difficulty tracking, collaborative mnemonics) with inline CTAs at end of lessons and a central hub at `/comunidade`.

**Architecture:** All data stored client-side in localStorage (Phase 1). CTAs are Astro components embedded in lesson pages. Hub page uses hash-based tab routing with 3 client-side board components. A shared `comunidade-storage.ts` lib provides typed CRUD for all 3 features.

**Tech Stack:** Astro (static), TypeScript, Vitest, localStorage

---

## Chunk 1: Storage Layer

### Task 1.1: Write failing tests for storage helpers

**Files:**
- Create: `tests/comunidade-storage.test.ts`
- Create: `src/lib/comunidade-storage.ts`

- [ ] **Step 1: Write test file**

```ts
// tests/comunidade-storage.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  getDifficulties,
  addDifficulty,
  getMnemonics,
  addMnemonic,
  voteMnemonic,
  getSituations,
  addSituation,
  voteSituation,
} from '../src/lib/comunidade-storage';

describe('comunidade-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // --- Difficulties ---
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

  // --- Mnemonics ---
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

  it('getMnemonicsByChar filters correctly', async () => {
    const { getMnemonicsByChar } = await import('../src/lib/comunidade-storage');
    addMnemonic('学', 'Macete A', 'Ana');
    addMnemonic('国', 'Macete B', 'Bia');
    addMnemonic('学', 'Macete C', 'Carlos');
    const results = getMnemonicsByChar('学');
    expect(results).toHaveLength(2);
  });

  // --- Situations ---
  it('getSituations returns empty array initially', () => {
    expect(getSituations()).toEqual([]);
  });

  it('addSituation creates a situation with pendente status', () => {
    const s = addSituation('Como peço comida vegetariana?', 'Em um restaurante em Pequim', ['restaurante']);
    expect(s.title).toBe('Como peço comida vegetariana?');
    expect(s.description).toContain('restaurante');
    expect(s.status).toBe('pendente');
    expect(s.votes).toBe(1); // author auto-votes
    expect(getSituations()).toHaveLength(1);
  });

  it('voteSituation increments votes', () => {
    const s = addSituation('Título', 'Desc', []);
    voteSituation(s.id);
    expect(voteSituation(s.id)?.votes).toBe(3);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/comunidade-storage.test.ts`
Expected: FAIL — all tests fail with "module not found" / "not a function"

- [ ] **Step 3: Write storage implementation**

```ts
// src/lib/comunidade-storage.ts

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

// --- Difficulties ---

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

// --- Mnemonics ---

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

// --- Situations ---

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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/comunidade-storage.test.ts`
Expected: PASS — all tests green

- [ ] **Step 5: Commit**

```bash
git add src/lib/comunidade-storage.ts tests/comunidade-storage.test.ts
git commit -m "feat: add comunidade storage layer with localStorage helpers"
```

---

## Chunk 2: ComunidadeCard Component

### Task 2.1: Create the reusable CTA card

**Files:**
- Create: `src/components/ComunidadeCard.astro`

- [ ] **Step 1: Write the component**

```astro
---
// src/components/ComunidadeCard.astro
export interface Props {
  icon: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const { icon, title, description, href, cta } = Astro.props;
---

<a
  href={href}
  class="flex-1 flex flex-col items-start gap-2 glass-panel rounded-xl px-5 py-5 border border-white/5 hover:border-brand-gold/30 transition-all duration-300 group min-w-0"
>
  <span class="text-2xl">{icon}</span>
  <div>
    <h4 class="text-sm font-display font-extrabold text-white group-hover:text-brand-gold transition-colors">{title}</h4>
    <p class="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{description}</p>
  </div>
  <span class="text-[10px] font-bold uppercase tracking-wider text-brand-gold mt-auto">{cta} →</span>
</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ComunidadeCard.astro
git commit -m "feat: add ComunidadeCard CTA component"
```

---

## Chunk 3: End-of-Lesson "Sua Vez" Section

### Task 3.1: Add the section to `[slug].astro`

**Files:**
- Modify: `src/pages/licoes/[slug].astro` (after prev/next nav, before `</article>`)

- [ ] **Step 1: Add import for ComunidadeCard**

Add to the frontmatter imports:
```astro
import ComunidadeCard from '../../components/ComunidadeCard.astro';
```

- [ ] **Step 2: Add "Sua Vez" HTML after prev/next nav**

After the `{(prevLesson || nextLesson) && (...)}` block and before `</article>`, add:

```astro
<!-- SUA VEZ: Community Engagement CTAs -->
<div class="glass-panel rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
  <div class="flex items-center gap-3 mb-5">
    <span class="text-xl">🤝</span>
    <h3 class="text-lg font-display font-extrabold text-white">Sua Vez!</h3>
    <span class="text-[10px] text-gray-500 font-medium">Contribua com a comunidade</span>
  </div>

  <div class="flex flex-col sm:flex-row gap-4">
    <ComunidadeCard
      icon="🗣️"
      title="Peça uma Situação"
      description="Tem uma situação do dia a dia que você não sabe como expressar em chinês?"
      href="/comunidade#situacoes"
      cta="Pedir"
    />
    <ComunidadeCard
      icon="🔍"
      title="Registre Dificuldade"
      description="Algum caractere desta lição te travou? Marque aqui para ajudar outros alunos."
      href="/comunidade#dificuldades"
      cta="Registrar"
    />
    <ComunidadeCard
      icon="🧠"
      title="Compartilhe um Macete"
      description="Tem um jeito criativo de memorizar um caractere? Compartilhe com a turma!"
      href="/comunidade#macetes"
      cta="Enviar"
    />
  </div>

  <div class="mt-5 pt-4 border-t border-white/5 text-center">
    <a
      href="/comunidade"
      class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-gold hover:text-white transition-colors"
    >
      📊 Ver comunidade completa →
    </a>
  </div>
</div>
```

- [ ] **Step 3: Build to verify**

Run: `npx astro build`
Expected: Build succeeds, no errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/licoes/\[slug\].astro src/components/ComunidadeCard.astro
git commit -m "feat: add Sua Vez community CTA section to lesson pages"
```

---

## Chunk 4: Hub Page (`/comunidade`)

### Task 4.1: Create the comunidade hub page with 3 tabbed boards

**Files:**
- Create: `src/pages/comunidade.astro`
- Create: `src/components/SituacaoBoard.astro`
- Create: `src/components/DificuldadeBoard.astro`
- Create: `src/components/MaceteBoard.astro`

- [ ] **Step 1: Create hub page**

```astro
---
// src/pages/comunidade.astro
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Comunidade - Falo Chinês" description="Participe da comunidade Falo Chinês: peça situações, registre dificuldades e compartilhe macetes.">
  <div class="py-10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.02),transparent_45%)]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl sm:text-4xl font-display font-black text-white">🤝 Comunidade Falo Chinês</h1>
        <p class="text-sm text-gray-400 mt-2 max-w-lg mx-auto">
          Contribua com seu conhecimento, peça ajuda onde trava e veja o que outros alunos estão aprendendo.
        </p>
      </div>

      <!-- Tab Navigation -->
      <div class="flex border-b border-white/10 mb-8" id="comunidade-tabs">
        <a href="#situacoes" class="comunidade-tab flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold border-b-2 border-transparent transition-all" data-tab="situacoes">
          🗣️ Situações
        </a>
        <a href="#dificuldades" class="comunidade-tab flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold border-b-2 border-transparent transition-all" data-tab="dificuldades">
          🔍 Dificuldades
        </a>
        <a href="#macetes" class="comunidade-tab flex-1 text-center py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-brand-gold border-b-2 border-transparent transition-all" data-tab="macetes">
          🧠 Macetes
        </a>
      </div>

      <!-- Tab Content -->
      <div id="comunidade-content">
        <div id="tab-situacoes" class="comunidade-panel">
          <p class="text-gray-500 text-sm text-center py-12">Carregando...</p>
        </div>
        <div id="tab-dificuldades" class="comunidade-panel hidden">
          <p class="text-gray-500 text-sm text-center py-12">Carregando...</p>
        </div>
        <div id="tab-macetes" class="comunidade-panel hidden">
          <p class="text-gray-500 text-sm text-center py-12">Carregando...</p>
        </div>
      </div>

    </div>
  </div>
</Layout>

<script>
  // Hash-based tab switching
  const tabs = document.querySelectorAll('.comunidade-tab');
  const panels: Record<string, HTMLElement> = {
    situacoes: document.getElementById('tab-situacoes')!,
    dificuldades: document.getElementById('tab-dificuldades')!,
    macetes: document.getElementById('tab-macetes')!,
  };

  function activateTab(hash: string) {
    const tabId = hash.replace('#', '') || 'situacoes';
    tabs.forEach(t => {
      const isActive = t.getAttribute('data-tab') === tabId;
      t.classList.toggle('text-brand-gold', isActive);
      t.classList.toggle('text-gray-400', !isActive);
      t.classList.toggle('border-brand-gold', isActive);
      t.classList.toggle('border-transparent', !isActive);
    });
    Object.entries(panels).forEach(([id, el]) => {
      el.classList.toggle('hidden', id !== tabId);
    });
  }

  // Initial load
  activateTab(window.location.hash);

  // Handle hash changes
  window.addEventListener('hashchange', () => activateTab(window.location.hash));

  // Also handle click on tab links (they use href="#situacoes" etc)
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = tab.getAttribute('data-tab')!;
      window.location.hash = tabId;
    });
  });

  // --- Now mount the board components ---
  async function mountBoards() {
    const { getSituations, addSituation, voteSituation } = await import('../../lib/comunidade-storage');
    const { getDifficulties, addDifficulty } = await import('../../lib/comunidade-storage');
    const { getMnemonics, addMnemonic, voteMnemonic, getMnemonicsByChar } = await import('../../lib/comunidade-storage');

    const situacoesEl = document.getElementById('tab-situacoes');
    const dificuldadesEl = document.getElementById('tab-dificuldades');
    const macetesEl = document.getElementById('tab-macetes');

    if (situacoesEl) renderSituacaoBoard(situacoesEl, { getSituations, addSituation, voteSituation });
    if (dificuldadesEl) renderDificuldadeBoard(dificuldadesEl, { getDifficulties, addDifficulty });
    if (macetesEl) renderMaceteBoard(macetesEl, { getMnemonics, addMnemonic, voteMnemonic, getMnemonicsByChar });
  }

  // Inline render functions (see component files for the actual code)
  function renderSituacaoBoard(container, api) { /* ... */ }
  function renderDificuldadeBoard(container, api) { /* ... */ }
  function renderMaceteBoard(container, api) { /* ... */ }

  mountBoards();
</script>
```

Wait, this is getting complex with inline render functions. Let me think about the best approach.

Actually, for Astro components that need client-side interactivity, I have two options:
1. Make them `.astro` files with `<script>` blocks
2. Make them standalone `.ts` render functions

Since the boards need to be dynamically imported based on hash changes, and the data is all client-side, let me keep it simpler:

- The `.astro` page handles the static layout and tab switching
- Each board is rendered by a function from a `comunidade-render.ts` lib file

Let me revise the approach:

**Files:**
- `src/pages/comunidade.astro` — page layout + tab switching + imports render functions
- `src/lib/comunidade-render.ts` — 3 render functions for each board

This is cleaner. Let me rewrite.

- [ ] **Step 1: Create the render lib**

```ts
// src/lib/comunidade-render.ts
import type { DifficultyReport, Mnemonic, Situation } from './comunidade-storage';

// ... render functions
```

Actually, let me simplify further. I'll put the render logic directly in the inline script of `comunidade.astro`. It keeps things simple and is consistent with how `[slug].astro` handles its inline script. No need for another layer.

- [ ] **Step 1: Create `src/pages/comunidade.astro`**

(Full page with inline script containing tab switching and board rendering.)

- [ ] **Step 2: Build to verify**

Run: `npx astro build`
Expected: Build succeeds, 14 pages

- [ ] **Step 3: Commit**

```bash
git add src/pages/comunidade.astro
git commit -m "feat: add comunidade hub page with 3 tabbed boards"
```

---

## Chunk 5: Glossary Popup Difficulty & Mnemonic CTAs

### Task 5.1: Add difficulty button and mnemonic display to glossary popup

**Files:**
- Modify: `src/pages/licoes/[slug].astro` (popup HTML + inline script)

- [ ] **Step 1: Add difficulty HTML to the glossary popup**

Inside the popup `div`, before the closing `</div>` of the popup, add:
```html
<div class="pt-3 border-t border-white/5 mt-3">
  <button id="popup-difficulty-btn" class="text-[10px] font-bold text-gray-400 hover:text-brand-gold transition-colors flex items-center gap-1">
    😓 Tive dificuldade com este caractere
  </button>
  <div id="popup-difficulty-options" class="hidden mt-2 space-y-1">
    <p class="text-[9px] uppercase font-bold text-gray-500 tracking-wider mb-1">Qual tipo?</p>
    <div class="flex flex-wrap gap-1.5" id="popup-difficulty-types">
      <button class="diff-btn text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors" data-type="tone">Tom / Pronúncia</button>
      <button class="diff-btn text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors" data-type="strokes">Ordem dos traços</button>
      <button class="diff-btn text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors" data-type="meaning">Significado</button>
      <button class="diff-btn text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors" data-type="radical">Memorizar radical</button>
      <button class="diff-btn text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/5 transition-colors" data-type="other">Outro</button>
    </div>
    <p id="popup-difficulty-feedback" class="text-[10px] text-brand-jade hidden mt-1">✓ Registrado!</p>
  </div>
  <span id="popup-difficulty-heat" class="text-[10px] text-gray-500 hidden mt-1 block"></span>
</div>
```

- [ ] **Step 2: Add difficulty + mnemonic logic to inline script**

In the inline script, inside `initGlossaryAndSidebar()`:
- Add handler for difficulty button click (expand options)
- Add handler for difficulty type buttons (save to localStorage)
- Add mnemonic community display logic

```js
// --- Difficulty tracking ---
const difficultyBtn = document.getElementById('popup-difficulty-btn');
const difficultyOptions = document.getElementById('popup-difficulty-options');
const difficultyFeedback = document.getElementById('popup-difficulty-feedback');
const difficultyHeat = document.getElementById('popup-difficulty-heat');
let currentChar = '';

// Reset difficulty UI on each hover
function resetDifficultyUI() {
  if (difficultyOptions) difficultyOptions.classList.add('hidden');
  if (difficultyFeedback) difficultyFeedback.classList.add('hidden');
}

if (difficultyBtn) {
  difficultyBtn.addEventListener('click', () => {
    if (difficultyOptions) difficultyOptions.classList.toggle('hidden');
  });
}

document.querySelectorAll('#popup-difficulty-types .diff-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const type = this.getAttribute('data-type');
    if (!currentChar) return;
    try {
      const { addDifficulty, getDifficulties } = comunidadeStorage;
      addDifficulty(currentChar, type, window.__currentLessonSlug || '');
      if (difficultyOptions) difficultyOptions.classList.add('hidden');
      if (difficultyFeedback) {
        difficultyFeedback.classList.remove('hidden');
        setTimeout(() => difficultyFeedback.classList.add('hidden'), 2000);
      }
      // Update heat indicator
      const all = getDifficulties();
      const count = all.filter(d => d.character === currentChar).length;
      if (difficultyHeat && count > 1) {
        difficultyHeat.textContent = '🔥 ' + count + ' alunos registraram dificuldade';
        difficultyHeat.classList.remove('hidden');
      }
    } catch (e) {
      console.warn('Failed to save difficulty:', e);
    }
  });
});
```

Add to the top of the inline script (before the IIFE):
```js
// Comunidade storage for inline use
var comunidadeStorage = (function() {
  function read(k) { try { return JSON.parse(localStorage.getItem(k) || '[]') } catch(e) { return [] } }
  function write(k, d) { localStorage.setItem(k, JSON.stringify(d)) }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8) }
  return {
    addDifficulty: function(c, t, ls) {
      var list = read('falo-chines-difficulties');
      list.push({ character: c, type: t, lessonSlug: ls, timestamp: Date.now() });
      write('falo-chines-difficulties', list);
    },
    getDifficulties: function() { return read('falo-chines-difficulties') },
    addMnemonic: function(c, text, author) {
      var list = read('falo-chines-mnemonics');
      list.push({ id: uid(), character: c, text: text, author: author, votes: 0, timestamp: Date.now() });
      write('falo-chines-mnemonics', list);
    },
    getMnemonics: function() { return read('falo-chines-mnemonics') },
    getMnemonicsByChar: function(c) {
      return read('falo-chines-mnemonics').filter(function(m) { return m.character === c });
    },
    voteMnemonic: function(id) {
      var list = read('falo-chines-mnemonics');
      var idx = list.findIndex(function(m) { return m.id === id });
      if (idx === -1) return null;
      list[idx].votes++; write('falo-chines-mnemonics', list); return list[idx];
    },
  };
})();
```

Also set `currentChar` in the mouseenter handler and add a `window.__currentLessonSlug`:
```js
// In mouseenter handler, near the top:
currentChar = char;

// At page level, set current lesson slug:
window.__currentLessonSlug = window.__currentLessonSlug || '<?= flatSlug ?>';
```

Wait, in an inline script with `define:vars`, I can just use the variable directly. Let me add it to the `define:vars` list.

Actually, since the script already has `define:vars={{ serializedDictionary, serializedLessonLookup }}`, I can add `flatSlug` to it:

```astro
<script is:inline define:vars={{ serializedDictionary, serializedLessonLookup, flatSlug }}>
```

Then in the script:
```js
window.__currentLessonSlug = flatSlug;
```

- [ ] **Step 3: Build to verify**

Run: `npx astro build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/pages/licoes/\[slug\].astro
git commit -m "feat: add difficulty tracking and mnemonic CTAs to glossary popup"
```

---

## Chunk 6: HanziWheel Difficulty Button

### Task 6.1: Add difficulty button to HanziWheel detail panel

**Files:**
- Modify: `src/components/HanziWheel.astro`

- [ ] **Step 1: Add HTML button in detail panel**

After the mnemonic div and before the lesson link div:
```html
<button class="hw-difficulty-btn" id="hw-difficulty-btn">😓 Tive dificuldade</button>
<div class="hw-difficulty-options" id="hw-difficulty-options" style="display:none;">
  <button class="hw-diff-opt" data-type="tone">Tom</button>
  <button class="hw-diff-opt" data-type="strokes">Traços</button>
  <button class="hw-diff-opt" data-type="meaning">Significado</button>
  <button class="hw-diff-opt" data-type="radical">Radical</button>
</div>
```

- [ ] **Step 2: Add handler in script**

```js
// Difficulty tracking
const hwDifficultyBtn = document.getElementById('hw-difficulty-btn');
const hwDifficultyOptions = document.getElementById('hw-difficulty-options');
let hwCurrentChar = '';

if (hwDifficultyBtn) {
  hwDifficultyBtn.addEventListener('click', () => {
    if (hwDifficultyOptions) hwDifficultyOptions.style.display = hwDifficultyOptions.style.display === 'none' ? 'flex' : 'none';
  });
}

document.querySelectorAll('.hw-diff-opt').forEach(btn => {
  btn.addEventListener('click', function() {
    if (!hwCurrentChar) return;
    try {
      const { addDifficulty } = await import('../lib/comunidade-storage');
      addDifficulty(hwCurrentChar, this.getAttribute('data-type')!, 'hanzi-wheel');
      this.textContent = '✓ ' + this.textContent;
      setTimeout(() => { if (hwDifficultyOptions) hwDifficultyOptions.style.display = 'none'; }, 500);
    } catch(e) { console.warn(e); }
  });
});
```

Set `hwCurrentChar` inside `showDetail()`:
```js
hwCurrentChar = char;
```

- [ ] **Step 3: Add CSS for the buttons**

In `src/styles/hanzi-wheel.css`:
```css
.hw-difficulty-btn {
  /* ... */
}
.hw-difficulty-options {
  /* ... */
}
.hw-diff-opt {
  /* ... */
}
```

- [ ] **Step 4: Build to verify**

Run: `npx astro build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/HanziWheel.astro src/styles/hanzi-wheel.css
git commit -m "feat: add difficulty tracking to HanziWheel detail panel"
```

---

## Chunk 7: Final Verification

### Task 7.1: Run full test suite and build

- [ ] **Step 1: Run all tests**

Run: `npx vitest run`
Expected: All tests pass

- [ ] **Step 2: Full build**

Run: `npx astro build`
Expected: Build succeeds with 14 pages (13 existing + `/comunidade`)

