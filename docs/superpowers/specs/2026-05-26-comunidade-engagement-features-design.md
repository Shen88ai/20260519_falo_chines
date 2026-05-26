# Design: Comunidade Engagement Features

## Overview

Three user-generated content features that encourage learners to participate in content creation: situational phrase requests, per-character difficulty tracking, and collaborative mnemonics. Hybrid placement — CTAs at end of each lesson link to a central hub page at `/comunidade`.

---

## Feature 1: "Como se diz?" — Situational Request Board

**Purpose:** Let users request real-life situations they want to express in Chinese. The most-upvoted requests signal what content to create next.

### Inline CTA (end of lesson)
- Card with title "🗣️ Tem uma situação do dia a dia que você não sabe como expressar?"
- Button: "Peça uma frase →" → links to `/comunidade#situacoes`

### Hub section (`/comunidade#situacoes`)
- Feed of requests sorted by votes (descending)
- Each request: title (e.g. "Como peço comida vegetariana?"), vote count, status badge (`pendente` / `em andamento` / `publicado`), author name
- "Nova situação" button → inline form: textarea for situation description, optional tags (restaurante, viagem, negócios, etc.)
- Voting: simple thumbs-up button per request

### Feedback loop
- When a request is fulfilled (status → `publicado`), the author receives a notification banner on next visit
- A "realizado" tag links to the resulting lesson/content

---

## Feature 2: "O Que Te Travou?" — Per-Character Difficulty Tracker

**Purpose:** Let users flag characters they struggle with, aggregated into a difficulty heatmap that guides review and teaching priorities.

### Inline CTA (end of lesson)
- Card with title "🔍 Algum caractere desta lição te travou?"
- Shows the lesson's character list with small "Tive dificuldade" buttons per character
- Button: "Ver ranking completo →" → links to `/comunidade#dificuldades`

### Inline CTA (glossary popup)
- Small button inside the glossary popup: "😓 Tive dificuldade"
- On click: expands into radio options ("Qual tipo?")
  - Tom / Pronúncia
  - Ordem dos traços
  - Significado
  - Memorizar o radical
  - Outro
- On submit: records `{ character, difficultyType, lessonSlug, timestamp }` to localStorage
- A small indicator on the popup shows: "🔥 N alunos também tiveram dificuldade"

### Hub section (`/comunidade#dificuldades`)
- Heatmap ranking: characters ordered by total difficulty reports (🔥 emoji + count)
- Filter by phase/lesson
- Each entry shows: character, percentage breakdown of difficulty types, related lesson link
- Current user's own flagged characters are highlighted

### Data model (localStorage + optional sync)
```ts
interface DifficultyReport {
  character: string;
  type: 'tone' | 'strokes' | 'meaning' | 'radical' | 'other';
  lessonSlug: string;
  timestamp: number;
}
```

---

## Feature 3: "Dê Seu Macete" — Collaborative Mnemonics

**Purpose:** Let users submit their own Portuguese-language mnemonic devices for characters. Best-voted ones get featured in the glossary popup.

### Inline CTA (end of lesson)
- Card with title "🧠 Tem um macete melhor para lembrar algum caractere?"
- Shows the lesson's character list with "Enviar macete" button per character
- Button: "Ver todos os macetes →" → links to `/comunidade#macetes`

### Inline CTA (glossary popup)
- In the "Dica Mnemônica" section, if community mnemonics exist for this character:
  - Show a small tab: "Oficial" / "Comunidade (3)"
  - If user's own mnemonic is the top-voted, show a "🏆 Seu macete!" badge
- Button: "Enviar meu macete" → opens small form inline in popup

### Hub section (`/comunidade#macetes`)
- Feed of submitted mnemonics, sorted by votes
- Each entry: character (large), mnemonic text, author, vote count, timestamp
- Filter by character search
- "Enviar macete" button → form: character input + mnemonic textarea

### Promotion logic
- When a mnemonic reaches ≥5 votes, it appears as "Comunidade" option in the glossary popup
- If it reaches ≥20 votes, it gets a featured badge

---

## Placement: End-of-Lesson "Sua Vez" Section

Inserted after the prev/next navigation, before `</article>`, on every `/licoes/[slug]` page:

```
┌─────────────────────────────────────────────┐
│              🤝 Sua Vez!                     │
│                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌────────┐ │
│ │ 🗣️ Situação   │ │ 🔍 Dificuldade│ │ 🧠     │ │
│ │ Peça uma frase│ │ Registre aqui│ │ Macete │ │
│ │ →             │ │ →            │ │ Envie →│ │
│ └──────────────┘ └──────────────┘ └────────┘ │
│                                              │
│  📊 Ver comunidade completa →                │
└─────────────────────────────────────────────┘
```

Three cards in a responsive row (stack on mobile). Each card: icon, short headline, brief description, CTA button linking to relevant hub section. A footer link "Ver comunidade completa →" goes to `/comunidade`.

---

## New Route: `/comunidade`

### URL structure
- `/comunidade` — redirects to `/comunidade#situacoes`
- `/comunidade#situacoes` — Situational request board
- `/comunidade#dificuldades` — Difficulty heatmap
- `/comunidade#macetes` — Collaborative mnemonics

### Page layout
- Same global layout (`Layout.astro`) as rest of the site
- Title: "Comunidade Falo Chinês" with subtitle
- Tab navigation (3 tabs) matching the three features
- Content area swaps based on active tab (client-side tab switching via hash)

---

## Data Storage Strategy

### Phase 1 (client-side only, no backend)
- **Difficulty reports:** `localStorage['falo-chines-difficulties']` — array of `DifficultyReport`
- **Mnemonics:** `localStorage['falo-chines-mnemonics']` — array of `{ character, text, author, votes, timestamp, id }`
- **Situations:** `localStorage['falo-chines-situations']` — array of `{ title, description, tags, votes, status, author, timestamp, id }`
- All data is local to the user's browser. The hub shows only the user's own submissions.

### Phase 2 (optional future sync)
- Add a lightweight API layer or integrate with a backend to share data across users
- Could use a simple JSON store or the existing lark-base if applicable

---

## Files to Create

| File | Purpose |
|---|---|
| `src/pages/comunidade.astro` | New hub page with 3 tabs |
| `src/components/ComunidadeCard.astro` | Reusable card component for end-of-lesson CTA |
| `src/components/SituacaoBoard.astro` | Situational request board (client-side) |
| `src/components/DificuldadeBoard.astro` | Difficulty heatmap (client-side) |
| `src/components/MaceteBoard.astro` | Mnemonic feed (client-side) |
| `src/lib/comunidade-storage.ts` | localStorage helpers for all 3 features |
| `tests/comunidade-storage.test.ts` | Tests for storage layer |

## Files to Modify

| File | Change |
|---|---|
| `src/pages/licoes/[slug].astro` | Add "Sua Vez" section after prev/next nav |
| `src/components/HanziWheel.astro` | Add difficulty button in detail panel |
| `[slug].astro inline script]` | Add difficulty recording handler in glossary popup |

---

## Acceptance Criteria

1. End of each lesson shows the "Sua Vez" section with 3 CTA cards
2. Glossary popup has "Tive dificuldade" button that saves to localStorage
3. Glossary popup shows community-voted mnemonics when available
4. `/comunidade` page renders with 3 functional tabs
5. All data persists in localStorage across sessions
6. All tests pass, build succeeds
