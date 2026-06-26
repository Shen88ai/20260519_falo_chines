# Guia do Projeto — Falo Chinês 🧭

> Site de aprendizado de Mandarim para falantes de Português.
> Build: Astro v6 + Tailwind v4 | Testes: Vitest | Deploy: Cloudflare Workers

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Astro v6.3.5 (static site generator) |
| Estilo | Tailwind CSS v4 |
| 3D | Three.js (Hanzi Wheel) |
| Animação | GSAP |
| Busca | Fuse.js (busca global) |
| Testes | Vitest + jsdom |
| Conteúdo | Markdown + frontmatter validado por Zod |

---

## Estrutura de Diretórios

```
src/
├── assets/                    # Assets estáticos (SVG)
├── components/                # Componentes .astro reutilizáveis
│   ├── FormNivelamento.astro   # Diagnóstico interativo (pergaminho interno)
│   ├── HanziWheel.astro        # Roda 3D de caracteres
│   ├── PergaminhoVirtual.astro # Callout de venda do Manual (full-width, after Stefany)
│   ├── StrokeWorkbench.astro   # Prática de traços (Hanzi Writer)
│   ├── NavMenu.astro           # Menu de navegação
│   ├── Welcome.astro           # Componente de boas-vindas
│   └── ...                     # Demais componentes
├── content/                    # Coleções Astro (Markdown)
│   ├── blog/                   # Artigos do blog
│   └── lessons/                # Lições (fases A-D)
├── data/                       # Dados estáticos
│   ├── dictionary.ts           # 150+ entradas de caracteres
│   ├── path-mapping.ts         # 4 rotas de aprendizado
│   ├── courses-data.ts         # Metadados de cursos
│   └── comunidade-data.json    # Seed data da comunidade
├── layouts/                    # Layout principal (Layout.astro)
├── lib/                        # Lógica de negócio
│   ├── hanzi-wheel/            # Módulo Three.js da roda 3D (9 arquivos)
│   ├── state-manager.ts        # Máquina de estado do diagnóstico
│   ├── hanzi-writer-manager.ts # Wrapper do Hanzi Writer
│   ├── comunidade-storage.ts   # CRUD localStorage da comunidade
│   └── ...
├── pages/                      # Rotas (11 páginas)
│   ├── index.astro             # Homepage (banner + hero + diagnóstico + pergaminho virtual)
│   ├── manual.astro            # Landing Page do Manual de Caligrafia
│   ├── strokes.astro           # Prática de traços
│   └── ...
├── styles/
│   ├── global.css              # Estilos globais + classes customizadas
│   └── hanzi-wheel.css         # Estilos da roda 3D
├── Resource/
│   ├── project_guide.md        # Este guia
│   └── Check_list/
│       └── Ckeck_list_7_errors.md  # Conteúdo do checklist diagnóstico China
├── public/
│   └── pdf/
│       └── Checklist  7 Erros ao Negociar com a China.pdf  # PDF do checklist
```

---

## Currículo — 4 Fases (A-D)

| Fase | Foco | Exemplos |
|------|------|----------|
| A | Fonética, tons, básico | 中, 你, 我, 好 |
| B | Ideogramas, radicais | 水, 火, 金, 山 |
| C | Gramática, sintaxe | 心, 语, 师, 书 |
| D | HSK, imersão, cultura | 爱, 家, 花, 乐 |

Cada lição em `src/content/lessons/` segue schema Zod (`src/lib/schemas.ts`).

---

## Sistema de Diagnóstico (Leveling)

`FormNivelamento.astro` implementa um quiz de 3 passos que roteia o usuário para 4 caminhos:

| Caminho | Motivação | Path |
|---------|-----------|------|
| Executivo | Negócios & Carreira | A |
| Viajante | Viagem & Sobrevivência | B |
| Acadêmico | Estudos & Certificação HSK | C |
| Entusiasta | Cultura & Lazer | D |

O resultado é exibido num pergaminho virtual (classe `.parchment-scroll`) com roadmap de checkpoints e botão "Iniciar Jornada".

---

## Sistema de Dicionário

`src/data/dictionary.ts` — 150+ entradas com interface:

```typescript
interface DictionaryEntry {
  character: string;    // Caractere chinês
  pinyin: string;       // Pinyin com acentos
  portuguese: string;   // Tradução PT-BR
  radical: string;      // Radical
  strokeCount: number;  // Nº de traços
  mnemonica?: string;   // Mnemônico opcional
  fase: 'A' | 'B' | 'C' | 'D';
  topic: string;        // Tópico semântico
}
```

