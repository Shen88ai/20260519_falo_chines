Goal
Analysis of the Mandarin Chinese learning website project (targeted at Portuguese speakers) located at C:\Users\YANG\Antigravity\20260519_falo_chines\ is complete. This document details the project's architecture, content structure, data management systems, and newly implemented search functionality.
Instructions

- Act as a master language learning site engineer.
- Thoroughly analyze the project: examine all directories, configuration files, content structures, and code logic.
- Identify key technical decisions, content organization patterns, and data formats.
- Provide actionable insights and recommendations for scaling content and maintaining consistency.
- Focus on information that will persist and guide future development and content creation workflows.
- Continue the analysis workflow until the report is complete, then proceed to the next user directive.
  Discoveries
- Tech Stack: Built with Astro v6.3.5 (static site generator), styled with Tailwind CSS v4, and enhanced with Three.js, GSAP, and Fuse.js (used for global search functionality).
- Content Management: Lessons are authored in Markdown (src/content/lessons/) using a structured frontmatter schema validated by Zod (schemas.ts) for Astro's content collection API.
- Curriculum Structure: Divided into 4 Phases: A (Phonetics/Tones), B (Ideograms/Radicals), C (Syntax/Grammar), D (HSK/Culture/Immersion).
- Personalization System: A custom state-manager.ts implements a leveling/assessment quiz that routes users to 4 paths: Executive (Business), Traveler (Survival), Academic (Linguistics), Enthusiast (Culture).
- Data Architecture:
  - dictionary.ts stores Hanzi entries (pinyin, Portuguese translations, radicals, stroke counts, mnemonics).
  - path-mapping.ts defines curriculum routing sequences and learning strategies per path.
  - courses-data.ts manages course metadata, pricing, and WhatsApp enrollment links.
- Target Audience: Portuguese speakers learning Mandarin, featuring bilingual content (Portuguese/Chinese) and a unique "Chinese Mother" immersion methodology.
  Accomplished
- ✅ Successfully read and parsed package.json, astro.config.mjs, tsconfig.json, vitest.config.ts, .env.txt, and README.md.
- ✅ Mapped the complete src/ directory tree.
- ✅ Read all lesson Markdown files across Phases A, B, C, and D.
- ✅ Read core library files: schemas.ts, courses-data.ts, state-manager.ts, dictionary-utils.ts.
- ✅ Read data files: dictionary.ts, path-mapping.ts.
- ✅ Completed analysis of src/components/, src/pages/, src/layouts/, src/styles/, src/Resource/, and tests/ directories.
- ✅ Implemented and tested global search functionality (Fuse.js) supporting Chinese character lookup.
- ✅ Verified all existing tests pass (27/27) and build completes successfully.
  Relevant files / directories
- Project Root: C:\Users\YANG\Antigravity\20260519_falo_chines\
- Config & Setup: package.json, astro.config.mjs, tsconfig.json, vitest.config.ts, .env.txt, README.md
- Content Layer: src/content.config.ts, src/content/lessons/ (contains Phase A, B, C, D Markdown files)
- Library & Logic: src/lib/schemas.ts, src/lib/courses-data.ts, src/lib/state-manager.ts, src/lib/dictionary-utils.ts
- Data Models: src/data/dictionary.ts, src/data/path-mapping.ts
- All analysis completed: src/components/, src/pages/, src/layouts/, src/styles/, src/Resource/, and tests/ directories have been examined and documented.

---

## Cover Image Pipeline

Cada post do blog e lição tem uma **cover image** temática. O sistema cobre automaticamente: exibição nos cards de listagem, banner hero na página individual, e galeria com lightbox.

### Onde as Imagens Ficam

| Tipo | Diretório | Exemplo |
|------|-----------|---------|
| Blog | `public/images/blog/` | `public/images/blog/alma-do-mandarim.png` |
| Lições | `public/images/lessons/` | `public/images/lessons/phase-a-01-tons-primordiais.png` |

### Frontmatter

**Blog** (`src/content/blog/*.md`):
```yaml
coverImage: "/images/blog/{slug}.png"
```

**Lições** (`src/content/lessons/**/*.md`): o schema em `src/lib/schemas.ts` já inclui `coverImage: z.string().optional()`. Adicionar no frontmatter:
```yaml
coverImage: "/images/lessons/{slug}.png"
```

Slug = nome do arquivo sem `.md` (ex: `phase-a-01-tons-primordiais`).

