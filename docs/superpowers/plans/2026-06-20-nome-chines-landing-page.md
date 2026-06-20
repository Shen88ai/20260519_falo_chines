# Nome Chinês Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan.

**Goal:** Build a landing page for "Nome Chinês Exclusivo" service with embedded quiz funnel, 3-style showcase, authority section, social proof, and checkout modal. Add banners on index.astro and manual.astro.

**Architecture:** New Astro page (`/nome-chines`) following same patterns as existing `manual.astro`. Quiz logic in standalone TS module. Banners use same ribbon component pattern as existing manual banner on index.

**Tech Stack:** Astro + TailwindCSS + Vitest (jsdom, file-system based tests like existing pattern)

---

## File Structure

- **Create:** `tests/nome-chines-landing.test.ts` — TDD tests for landing page
- **Create:** `tests/nome-chines-quiz.test.ts` — TDD tests for quiz logic library
- **Create:** `src/lib/nome-chines-quiz.ts` — Quiz state management and types
- **Create:** `src/components/NomeChinesQuiz.astro` — Quiz component
- **Create:** `src/pages/nome-chines.astro` — Landing page
- **Modify:** `src/pages/index.astro` — Add banner for nome-chines
- **Modify:** `src/pages/manual.astro` — Add banner for nome-chines

---

## Chunk 1: Quiz Logic Library + Tests

### Task 1.1: Quiz types and state library

**Files:**
- Create: `tests/nome-chines-quiz.test.ts`
- Create: `src/lib/nome-chines-quiz.ts`

- [ ] **Step 1: Write failing test for QuizState type and answer recording**

```typescript
import { describe, it, expect } from 'vitest';
import { createQuiz, QuizState, QuizAnswer } from '../src/lib/nome-chines-quiz';

describe('NomeChinesQuiz - state management', () => {
  it('deve criar um quiz state inicial com todas as perguntas', () => {
    const quiz = createQuiz();
    expect(quiz.currentStep).toBe(0);
    expect(quiz.answers.name).toBe('');
    expect(quiz.answers.translationType).toBe('');
    expect(quiz.answers.motivation).toBe('');
    expect(quiz.answers.style).toBe('');
    expect(quiz.answers.dedication).toBe(false);
    expect(quiz.totalSteps).toBe(6);
  });

  it('deve registrar resposta e avançar para o próximo passo', () => {
    const quiz = createQuiz();
    const updated = quiz.answer('name', 'Maria');
    expect(updated.answers.name).toBe('Maria');
    expect(updated.currentStep).toBe(1);
  });

  it('deve permitir navegar para o passo anterior', () => {
    const quiz = createQuiz();
    const step1 = quiz.answer('name', 'Maria');
    const step2 = step1.answer('translationType', 'significado');
    expect(step2.currentStep).toBe(2);
    const prev = step2.prev();
    expect(prev.currentStep).toBe(1);
    expect(prev.answers.name).toBe('Maria');
  });

  it('deve indicar quando chegou ao fim do quiz', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'João')
      .answer('translationType', 'som')
      .answer('motivation', 'tattoo')
      .answer('style', 'ink')
      .answer('dedication', true);
    expect(finalQuiz.isComplete()).toBe(true);
    expect(finalQuiz.currentStep).toBe(6);
  });

  it('deve gerar mensagem para WhatsApp com todas as respostas', () => {
    const quiz = createQuiz();
    const finalQuiz = quiz
      .answer('name', 'Ana Clara')
      .answer('translationType', 'significado')
      .answer('motivation', 'presente')
      .answer('style', 'futuristic')
      .answer('dedication', true);
    const msg = finalQuiz.toWhatsAppText();
    expect(msg).toContain('Ana Clara');
    expect(msg).toContain('significado');
    expect(msg).toContain('presente');
    expect(msg).toContain('futuristic');
    expect(msg).toContain('Sim');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/nome-chines-quiz.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write minimal implementation**

```typescript
export type Answers = {
  name: string;
  translationType: string;
  motivation: string;
  style: string;
  dedication: boolean;
};