### Tópicos Disponíveis

`cultura`, `educacao`, `familia`, `descricao`, `social`, `corpo`, `natureza`, `tempo`, `direcao`, `numeros`, `negocios`, `gramatica`, `comida`, `objetos`, `emocao`, `acao`

---

## Sistema de Imagens de Capa (Cover Image Pipeline)

### Onde as Imagens Ficam

| Tipo | Diretório | Exemplo |
|------|-----------|---------|
| Blog | `public/images/blog/` | `alma-do-mandarim.png` |
| Lições | `public/images/lessons/` | `phase-a-01-tons-primordiais.png` |

### Frontmatter

**Blog** (`src/content/blog/*.md`):
```yaml
coverImage: "/images/blog/{slug}.png"
```

**Lições** (`src/content/lessons/**/*.md`):
```yaml
coverImage: "/images/lessons/{slug}.png"
```

### Guia Rápido

1. **Gerar imagem** com IA — aspect ratio 16:9, estilo matte painting noturno
2. **Salvar** em `public/images/{blog|lessons}/{slug}.png`
3. **Adicionar** `coverImage` ao frontmatter do `.md`
4. Aparece automaticamente na listagem, banner hero e **Galeria** (`/galeria`)

### Paleta por Fase

| Fase | Cor | Uso |
|------|-----|-----|
| Blog | Dourado `#EAB308` | Aurora, pergaminhos |
| A | Vermelho `#B91C1C` | Lanternas, pôr-do-sol |
| B | Jade `#2D8A6E` | Vegetação, tinta verde |
| C | Roxo `#7C3AED` | Céu crepuscular |
| D | Azul `#2563EB` | Céu noturno |

---

## Hanzi Wheel — Componente 3D Interativo

Roda de caracteres Three.js na homepage. Funciona como navegador visual do dicionário.

| Arquivo | Função |
|---------|--------|
| `HanziWheel.astro` | Container HTML + canvas + footer |
| `scene-manager.ts` | Cena Three.js, câmera, raycasting |
| `wheel-core.ts` | Anel arco-íris + sprite central pulsante |
| `orbiting-chars.ts` | Sprites em órbita (órbita dupla se > 10 chars) |
| `galaxy-cloud.ts` | 800 partículas estilo nebulosa |
| `config.ts` | Categorias e grupos |
| `device-tier.ts` | Detecta high/medium/low |

### Navegação

- **Tabs**: Tom, Radical, Tópico, Nível
- **Dots**: subgrupos (ex: Fase A-D)
- **◀ ▶**: navega entre grupos
- **Clique no caractere**: abre painel de detalhes (pinyin, tradução, radical)

---

## Pergaminho Virtual (Callout de Venda)

### Componente: `PergaminhoVirtual.astro`

Full-width callout posicionado **após o card da Stefany Shen** na homepage, antes das seções B2B.

```
[Card Stefany] → [PERGAMINHO VIRTUAL] → [B2B / Cursos / Footer]
```

### Copy

- **Título:** "O Caminho do Foco e da Disciplina Através do Pincel"
- **Texto:** "Muito mais do que escrita: a caligrafia chinesa é uma meditação ativa para desacelerar a mente. Descubra os segredos etimológicos e a ordem dos traços no nosso guia exclusivo."
- **CTA:** "Adquirir o Manual de Caligrafia Chinesa"

### Elementos Visuais

| Elemento | Classe/CSS | Descrição |
|----------|-----------|-----------|
| Fundo pergaminho | `.parchment-scroll` | Papel de arroz envelhecido, bordas de madeira |
| Selo decorativo | `.stamp-seal` | Círculo vermelho com caractere 書 (caligrafia) |
| Botão CTA | `.stamp-btn` | Visual de carimbo tradicional (sombra estilo nanquim) |
| Fotos | `foto_StefanyShen.png` + `capa_ebook_numero.png` | Split 60/40 texto-foto |
| Prova social | inline | "+45 mil pessoas · 4.9★ de satisfação" |

### Estilos no `global.css`

```css
.stamp-seal { box-shadow: 0 2px 0 #7f0000, 0 4px 8px rgba(0,0,0,0.3); }
.stamp-btn  { box-shadow: 0 4px 0 #7f0000, 0 6px 12px rgba(0,0,0,0.3); }
```

