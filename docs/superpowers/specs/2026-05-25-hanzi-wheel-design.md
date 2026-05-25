# Hanzi Wheel — Interactive Homepage Component

## Goal

Replace the decorative `Bussola3D.astro` (Three.js compass) on the homepage hero with an **interactive Hanzi memorization wheel** that helps users explore and memorize Chinese characters visually.

## Architecture

### Component Tree

```
HanziWheel.astro                 ← replaces Bussola3D.astro in home hero (col-span-6)
├── <canvas>                     ← Three.js scene (auto-rotating characters on orbit)
├── CategoryTabs.astro           ← Tone / Radical / Topic / Fase
├── GroupDots.astro              ← Pagination dots for groups in current category
├── CharTooltip.astro            ← Floating DOM tooltip (pinyin + meaning on hover)
└── CharDetailPanel.astro        ← Slide-in overlay (full character details)
```

### Files

```
src/
├── lib/hanzi-wheel/
│   ├── types.ts                 ← WheelState, WheelStateData, config interfaces
│   ├── config.ts                ← category definitions, default group, group-lookup fns
│   ├── state-manager.ts         ← event-driven state machine (FateWheel pattern)
│   ├── scene-manager.ts         ← Three.js init, render loop, resize/cleanup
│   ├── wheel-core.ts            ← center character display + ring geometry
│   ├── orbiting-chars.ts        ← character sprites on orbit, animation, hover hit-test
│   ├── character-utils.ts       ← extract tone from pinyin, group by radical/topic/fase
│   └── device-tier.ts           ← high/medium/low detection (copy from FateWheel)
├── components/HanziWheel.astro  ← main component
├── styles/hanzi-wheel.css       ← overlay/tooltip/panel styles
```

### Modified files

- `src/pages/index.astro` — replace `<Bussola3D />` with `<HanziWheel />`
- `src/data/dictionary.ts` — add `fase` and `topic` fields to `DictionaryEntry`

## Data Model

### DictionaryEntry (extended)

```typescript
interface DictionaryEntry {
  character: string;
  pinyin: string;
  portuguese: string;
  radical: string;
  strokeCount: number;
  mnemonica?: string;
  audioFilename?: string;
  fase: 'A' | 'B' | 'C' | 'D';
  topic: string;  // 'saudacao' | 'comida' | 'viagem' | 'numeros' | ...
}
```

Tone is derived from pinyin at runtime (accent → number 1-4 or neutral).

### Wheel Categories

| Category | Derivation | Groups |
|---|---|---|
| Tone | From pinyin accent | 5 (1st, 2nd, 3rd, 4th, neutral) |
| Radical | From `radical` field | Most common radicals |
| Topic | From `topic` field | 6-10 semantic groups |
| Fase | From `fase` field | 4 (A/B/C/D) |

### Config

```typescript
type WheelCategory = 'tone' | 'radical' | 'topic' | 'fase'

interface WheelGroup {
  id: string;
  label: string;
  color: string;
  characters: string[];
}
```

## State Machine

```typescript
type WheelState = 'idle' | 'hovering' | 'detail' | 'switching-category' | 'rotating'

interface WheelStateData {
  state: WheelState;
  currentCategory: WheelCategory;
  currentGroup: string;
  centerCharacter: string | null;
  hoveredCharacter: string | null;
  selectedCharacter: string | null;
  orbitingCharacters: string[];
}
```

### Events

| Event | Trigger | Effect |
|---|---|---|
| `hanzi-wheel:category-change` | Tab click | Animate to new group, update orbiting chars |
| `hanzi-wheel:character-hover` | Mouse over sprite | Show tooltip with pinyin + meaning |
| `hanzi-wheel:character-click` | Click sprite | Open detail panel (strokes, mnemonic, examples) |
| `hanzi-wheel:close-detail` | Close/outside click | Return to idle |

### Flow

```
idle → (hover char) → hovering → (mouse leave) → idle
idle → (click char) → detail → (close) → idle
idle → (click tab) → switching-category → (animation done) → idle
idle → (click group dot) → idle (new group rendered)
```

## Three.js Scene

- **Center**: Glowing character (current focus), subtle float animation
- **Orbit ring**: Dashed circle, characters positioned along it
- **Character sprites**: Canvas-rendered text sprites, one per character
- **Auto-rotation**: Full revolution every 30s
- **Hover**: Character highlights (scale + glow), tooltip triggered as DOM overlay
- **Click**: Raycaster hit-test → dispatch `hanzi-wheel:character-click`

Performance: device-tier detection. Low-tier: CSS fallback (static orbit with DOM elements).

## UI Overlays

**CharTooltip** — absolute-positioned near hovered sprite. Shows: hanzi (large), pinyin, Portuguese translation. Visible only during `hovering` state.

**CharDetailPanel** — slides in from right. Shows: hanzi, pinyin, audio play button, radical, stroke count, mnemonic, topic tags, link to relevant lesson.

**CategoryTabs** — horizontal bar below wheel. 4 buttons: Tom | Radical | Tópico | Fase. Active tab highlighted with accent color.

**GroupDots** — small dots below tabs. One per group in current category. Click to jump to group. Active dot filled.

## Dependencies

- Three.js (already in project via Bussola3D)
- GSAP (already in project for page transitions)
- No new npm packages

## Out of Scope

- Stroke order animation
- Spaced repetition algorithm
- User progress tracking
- Mobile drag-to-rotate (future enhancement)