### Onde a Cover Image Aparece

1. **Listagem de Blog** (`/blog`) — thumbnail 16:9 no topo do card
2. **Listagem de Lições** (`/licoes`) — thumbnail 16:9 no topo do card, agrupado por fase
3. **Post individual** (`/blog/{slug}`) — banner hero 21:9 entre breadcrumbs e título
4. **Lição individual** (`/licoes/{slug}`) — banner hero 21:9 entre breadcrumbs e título
5. **Galeria** (`/galeria`) — grid responsivo com lightbox fullscreen e filtros (Blog / Fase A-D)

### Galeria de Capas (`/galeria`)

Página automática: coleta todos os posts com `coverImage` preenchido. Oferece:
- Grid responsivo (1-4 colunas) com hover revelando badge e título
- Filtros por categoria: Todas, Blog, Fase A, B, C, D
- Lightbox fullscreen: imagem em tela cheia, navegação ←/→, contador (3/9), link para o post
- Atalhos de teclado: `Esc` fecha, `←`/`→` navega

**Nova postagem aparecerá automaticamente** na galeria — basta ter `coverImage` no frontmatter.

### Guia Rápido: Adicionar Cover Image a um Novo Post

1. **Gerar imagem** com IA. Especificações:
   - Aspect ratio: 16:9 (`--ar 16:9` no Midjourney)
   - Estilo: matte painting cinematográfico, atmosfera noturna, ponto focal iluminado
   - Cor de destaque conforme a fase (ver tabela abaixo)
   - Versão Midjourney: `--style raw --v 6.1 --s 250`

2. **Salvar** em `public/images/blog/{slug}.png` ou `public/images/lessons/{slug}.png`

3. **Adicionar** `coverImage: "/images/{blog|lessons}/{slug}.png"` ao frontmatter do `.md`

### Fases & Paleta de Cores

| Fase | Cor Hex | Uso na Imagem |
|------|---------|---------------|
| Blog | Dourado `#EAB308` | Aurora, luz divina, pergaminhos dourados |
| Fase A | Vermelho `#B91C1C` | Névoa, pôr-do-sol, lanternas |
| Fase B | Jade `#2D8A6E` | Vegetação, jade, tinta verde |
| Fase C | Roxo `#7C3AED` | Céu crepuscular, tinta roxa |
| Fase D | Azul `#2563EB` | Céu noturno, tinta azul |

### Prompt Template por Tipo de Post

**Blog (reflexão/cultural):** Cenário contemplativo — montanhas, névoa, pergaminhos, luz dourada rompendo a névoa. Tom poético e convidativo.

**Lição de Fonética (Fase A):** Elementos sonoros visíveis — instrumentos musicais, ondas sonoras, notas se transformando em caracteres. Tons vermelhos.

**Lição de Ideogramas (Fase B):** Desconstrução visual — puzzle de caracteres, lupa, mesa de detetive, blocos de montar. Tons verdes/jade.

**Lição de Gramática (Fase C):** Diagramas e ordens — pergaminhos com fórmulas de sintaxe, ábaco, caracteres se alinhando. Tons roxos.

**Lição de HSK/Imersão (Fase D):** Contexto profissional ou íntimo — sala de reunião, cozinha da mãe, quarto infantil. Tons azuis.

### Prompts Existentes (Referência)

Arquivos em `src/Resource/prompts/`:
- `blog/alma-do-mandarim.md`
- `lessons/phase-a-01-about.md`, `phase-a-01-tons-primordiais.md`, etc. (1 por lição)

Cada arquivo contém: prompt descritivo longo, variante curta para Midjourney, e parâmetros técnicos.

### Referência
Design doc: `docs/superpowers/specs/2026-05-25-ai-cover-images-design.md`

---

## Hanzi Wheel 3D Interactive Component

Componente Three.js na homepage (`/`) que exibe caracteres chineses orbitando em 3D. Funciona como navegador visual do dicionário.

### Arquitetura