---

## Fontes Web Chinesas (Subsetting)

### Problema

Fontes TTF chinesas são enormes (35–46 MB cada). Cloudflare Workers tem limite de **25 MB por arquivo**.

### Solução

Subsetting com `fonttools` + `pyftsubset`, mantendo apenas os caracteres efetivamente usados no site.

### Arquivos Resultantes

| Fonte | Tamanho Original | Subset (WOFF2) |
|-------|-----------------|-----------------|
| TW-Kai-98_1 | 36.9 MB | **185 KB** |
| TW-Kai-Ext-B-98_1 | 46.5 MB | **3.7 KB** |
| TW-Kai-Plus-98_1 | 25.3 MB | **3.8 KB** |
| **Total** | **108 MB** | **193 KB** |

### Como Refazer o Subset

```bash
# 1. Extrair caracteres usados no projeto
python -c "
import glob; chars=set()
for ext in ('*.astro','*.ts','*.css','*.md','*.json','*.html'):
    for f in glob.glob(f'src/**/{ext}', recursive=True):
        try:
            with open(f, encoding='utf-8') as fh:
                chars.update(c for c in fh.read() if 0x4E00<=ord(c)<=0x9FFF)
        except: pass
with open('chars-used.txt','w',encoding='utf-8') as f:
    f.write(''.join(sorted(chars)))
print(f'{len(chars)} caracteres extraídos')
"

# 2. Gerar WOFF2 subset para cada fonte
pyftsubset public/fonts/TW-Kai-98_1.ttf \
  --text-file=chars-used.txt \
  --output-file=public/fonts/TW-Kai-98_1-subset.woff2 \
  --flavor=woff2 \
  --layout-features='*'

pyftsubset public/fonts/TW-Kai-Ext-B-98_1.ttf \
  --text-file=chars-used.txt \
  --output-file=public/fonts/TW-Kai-Ext-B-98_1-subset.woff2 \
  --flavor=woff2 \
  --layout-features='*'

pyftsubset public/fonts/TW-Kai-Plus-98_1.ttf \
  --text-file=chars-used.txt \
  --output-file=public/fonts/TW-Kai-Plus-98_1-subset.woff2 \
  --flavor=woff2 \
  --layout-features='*'

# 3. Remover TTFs originais (não deployar)
rm public/fonts/TW-Kai-98_1.ttf
rm public/fonts/TW-Kai-Ext-B-98_1.ttf
rm public/fonts/TW-Kai-Plus-98_1.ttf

# 4. Atualizar referências em src/styles/global.css:
#    src: url('/fonts/...-subset.woff2') format('woff2');
```

### Configuração no CSS

```css
@font-face {
  font-family: 'TW-Kai';
  src: url('/fonts/TW-Kai-98_1-subset.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+4E00-9FFF, U+3400-4DBF, U+F900-FAFF;
}
```

> **Importante:** Após adicionar conteúdo com novos caracteres chineses, refaça o passo 1 e 2 para atualizar o subset.

---

## Fontes Web (Google Fonts)

| Uso | Fonte |
|-----|-------|
| Português (corpo + títulos) | **Nunito** (300–900) |
| Chinês (UI/botões) | **ZCOOL QingKe HuangYou** |
| Chinês (texto longo) | **Noto Sans SC** |
| Chinês (caligrafia) | **TW-Kai** (subset, ver seção acima) |

---

## Sistema de Prática de Traços (Strokes)

### Arquitetura

| Arquivo | Função |
|---------|--------|
| `src/lib/hanzi-writer-manager.ts` | Wrapper Hanzi Writer, estado do caractere, 3 camadas |
| `src/components/StrokeWorkbench.astro` | Canvas SVG, controles, decomposição, quiz |
| `src/pages/strokes.astro` | Rate page |

### Camadas Progressivas

1. **Assistir** (watch) — animação com controle de velocidade
2. **Praticar** (practice) — quiz com contorno visível
3. **Dominar** (master) — quiz sem contorno, estatísticas

### Script Toggle

Botão `简` / `繁` alterna entre Simplificado e Tradicional usando `src/data/simplified-to-traditional.ts`.

---

## Sistema de Comunidade

Auto-contido (zero dependências externas). Alunos submetem conteúdo via formulários inline que salvam em `localStorage`.

### Categorias

