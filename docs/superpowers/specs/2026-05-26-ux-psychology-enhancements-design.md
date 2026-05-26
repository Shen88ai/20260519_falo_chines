# UX Psychology Enhancements for Falo Chinês

## Overview

Three marketing-psychology-driven UX enhancements for the Falo Chinês Mandarin learning platform:
1. Streak & Micro-Milestones (Goal Gradient Effect + Loss Aversion)
2. Social Proof Layer (Social Proof + FOMO)
3. Curiosity Gaps & Micro-Compromissos (Zeigarnik Effect + Hick's Law)

---

## 1. Streak & Micro-Milestones

### Files
- `src/lib/streak-manager.ts` — Pure logic, no DOM. Manages streak state in localStorage.
- `src/components/StreakDisplay.astro` — Shows streak counter in the header.
- `src/components/MilestoneCelebration.astro` — Confetti/celebration overlay on milestones.

### StreakManager API
```
- getStreak(): { currentStreak, longestStreak, lastVisit, totalDays }
- recordVisit(): StreakData  // called on every page load
- hasReachedMilestone(day: number): boolean
- getNextMilestone(): number | null
```

### Streak Rules (answered by user)
- Any page visit counts.
- Visit today → do nothing (don't double-count).
- Visit yesterday → increment streak.
- Gap >1 day → reset streak to 1, keep longestStreak.
- Milestones: 3, 7, 14, 21, 30, 60, 90 days.

### Integration
- `Layout.astro`: instantiate StreakDisplay next to the logo/header.
- On mount, call `recordVisit()` and re-render streak display.
- MilestoneCelebration triggered if `hasReachedMilestone(day)` is true on page load.

### Tests
- StreakManager: first visit ever, consecutive days, gap reset, milestone detection, localStorage persistence.
- No tests needed for pure Astro components (layout only).

---

## 2. Social Proof Layer

### Files
- `src/data/social-proof-data.ts` — Static seed data.
- `src/components/SocialProofBadge.astro` — Per-lesson badge.
- `src/components/PhaseSocialProof.astro` — Phase-level aggregate on /licoes.

### Data Structure
```ts
interface SocialProofData {
  lessons: Record<string, { students: number }>
  phases: Record<string, { students: number; charactersLearned: number }>
  weeklyStats: { studentsActive: number; newCharacters: number }
}
```

### Seed Data Values
- Per lesson: 50–200 students (spread across phases, phase A higher)
- Phase totals: sum of lessons
- Weekly: ~85% of total students active, ~20 new characters

### Integration
- `[slug].astro`: add `SocialProofBadge` below breadcrumb or in the sidebar.
- `/licoes/index.astro`: add `PhaseSocialProof` banner between carousel and phase sections.

### Tests
- social-proof-data: validate structure, all slugs present, all phases present.

---

## 3. Curiosity Gaps & Micro-Compromissos

### Files
- `src/lib/teaser-generator.ts` — Dynamic teaser generation from lesson metadata.
- Modify `src/components/**` sidebar minimap in `[slug].astro`.
- Modify `FormNivelamento.astro` result view.

### TeaserGenerator API
```
- generateTeaser(lesson): string
  Uses lesson's characters, phaseLabel, title, tags, description
  Templates:
    - If characters.length > 0: "🔒 O segredo do caractere [randomChar]"
    - If phaseLabel: "🔒 [phaseLabel]: [template based on tags]"
    - Fallback: "🔒 Próxima lição: [title hint]"
```

### Minimap Changes
- Only show current checkpoint (completed status) + next checkpoint (locked with teaser).
- Earlier checkpoints: collapsed, shown as numbered dots.
- "Ajustar Opcoes" kept visible.

### Diagnostic Result Changes
- "Iniciar Minha Jornada" → first checkpoint.
- Other checkpoints hidden until previous is completed.
- Progress stored in localStorage (`falo-chines-journey.checkpoints`).

### Integration
- `[slug].astro` sidebar: replace full minimap with compact version.
- `FormNivelamento.astro`: modify "Iniciar" link behavior.

### Tests
- teaser-generator: generates non-empty teaser for each lesson, handles edge cases (no characters, no tags).
- path-mapping: validate checkpoint progression logic.

---

## Implementation Order

1. StreakManager + StreakDisplay + MilestoneCelebration (independent)
2. SocialProof data + badges (independent, can run parallel with 1)
3. TeaserGenerator + minimap changes (depends on path-mapping)
4. Integration + final testing

All client-side, localStorage-based, no backend changes.
