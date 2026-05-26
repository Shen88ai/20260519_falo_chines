# UX Psychology Enhancements Implementation Plan

> **For agentic workers:** Use TDD throughout. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 3 marketing-psychology UX features: Streak & Milestones, Social Proof, Curiosity Gaps.

**Architecture:** All client-side, localStorage-based. No backend changes. Pure TypeScript libs tested with Vitest. Astro components render on server, hydrate client scripts for interactivity.

**Tech Stack:** TypeScript, Vitest, Astro, Tailwind CSS 4, localStorage

---

### Chunk 1: StreakManager Library + StreakDisplay + MilestoneCelebration

### Task 1: StreakManager

**Files:**
- Create: `src/lib/streak-manager.ts`
- Create: `tests/streak-manager.test.ts`

**Constraints:**
- `lastVisit` stored as ISO date string (YYYY-MM-DD).
- `currentStreak`: count of consecutive calendar days.
- `longestStreak`: max ever.
- `totalDays`: total unique visit days ever.
- `milestonesReached`: number[] of milestone days already celebrated.
- `recordVisit()`: idempotent per day. If today already visited, no change. If yesterday was last visit, increment streak. If gap, reset to 1.
- Milestones: 3, 7, 14, 21, 30, 60, 90.
- `getNextMilestone()`: returns next milestone not yet reached, or null.
- `hasReachedMilestone(day)`: returns boolean.

- [ ] **Step 1: Write the failing test for `recordVisit` — first visit ever (no prior data)**

```typescript
// tests/streak-manager.test.ts
import { describe, it, expect, beforeEach } from 'vitest';

// We'll use a helper to mock localStorage
function mockLocalStorage(data: Record<string, string> = {}) {
  const store = { ...data };
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
  });
}

describe('StreakManager', () => {
  describe('recordVisit', () => {
    it('should return currentStreak 1 on first visit ever', () => {
      mockLocalStorage({});
      // We need to import after stubbing globals
      const { recordVisit } = await import('../src/lib/streak-manager');
      const result = recordVisit();
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
      expect(result.totalDays).toBe(1);
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest tests/streak-manager.test.ts --reporter=verbose`
Expected: FAIL — module not found or function not exported

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/lib/streak-manager.ts
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastVisit: string | null;
  milestonesReached: number[];
}

const STORAGE_KEY = 'falo-chines-streak';
const MILESTONES = [3, 7, 14, 21, 30, 60, 90];

function load(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisit: null, milestonesReached: [] };
    }
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisit: null, milestonesReached: [] };
  }
}

function save(data: StreakData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStreak(): StreakData {
  return load();
}

export function recordVisit(): StreakData {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);

  if (data.lastVisit === today) {
    return data; // déjà visité aujourd'hui
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let newStreak: number;
  if (data.lastVisit === yesterday) {
    newStreak = data.currentStreak + 1;
  } else if (data.lastVisit === null) {
    newStreak = 1;
  } else {
    newStreak = 1; // gap >1 day, reset
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, data.longestStreak),
    totalDays: data.totalDays + 1,
    lastVisit: today,
    milestonesReached: data.milestonesReached,
  };

  // Check milestones
  if (MILESTONES.includes(newStreak) && !updated.milestonesReached.includes(newStreak)) {
    updated.milestonesReached = [...updated.milestonesReached, newStreak];
  }

  save(updated);
  return updated;
}

export function hasReachedMilestone(day: number): boolean {
  return load().milestonesReached.includes(day);
}

export function getNextMilestone(): number | null {
  const data = load();
  return MILESTONES.find(m => !data.milestonesReached.includes(m)) ?? null;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest tests/streak-manager.test.ts --reporter=verbose`
Expected: PASS

- [ ] **Step 5: Add more tests for streak-manager**

```typescript
it('should increment streak when visiting consecutive days', () => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  mockLocalStorage({
    [STORAGE_KEY]: JSON.stringify({
      currentStreak: 1,
      longestStreak: 1,
      totalDays: 1,
      lastVisit: yesterday,
      milestonesReached: [],
    }),
  });
  const { recordVisit } = await import('../src/lib/streak-manager');
  const result = recordVisit();
  expect(result.currentStreak).toBe(2);
});

it('should reset streak when gap >1 day', () => {
  const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);
  mockLocalStorage({
    [STORAGE_KEY]: JSON.stringify({
      currentStreak: 5,
      longestStreak: 5,
      totalDays: 5,
      lastVisit: twoDaysAgo,
      milestonesReached: [3],
    }),
  });
  const { recordVisit } = await import('../src/lib/streak-manager');
  const result = recordVisit();
  expect(result.currentStreak).toBe(1);
  expect(result.longestStreak).toBe(5);
});

