# Navigation Dropdown Redesign

## Problem
Current navigation has 9 flat links with no categorization, no mobile menu (hidden on small screens), no active page indicator, and missing pages (Sobre Mim, Comunidade).

## Solution
Categorize navigation items into 4 groups with dropdown menus (desktop) and accordion hamburger menu (mobile).

## Navigation Structure

### Visible always
- Logo → Início (/)
- CTA button → Nivelamento (#nivelamento)

### Dropdown Categories

| Category | Items | Description |
|----------|-------|-------------|
| 📖 Aprender | Lições, Traços, Glossário | Core learning resources |
| 🌐 Comunidade | Blog, Galeria, Comunidade | Community content |
| 💼 Serviços | Serviços Empresariais, Imersão Mandarim | Paid services |
| ℹ️ Sobre | Sobre Mim, Licenças | About & legal |

## Behavior

### Desktop (>768px)
- Hover/click toggles dropdown
- Glass-panel backdrop blur
- Fade-in + slide-down animation
- Current page highlighted with brand-gold
- Click outside / ESC closes

### Mobile (<768px)
- Hamburger icon (right side)
- Full-screen overlay with slide-in from right
- Accordion categories (click to expand/collapse)
- Auto-close on navigation
- Blurred backdrop

## Technical Design
- `src/components/NavMenu.astro` — component with embedded <script> for interactivity
- State management via vanilla JS (no framework needed)
- Tailwind CSS for styling (follow existing glass-panel pattern)
- Active page detection via `window.location.pathname`