| Categoria | Descrição |
|-----------|-----------|
| Situações | Pedidos de situações para praticar chinês |
| Dificuldades | Caracteres difíceis (registrado por clique) |
| Macetes | Mnemônicos compartilhados |
| Comentários | Opiniões sobre posts e lições |

### Arquivos

| Arquivo | Função |
|---------|--------|
| `comunidade.astro` | Hub com 4 abas + formulários |
| `ComunidadeCard.astro` | CTA card reutilizável |
| `comunidade-storage.ts` | localStorage CRUD |
| `comunidade-data.json` | Seed data (5 registros/categoria) |

---

## Landing Page Diagnóstico China

`src/pages/diagnostico-china.astro` — ferramenta de diagnóstico para empreendedores brasileiros que negociam (ou querem negociar) com a China.

### Estrutura da Página

| Seção | Descrição |
|-------|-----------|
| **Hero** | Escassez (vagas restantes dinâmicas), headline, checklist + diagnóstico como materiais gratuitos, social proof (4.9★, +50 empresas, resposta 2h) |
| **Lead Magnet** | "Checklist 7 Erros ao Negociar com a China" — card com botão de download PDF |
| **O que é o Diagnóstico** | Sessão de 30 min via WhatsApp com 3 bullets (fase, objetivo, porte) |
| **Quiz Interativo** | 7 perguntas com progress bar + resultado com envio WhatsApp |
| **Como Funciona** | 3 passos: Responda → Receba → Agende |
| **Consultoria Shen** | Seção de autoridade (foto + bio + cases) |
| **Planos de Preços** | 4 cards: Diagnóstico Inicial (grátis), Consultoria 45min, Consultoria 90min (destaque), Plano Mensal |
| **Escassez** | Contador dinâmico JS: `20 - dia_do_mês`, barra de progresso, múltiplos elementos na página |
| **CTA Final** | "Pronto para descobrir sua fase?" + link para o quiz |

### Quiz — `src/components/DiagnosticoChinaQuiz.astro`

| Item | Detalhe |
|------|---------|
| Steps | 8 (7 perguntas + resultado) |
| Campos | `negociacao`, `objetivo`, `porte`, `produtos`, `maiorDesafio`, `prazo`, `experiencia` |
| Input | Options buttons + campo texto para "produtos" |
| Resultado | Mostra checklist + diagnóstico + botão WhatsApp com texto formatado |
| Tracking | `quiz_completed` + `quiz_whatsapp_click` (GA4 + Meta Pixel) |

### State Management — `src/lib/diagnostico-china-quiz.ts`

Função `calcularRecomendacao(respostas)` retorna:
- `'diagnostico-inicial'` — se experiência "sim" ou prazo "longo"
- `'consultoria-avulsa-90'` — se experiência "sim"
- `'plano-mensal'` — fallback

### Pós-WhatsApp — `src/pages/diagnostico-china/obrigado.astro`

Página de confirmação com:
- Checkmark animado
- Explicação do que esperar (checklist PDF, diagnóstico, resposta em 2h)
- Botões: "Baixar PDF agora" + "Falar no WhatsApp" (fallback)
- UTM tracking via GA4 + Meta Pixel

### Checklist PDF — `public/pdf/Checklist  7 Erros ao Negociar com a China.pdf`

Conteúdo markdown em `src/Resource/Check_list/Ckeck_list_7_errors.md` (7 erros com pesquisa, checklist de prevenção + tabela resumo). PDF na pasta `public/pdf/` servido em `/pdf/Checklist  7 Erros ao Negociar com a China.pdf`.

### Testes

| Arquivo | Testes |
|---------|--------|
| `tests/diagnostico-china.test.ts` | 16 testes (SEO, hero, quiz, preços, escassez, lead magnet, CTA, cores) |
| `tests/diagnostico-china-quiz.test.ts` | 7 testes (state management, recomendações, WhatsApp) |

---

## Landing Page do Manual de Caligrafia

`src/pages/manual.astro` — página dedicada de vendas do ebook com:

- **Hero:** Headline direta + capa do ebook + botão Hotmart
- **Seção Autora:** Biografia + linha do tempo Taiwan→Paraguai→Chile→Brasil
- **Prova Social:** Vídeo YouTube incorporado + 3 depoimentos
- **3 Pilares:** Ordem dos Traços, Foco e Disciplina, Significados Culturais
- **CTA Final:** Botão de garantia com selo Hotmart