it('should not double-count same day', () => {
  const today = new Date().toISOString().slice(0, 10);
  mockLocalStorage({
    [STORAGE_KEY]: JSON.stringify({
      currentStreak: 3,
      longestStreak: 3,
      totalDays: 3,
      lastVisit: today,
      milestonesReached: [3],
    }),
  });
  const { recordVisit } = await import('../src/lib/streak-manager');
  const result = recordVisit();
  expect(result.currentStreak).toBe(3);
  expect(result.totalDays).toBe(3);
});

it('should detect milestone on exact day', () => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  mockLocalStorage({
    [STORAGE_KEY]: JSON.stringify({
      currentStreak: 2,
      longestStreak: 2,
      totalDays: 2,
      lastVisit: yesterday,
      milestonesReached: [],
    }),
  });
  const { recordVisit } = await import('../src/lib/streak-manager');
  const result = recordVisit();
  expect(result.currentStreak).toBe(3);
  expect(result.milestonesReached).toContain(3);
});

it('getNextMilestone should return first un-reached milestone', () => {
  mockLocalStorage({
    [STORAGE_KEY]: JSON.stringify({
      currentStreak: 7,
      longestStreak: 7,
      totalDays: 7,
      lastVisit: new Date().toISOString().slice(0, 10),
      milestonesReached: [3, 7],
    }),
  });
  const { getNextMilestone } = await import('../src/lib/streak-manager');
  expect(getNextMilestone()).toBe(14);
});
```

- [ ] **Step 6: Run all tests to verify they pass**

Run: `npx vitest tests/streak-manager.test.ts --reporter=verbose`
Expected: All PASS

- [ ] **Step 7: Create StreakDisplay component**

**File:** `src/components/StreakDisplay.astro`

```astro
---
// src/components/StreakDisplay.astro
---

<div id="streak-display" class="relative">
  <a href="/" class="flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
    <span class="text-lg">🔥</span>
    <span id="streak-count" class="tabular-nums">...</span>
  </a>
  <div id="milestone-tooltip" class="absolute top-full right-0 mt-2 bg-white border border-amber-200 rounded-xl shadow-lg p-3 text-xs min-w-48 hidden z-50">
    <p class="font-semibold text-amber-800 mb-1">🔥 Streak de dias</p>
    <p id="streak-days-text" class="text-gray-600 mb-1"></p>
    <p id="next-milestone-text" class="text-amber-600"></p>
  </div>
</div>

<script>
  import { getStreak, recordVisit, getNextMilestone } from '../lib/streak-manager';

  document.addEventListener('DOMContentLoaded', () => {
    const data = recordVisit();
    const countEl = document.getElementById('streak-count');
    const tooltip = document.getElementById('milestone-tooltip');
    const daysText = document.getElementById('streak-days-text');
    const nextMilestone = document.getElementById('next-milestone-text');

    if (countEl) {
      countEl.textContent = data.currentStreak > 0 ? `${data.currentStreak} dias` : 'Comece hoje!';
    }

    const display = document.getElementById('streak-display');
    if (display) {
      display.addEventListener('mouseenter', () => {
        if (tooltip) tooltip.classList.remove('hidden');
        const current = getStreak();
        if (daysText) daysText.textContent = `📅 Total: ${current.totalDays} dias · Melhor: ${current.longestStreak} dias`;
        const next = getNextMilestone();
        if (nextMilestone) {
          nextMilestone.textContent = next ? `🎯 Próximo marco: ${next} dias` : '🏆 Todos os marcos alcançados!';
        }
      });
      display.addEventListener('mouseleave', () => {
        if (tooltip) tooltip.classList.add('hidden');
      });
    }
  });
</script>
```

- [ ] **Step 8: Create MilestoneCelebration component**

**File:** `src/components/MilestoneCelebration.astro`

```astro
---
// src/components/MilestoneCelebration.astro
interface Props {
  milestone: number;
}
const { milestone } = Astro.props;
---

<div id="milestone-celebration" class="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
  <div class="text-center animate-bounce-in">
    <div class="text-6xl mb-3">🎉</div>
    <p class="text-2xl font-bold text-amber-600 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl">
      {milestone} dias seguidos!
    </p>
    <p class="text-sm text-amber-500 mt-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
      {milestone === 3 ? 'Já é um hábito!' :
        milestone === 7 ? 'Uma semana inteira!' :
        milestone === 14 ? 'Duas semanas de dedicação!' :
        milestone === 21 ? '21 dias — o hábito está formado!' :
        milestone === 30 ? 'Um mês de chinês!' :
        milestone === 60 ? 'Dois meses impressionantes!' :
        milestone === 90 ? 'Tres meses — você é um guerreiros!' :
        'Incrível!'}
    </p>
  </div>
</div>