| Arquivo | Função |
|---------|--------|
| `src/components/HanziWheel.astro` | Container HTML + canvas + footer (tabs, dots, prev/next) |
| `src/styles/hanzi-wheel.css` | Estilos do footer, tabs, dots, tooltip, painel de detalhes |
| `src/lib/hanzi-wheel/scene-manager.ts` | Inicializa cena Three.js, câmera, render loop, raycasting |
| `src/lib/hanzi-wheel/wheel-core.ts` | Anel externo (gradiente arco-íris), sprite central com efeito "breath" |
| `src/lib/hanzi-wheel/orbiting-chars.ts` | Sprites orbitantes — suporta **órbita dupla** (>10 chars) |
| `src/lib/hanzi-wheel/galaxy-cloud.ts` | Fundo com 800 partículas estilo nebulosa (cores da paleta neon) |
| `src/lib/hanzi-wheel/state-manager.ts` | Estado global: categoria, grupo, hover, seleção |
| `src/lib/hanzi-wheel/config.ts` | Categorias (Tom/Radical/Tópico/Nível) e `buildGroups()` |
| `src/lib/hanzi-wheel/types.ts` | Tipos TypeScript (`WheelCategory`, `WheelGroup`, etc.) |
| `src/lib/hanzi-wheel/character-utils.ts` | Helper para buscar info de caractere no dicionário |
| `src/lib/hanzi-wheel/device-tier.ts` | Detecta capacidade do dispositivo (high/medium/low) |

### Navegação

- **Tabs** no footer alternam entre: Tom, Radical, Tópico, Nível
- **Dots** abaixo das tabs representam subgrupos (ex: Fase A, B, C, D)
- **Botões ◀ ▶** nas laterais dos dots navegam entre grupos (wrapping)
- Clicar num caractere em órbita abre painel de detalhes (pinyin, tradução, radical, strokes, mnemônico)

### Órbitas Duplas

Grupos com mais de **10 caracteres** são automaticamente divididos em duas órbitas:
- Órbita interna: raio 1.4, scale 0.32 (caracteres pares)
- Órbita externa: raio 2.15, scale 0.38 (caracteres ímpares)
- Pequeno offset em Z para evitar sobreposição

### Efeitos Visuais

- **Anel externo**: 48 segmentos com gradiente HSL (arco-íris), opacidade 0.35
- **Caractere central**: pulsa suavemente (scale 0.43–0.67, opacity 0.4–1.0) com `sin(time * 0.002)`
- **Galaxy cloud**: 800 partículas distribuídas em disco, cores da paleta neon (platina #E8E4D9, ouro #D4A843, amarelo #E5FF00, verde #00FF87, azul #7DD3FC), drift animado, blending aditivo

## Dicionário de Caracteres

`src/data/dictionary.ts` armazena todos os caracteres com metadados. Atualmente **150 entradas**, 29 radicais com **5 caracteres cada**.

### Interface

```typescript
export interface DictionaryEntry {
  character: string;    // O caractere chinês
  pinyin: string;       // Pinyin com acentos de tom
  portuguese: string;   // Tradução em português
  radical: string;      // Radical do caractere
  strokeCount: number;  // Número de traços
  mnemonica?: string;   // Mnemônico opcional
  audioFilename?: string; // Arquivo de áudio opcional
  fase: 'A' | 'B' | 'C' | 'D';  // Fase do currículo
  topic: string;        // Tópico semântico (ex: familia, cultura, negocios)
}
```

### Como Adicionar Novo Caractere

1. Adicionar ao objeto `dictionary` em `src/data/dictionary.ts`
2. Usar o caractere como chave (ex: `'新': { ... }`)
3. Preencher todos os campos obrigatórios
4. Associar a um radical já existente para aparecer no grupo correto
5. Escolher `fase` e `topic` apropriados
6. O Hanzi Wheel e demais páginas consomem estes dados automaticamente
7. Rodar `npm run build` para verificar

### Tópicos Disponíveis

`cultura`, `educacao`, `familia`, `descricao`, `social`, `corpo`, `natureza`, `tempo`, `direcao`, `numeros`, `negocios`, `gramatica`, `comida`, `objetos`, `emocao`, `acao`

### Fases

| Fase | Foco | Exemplos |
|------|------|----------|
| A | Fonética, tons, básico | 中, 你, 我, 好, 大, 小 |
| B | Ideogramas, radicais | 商, 水, 火, 金, 山, 月 |
| C | Gramática, sintaxe | 心, 语, 老, 师, 书 |
| D | HSK, imersão, cultura | 爱, 家, 花, 乐, 安 |

## Sistema de Lições

`src/content/lessons/` contém lições em Markdown com frontmatter validado por Zod (`src/lib/schemas.ts`). Cada lição pertence a uma fase (A-D) e segue schema com campos como `title`, `description`, `phase`, `coverImage`, etc.
