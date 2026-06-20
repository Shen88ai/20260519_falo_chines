# Landing Page: Nome Chinês Exclusivo

## Product Overview

Service: Custom Chinese name translation/calligraphy. Each order receives the name in 3 styles:
- Ink calligraphy (traditional)
- Futuristic interface (digital)
- Translucent calligraphy (watermark style)

Delivery: PDF/images via WhatsApp. Manual creation by Stefany (no auto-generation).

## Quiz Funnel (Landing Page)

Questions asked sequentially (inline, Typeform-style):

1. **Name** — text input: "Qual é o seu nome nativo?"
2. **Translation type** — 3 buttons: "Pelo som 🎶 / Pelo significado 🌸 / Nome especial 💎"
3. **Motivation** — 4 buttons: "Tatuagem 🖋️ / Redes sociais 📱 / Curiosidade 🌏 / Presente 🎁"
4. **Favorite style** — 3 image cards showing Ink/Futuristic/Translucent
5. **Dedication?** — Yes/No toggle
6. **Result screen** — "Pronto! Seu nome será criado manualmente. Clique para encomendar."

No auto-generated preview. Quiz data is captured and sent via WhatsApp for manual fulfillment.

## Page Sections

1. **Hero** — Headline + CTA + ink calligraphy decorative background
2. **Quiz (embedded)** — Sequential inline questions, leads to CTA
3. **3 Styles showcase** — Cards with images of all 3 styles
4. **Authority** — Stefany's intercultural journey (Taiwan → Paraguay → Chile → Brazil)
5. **Social proof** — Testimonials
6. **Final CTA** — Checkout modal with WhatsApp + Hotmart

## Architecture

```
src/
  pages/
    nome-chines.astro        ← NEW: landing page
  components/
    NomeChinesQuiz.astro     ← NEW: quiz component
  lib/
    nome-chines-quiz.ts      ← NEW: quiz state logic
  Resource/
    image_name_example/      ← existing images
tests/
    nome-chines-landing.test.ts  ← NEW: TDD tests
    homepage-banner.test.ts      ← update
    landing-page-manual.test.ts  ← update (check if covers manual)
```

## Technical Stack

- Astro component + TailwindCSS (same pattern as manual.astro)
- Client-side JS for quiz state (no framework, vanilla JS as existing codebase)
- WhatsApp integration for lead capture
- Hotmart checkout link

## Banner Placements

1. **index.astro** — Ribbon banner after hero or before footer, linking to `/nome-chines`
2. **manual.astro** — Banner after benefits section, linking to `/nome-chines`