<style>
  .animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  @keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    60% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const el = document.getElementById('milestone-celebration');
      if (el) {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
      }
    }, 2500);
  });
</script>
```

- [ ] **Step 9: Integrate into Layout.astro**

Modify `src/layouts/Layout.astro`:
- Import StreakDisplay and add it in the header next to the nav
- Add milestone celebration logic

Edit the header section — find the `<header>` tag and add StreakDisplay inside the nav area, then add a script for milestone detection.

- [ ] **Step 10: Run existing tests to make sure nothing broke**

Run: `npx vitest run --reporter=verbose`
Expected: All PASS

---

### Chunk 2: Social Proof Layer

### Task 2: SocialProof data + components

**Files:**
- Create: `src/data/social-proof-data.ts`
- Create: `tests/social-proof-data.test.ts`
- Create: `src/components/SocialProofBadge.astro`
- Create: `src/components/PhaseSocialProof.astro`

- [ ] **Step 1: Write failing test for social-proof-data**

```typescript
// tests/social-proof-data.test.ts
import { describe, it, expect } from 'vitest';
import { socialProof } from '../src/data/social-proof-data';

describe('socialProof', () => {
  it('should have entries for every lesson slug', () => {
    const slugs = Object.keys(socialProof.lessons);
    expect(slugs.length).toBeGreaterThan(0);
    slugs.forEach(slug => {
      expect(socialProof.lessons[slug].students).toBeGreaterThan(0);
    });
  });

  it('should have phase data for all 4 phases', () => {
    expect(Object.keys(socialProof.phases)).toEqual(['A', 'B', 'C', 'D']);
    Object.values(socialProof.phases).forEach(phase => {
      expect(phase.students).toBeGreaterThan(0);
    });
  });

  it('should have weeklyStats', () => {
    expect(socialProof.weeklyStats.studentsActive).toBeGreaterThan(0);
    expect(socialProof.weeklyStats.newCharacters).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest tests/social-proof-data.test.ts --reporter=verbose`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/data/social-proof-data.ts
export interface LessonProof {
  students: number;
}

export interface PhaseProof {
  students: number;
  charactersLearned: number;
}

export interface SocialProofData {
  lessons: Record<string, LessonProof>;
  phases: Record<string, PhaseProof>;
  weeklyStats: {
    studentsActive: number;
    newCharacters: number;
  };
}

export const socialProof: SocialProofData = {
  lessons: {
    'tons-primordiais': { students: 186 },
    'pinyin-iniciais': { students: 152 },
    'radicais-fundamentais': { students: 98 },
    'sintaxe-basica': { students: 74 },
    'hsk-negocios': { students: 56 },
    'mae-chinesa-fluencia': { students: 63 },
    'crianca-interior-fluencia': { students: 48 },
  },
  phases: {
    A: { students: 186, charactersLearned: 12 },
    B: { students: 98, charactersLearned: 8 },
    C: { students: 74, charactersLearned: 10 },
    D: { students: 63, charactersLearned: 15 },
  },
  weeklyStats: {
    studentsActive: 142,
    newCharacters: 23,
  },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest tests/social-proof-data.test.ts --reporter=verbose`
Expected: PASS

- [ ] **Step 5: Create SocialProofBadge component**

```astro
---
// src/components/SocialProofBadge.astro
interface Props {
  students: number;
  phase?: string;
}
const { students, phase } = Astro.props;
---

<div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs text-amber-700 font-medium">
  <span>👥</span>
  <span>{students} alunos estudaram esta lição</span>
  {phase && <span class="text-amber-400">·</span>}
  {phase && <span class="text-amber-500">Fase {phase}</span>}
</div>
```

- [ ] **Step 6: Create PhaseSocialProof component**

```astro
---
// src/components/PhaseSocialProof.astro
import { socialProof } from '../data/social-proof-data';
const { weeklyStats } = socialProof;
---

<div class="bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-2xl p-4 mb-8">
  <div class="flex items-center gap-3 text-sm">
    <span class="text-2xl">📊</span>
    <div>
      <p class="font-semibold text-amber-800">Comunidade ativa esta semana</p>
      <p class="text-amber-600">
        {weeklyStats.studentsActive} alunos praticando · 
        {weeklyStats.newCharacters} novos caracteres aprendidos
      </p>
    </div>
  </div>
</div>
```

- [ ] **Step 7: Integrate into lesson page and licoes index**

Modify `src/pages/licoes/[slug].astro`:
- Import SocialProofBadge, get `socialProof.lessons[slug]`, render below breadcrumb.

Modify `src/pages/licoes/index.astro`:
- Import PhaseSocialProof, render between carousel and phase sections.

- [ ] **Step 8: Run existing tests to make sure nothing broke**

Run: `npx vitest run --reporter=verbose`
Expected: All PASS

---

### Chunk 3: Curiosity Gaps & TeaserGenerator + Minimap

### Task 3: TeaserGenerator

**Files:**
- Create: `src/lib/teaser-generator.ts`
- Create: `tests/teaser-generator.test.ts`

- [ ] **Step 1: Write failing test for teaser-generator**

```typescript
// tests/teaser-generator.test.ts
import { describe, it, expect } from 'vitest';
import { generateTeaser } from '../src/lib/teaser-generator';

describe('generateTeaser', () => {
  it('should generate a teaser for a lesson with characters', () => {
    const lesson = {
      title: 'Os Quatro Tons Primordiais',
      characters: ['妈', '麻', '马', '骂'],
      phaseLabel: 'Fonética & Tons',
      tags: ['tons', 'pinyin'],
      description: 'Aprenda os 4 tons do mandarim',
    };
    const teaser = generateTeaser(lesson);
    expect(teaser).toBeTruthy();
    expect(teaser.length).toBeGreaterThan(5);
    expect(teaser).toContain('妈');
  });

  it('should generate a teaser for a lesson without characters', () => {
    const lesson = {
      title: 'Sintaxe Básica',
      characters: [],
      phaseLabel: 'Sintaxe & Diálogo',
      tags: ['gramática', 'estrutura'],
      description: 'Entenda a estrutura das frases',
    };
    const teaser = generateTeaser(lesson);
    expect(teaser).toBeTruthy();
    expect(teaser.length).toBeGreaterThan(5);
  });

  it('should generate different teasers for different lessons', () => {
    const lesson1 = { title: 'A', characters: ['妈'], phaseLabel: 'F', tags: ['t'], description: 'd' };
    const lesson2 = { title: 'B', characters: ['文'], phaseLabel: 'G', tags: ['g'], description: 'e' };
    const t1 = generateTeaser(lesson1);
    const t2 = generateTeaser(lesson2);
    expect(t1).not.toBe(t2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest tests/teaser-generator.test.ts --reporter=verbose`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/lib/teaser-generator.ts
interface LessonMeta {
  title: string;
  characters: string[];
  phaseLabel: string;
  tags: string[];
  description: string;
}

const TEASER_TEMPLATES = [
  (l: LessonMeta) => {
    const c = l.characters;
    if (c.length > 0) {
      const randomChar = c[Math.floor(Math.random() * c.length)];
      return `🔒 O segredo do caractere ${randomChar}`;
    }
    return null;
  },
  (l: LessonMeta) => {
    if (l.tags.length > 0) {
      const tag = l.tags[Math.floor(Math.random() * l.tags.length)];
      return `🔒 Domine os ${tag} como um nativo`;
    }
    return null;
  },
  (l: LessonMeta) => {
    const topic = l.phaseLabel.split(' & ')[0];
    return `🔒 O erro que todo brasileiro comete em ${topic.toLowerCase()}`;
  },
  (l: LessonMeta) => {
    return `🔒 Próxima parada: ${l.title.split(':')[0]}`;
  },
];

export function generateTeaser(lesson: LessonMeta): string {
  // Pick a random template that returns non-null
  const shuffled = [...TEASER_TEMPLATES].sort(() => Math.random() - 0.5);
  for (const tmpl of shuffled) {
    const result = tmpl(lesson);
    if (result) return result;
  }
  return `🔒 Próxima lição: ${lesson.title}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest tests/teaser-generator.test.ts --reporter=verbose`
Expected: PASS

- [ ] **Step 5: Modify the lesson page sidebar minimap**

Read `src/pages/licoes/[slug].astro` to find the minimap code.

Modify it so that:
- Only the current checkpoint is shown as "complete" (green dot)
- The next checkpoint is shown as "locked" (gray dot) with the teaser text
- Previous checkpoints are collapsed into numbered dots
- Uses `generateTeaser` with the next lesson's data

- [ ] **Step 6: Modify FormNivelamento result view**

Read `src/components/FormNivelamento.astro` to find the result reveal section.

Modify so that:
- "Iniciar Minha Jornada" only links to the first checkpoint
- Other checkpoints are hidden behind a "🔒 Próximos passos" block
- On completion of a lesson (page load), mark that checkpoint as done in localStorage
- The journey progress (`falo-chines-journey`) is updated

- [ ] **Step 7: Run all tests to verify nothing broke**

Run: `npx vitest run --reporter=verbose`
Expected: All PASS

---

### Chunk 4: Integration & Polish

- [ ] **Final check: Run all tests**

Run: `npx vitest run --reporter=verbose`
Expected: All PASS

- [ ] **Final check: Run astro build to verify no compilation errors**

Run: `npx astro build`
Expected: Build succeeds, no errors.