### Testes

`tests/landing-page-manual.test.ts` — 8 testes (SEO, headline, capa, vídeo, depoimentos, CTA).

---

## Testes

Runner: **Vitest** com ambiente jsdom.

```bash
npm test              # Rodar todos os testes
npx vitest run        # Rodar uma vez (CI)
npx vitest            # Modo watch
```

### Arquivos de Teste (25 suites, 225 testes)

| Teste | Testes | O que cobre |
|-------|--------|-------------|
| `pergaminho-virtual.test.ts` | 12 | Componente PergaminhoVirtual |
| `homepage-banner.test.ts` | 6 | Banner do manual na homepage |
| `strokes-page-banner.test.ts` | 6 | Banner na página de traços |
| `landing-page-manual.test.ts` | 8 | Landing page do manual |
| `diagnostico-china.test.ts` | 16 | Landing page Diagnóstico China |
| `diagnostico-china-quiz.test.ts` | 7 | State management do quiz |
| `nav-menu.test.ts` | 8 | Menu de navegação |
| `state-manager.test.ts` | 14 | Máquina de estado do diagnóstico |
| `search.test.ts` | 12 | Busca global Fuse.js |
| `courses-data.test.ts` | 12 | Integridade dos dados de cursos |
| `comunidade-storage.test.ts` | 8 | CRUD localStorage |
| `hanzi-writer-manager.test.ts` | 10 | Wrapper do Hanzi Writer |
| ... e mais 13 suites | restantes | Demais componentes |

### Padrão TDD

Sempre escrever testes **antes** da implementação:

1. **RED** — testes falham (componente não existe)
2. **GREEN** — implementar até passar
3. **REFAKTOR** — rodar suite completa para garantir que nada quebrou

---

## Analytics (GA4 + Meta Pixel)

Rastreadores configurados no `src/layouts/Layout.astro` com ativação condicional via env vars:

| Variável | Serviço | Efeito |
|----------|---------|--------|
| `PUBLIC_GA4_ID` | Google Analytics 4 | Ativa GA4 (gtag.js) |
| `PUBLIC_META_PIXEL_ID` | Meta Pixel (Facebook) | Ativa Pixel + PageView |

### Eventos de Conversão

**Landing Page Diagnóstico China** (`diagnostico-china.astro`):
- `cta_click` — cliques em links WhatsApp, #quiz, #precos
- `quiz_completed` — usuário finaliza as 7 perguntas (disparado pelo componente quiz)
- `quiz_whatsapp_click` — clique no botão de resultado do quiz

**Página Obrigado** (`obrigado.astro`):
- GA4 event `conversion` (lead)
- Meta Pixel `Lead`

### Configuração

```bash
# Para ativar em produção, setar as env vars no deploy:
# Cloudflare Pages: Settings → Environment Variables
PUBLIC_GA4_ID=G-XXXXXXXXXX
PUBLIC_META_PIXEL_ID=1234567890
```

Sem as env vars, nenhum script de tracking é carregado (dev sem rastreio).

---

## Build & Deploy

```bash
npm run build     # Gera dist/ (28 páginas, ~3.5s)
npm run preview   # Preview local do build
```

### Cloudflare Workers

- Limite: **25 MB por arquivo estático**
- Fontes TTF originais (108 MB total) **excedem** o limite
- Usar **WOFF2 subset** (193 KB total) — ver seção "Fontes Web Chinesas (Subsetting)"

---

## Manutenção Futura

### Adicionar Nova Lição

1. Criar arquivo `.md` em `src/content/lessons/`
2. Preencher frontmatter (validação Zod automática)
3. Criar cover image em `public/images/lessons/{slug}.png`
4. Adicionar caracteres novos ao `src/data/dictionary.ts` se necessário
5. Rodar `npm test && npm run build`

### Adicionar Novo Personagem ao Hanzi Wheel

1. Adicionar entrada em `src/data/dictionary.ts`
2. Associar a um radical existente
3. O Wheel consome automaticamente

### Atualizar Font Subset

1. Rodar script de extração de caracteres (ver seção de subsetting)
2. Regenerar WOFF2 com `pyftsubset`
3. Verificar build

### Este Guia

Manter este arquivo (`src/Resource/project_guide.md`) atualizado com decisões técnicas, novos componentes e mudanças de arquitetura para garantir que o próximo desenvolvedor (humano ou IA) tenha contexto completo.