export interface QuizState {
  currentStep: number;
  answers: Answers;
  totalSteps: number;
  answer(field: keyof Answers, value: string | boolean): QuizState;
  prev(): QuizState;
  isComplete(): boolean;
  toWhatsAppText(): string;
}

export function createQuiz(): QuizState {
  const state: Answers = {
    name: '',
    translationType: '',
    motivation: '',
    style: '',
    dedication: false,
  };

  function build(newAnswers: Answers, step?: number): QuizState {
    const s = step ?? Object.entries(newAnswers).findIndex(
      ([k, v]) => v === '' || v === false
    );
    return {
      currentStep: s === -1 ? 7 : s,
      answers: { ...newAnswers },
      totalSteps: 6,
      answer(field, value) {
        return build({ ...newAnswers, [field]: value });
      },
      prev() {
        const idx = Object.entries(newAnswers).findIndex(
          ([k, v]) => v === '' || v === false
        );
        const prevIdx = Math.max(0, (idx === -1 ? 6 : idx) - 1);
        const prevKey = ['name','translationType','motivation','style','dedication'][prevIdx];
        return build({ ...newAnswers, [prevKey]: prevIdx < 6 ? (prevKey === 'dedication' ? false : '') : '' }, prevIdx);
      },
      isComplete() {
        return newAnswers.name !== '' && newAnswers.translationType !== '' &&
          newAnswers.motivation !== '' && newAnswers.style !== '' &&
          newAnswers.dedication !== false;
      },
      toWhatsAppText() {
        const dedicationText = newAnswers.dedication ? 'Sim 💖' : 'Não 🙅‍♀️';
        return (
          '🀄 *Pedido de Nome Chinês*\n\n' +
          `👤 *Nome:* ${newAnswers.name}\n` +
          `🎯 *Tradução:* ${newAnswers.translationType}\n` +
          `💖 *Motivação:* ${newAnswers.motivation}\n` +
          `🎨 *Estilo:* ${newAnswers.style}\n` +
          `📝 *Dedicatória:* ${dedicationText}`
        );
      },
    };
  }

  return build(state, 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run tests/nome-chines-quiz.test.ts`
Expected: PASS

---

## Chunk 2: Landing Page Tests + Page

### Task 2.1: Write landing page tests

**Files:**
- Create: `tests/nome-chines-landing.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Landing Page Nome Chinês - TDD', () => {
  const filePath = path.join(process.cwd(), 'src', 'pages', 'nome-chines.astro');

  it('deve existir o arquivo da landing page', () => {
    const exists = fs.existsSync(filePath);
    expect(exists).toBe(true);
  });

  it('deve conter SEO title e description', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Nome Chinês Exclusivo');
    expect(content.toLowerCase()).toContain('nome em chinês');
  });

  it('deve conter headline principal', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Descubra como seu nome vira arte');
  });

  it('deve conter a seção dos 3 estilos de caligrafia', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Ink_caligarafia.png');
    expect(content).toContain('futuristic interface.png');
    expect(content).toContain('translucente.png');
  });

  it('deve conter o componente NomeChinesQuiz', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('NomeChinesQuiz');
  });

  it('deve conter botões de CTA com texto correto', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('ENCOMENDAR MEU NOME CHINÊS');
  });

  it('deve conter a jornada intercultural da autora', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('Taiwan');
    expect(content).toContain('Paraguai');
    expect(content).toContain('Chile');
    expect(content).toContain('Brasil');
  });

  it('deve conter o modal de checkout com pergunta', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('checkout-modal');
    expect(content).toContain('Para quem será esse nome chinês');
  });

  it('deve conter o número do WhatsApp 5511996990939', () => {
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('5511996990939');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/nome-chines-landing.test.ts`
Expected: FAIL — file not found

### Task 2.2: Create quiz component

**Files:**
- Create: `src/components/NomeChinesQuiz.astro`

- [ ] **Step 1: Write failing test for component file existence**

Add to `tests/nome-chines-landing.test.ts`:
```typescript
it('deve existir o componente NomeChinesQuiz', () => {
  const compPath = path.join(process.cwd(), 'src', 'components', 'NomeChinesQuiz.astro');
  expect(fs.existsSync(compPath)).toBe(true);
});
```

- [ ] **Step 2: Verify it fails**

- [ ] **Step 3: Create NomeChinesQuiz.astro**

Quiz component with inline JavaScript. Structure:
- Step display (which question we're on)
- Input/button sets for each of the 6 questions
- Progress bar
- Navigation: "Anterior" / "Próximo" buttons
- Final step shows CTA to open checkout modal

The component registers a `window.startNomeChinesQuiz` function that the landing page HTML calls.

- [ ] **Step 4: Verify tests pass**

### Task 2.3: Create landing page

**Files:**
- Create: `src/pages/nome-chines.astro`

- [ ] **Step 1: Verify previous test still fails (file doesn't exist)**

- [ ] **Step 2: Create nome-chines.astro**

Full landing page with sections:
1. Hero (ink calligraphy bg)
2. Quiz section (NomeChinesQuiz component)
3. 3 styles showcase (images from Resource/image_name_example/)
4. Authority (Stefany's journey)
5. Social proof (testimonials)
6. Final CTA
7. Checkout modal (same pattern as manual.astro: WhatsApp + Hotmart)

- [ ] **Step 3: Run all tests — verify all pass**

---

## Chunk 3: Banners

### Task 3.1: Banner test for nome-chines on homepage

**Files:**
- Modify: `tests/homepage-banner.test.ts`

- [ ] **Step 1: Add test for nome-chines banner on index.astro**

```typescript
it('deve conter link para a página /nome-chines no banner', () => {
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toContain('/nome-chines');
});

it('deve conter texto do novo serviço de nome chinês no banner', () => {
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toContain('Nome Chinês');
});
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Add banner to index.astro above the existing ribbon or in hero section**

```astro
<!-- Floating Ribbon Banner for Nome Chinês -->
<div class="relative z-30 bg-gradient-to-r from-[#8B0000] via-brand-gold to-brand-red text-dark-bg font-sans overflow-hidden border-b border-white/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
    <span class="px-2 py-0.5 rounded bg-black text-brand-gold text-[9px] font-black uppercase tracking-widest">
      NOVO
    </span>
    <p class="text-xs sm:text-sm font-extrabold text-black tracking-wide">
      Seu nome em chinês em <strong>3 estilos exclusivos</strong> — tinta, digital e translúcido!
    </p>
    <a 
      href="/nome-chines" 
      class="inline-flex items-center gap-1 px-3 py-1.5 text-[10px] font-black bg-black/80 text-white hover:bg-black rounded-full transition-all uppercase tracking-wider"
    >
      <span>🀄</span>
      <span>Encomendar</span>
    </a>
  </div>
</div>
```

- [ ] **Step 4: Run tests to verify pass**

### Task 3.2: Banner test for nome-chines on manual.astro

**Files:**
- Add test to `tests/landing-page-manual.test.ts`

- [ ] **Step 1: Add test for nome-chines banner on manual.astro**

```typescript
it('deve conter link para /nome-chines', () => {
  const content = fs.readFileSync(filePath, 'utf-8');
  expect(content).toContain('/nome-chines');
});
```

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Add banner to manual.astro after the benefits section**

Same ribbon style, linking to `/nome-chines`

- [ ] **Step 4: Run tests to verify pass**

---

## Chunk 4: Final Verification

- [ ] **Run all tests**

Run: `npx vitest run`
Expected: All tests pass (previously passing ones + new ones)

- [ ] **Build check**

Run: `npm run build`
Expected: Build succeeds with no errors
