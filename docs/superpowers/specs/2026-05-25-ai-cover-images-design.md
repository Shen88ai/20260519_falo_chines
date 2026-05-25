# AI Cover Images Pipeline — Design Doc

## Contexto
Falo Chinês tem 1 post de blog e 8 lições em 4 fases. Atualmente nenhum deles exibe cover image nos cards de listagem ou na página do post. A referência visual é o handbook `br-compass` que usa covers temáticos para cada capítulo.

## Escolha: Opção C — AI Art Pipeline + Galeria Cinematográfica
Estilo visual selecionado: **Cenários Temáticos (Scene Style)**
Cada post/lição terá uma cena narrativa única, com mood cinematográfico e paleta de cores da fase.

## Mapa Cores por Fase
| Fase | Cor | Uso na Imagem |
|------|-----|---------------|
| Blog | Dourado #EAB308 | Aurora, luz divina, pergaminhos dourados |
| Fase A | Vermelho #B91C1C | Névoa, pôr-do-sol, lanternas |
| Fase B | Jade #2D8A6E | Vegetação, jade, tinta verde |
| Fase C | Roxo #7C3AED | Céu crepuscular, tinta roxa |
| Fase D | Azul #2563EB | Céu noturno, tinta azul |

## Prompts Gerados
Arquivos salvos em `src/Resource/prompts/`:
- `blog/alma-do-mandarim.md` — montanha com pavilhão chinês ao amanhecer
- `lessons/phase-a-01-about.md` — sala de estudo tradicional com caligrafia
- `lessons/phase-a-01-tons-primordiais.md` — guzheng com ondas sonoras visíveis
- `lessons/phase-a-02-pinyin-iniciais.md` — perfil com sons tornando-se pinyin
- `lessons/phase-b-03-radicais-fundamentais.md` — mesa de detetive com puzzle de caracteres
- `lessons/phase-c-04-sintaxe-basica.md` — pergaminho com diagramas de sintaxe
- `lessons/phase-d-05-hsk-negocios.md` — sala de reunião com cartão de visita
- `lessons/phase-d-06-mae-chinesa-fluencia.md` — cozinha, mãe ensinando filho
- `lessons/phase-d-07-crianca-interior-fluencia.md` — quarto infantil nostálgico

## Estilo Visual Consistente
- Digital matte painting / cinematic realism
- Iluminação volumétrica (volumetric fog / light beams)
- Atmosfera noturna/com sombras profundas (dark theme do site)
- Ponto focal iluminado pela cor da fase
- --ar 16:9 (1920×1080)

## Implementação Futura (após imagens prontas)
1. Adicionar `coverImage: z.string().optional()` ao `lessonSchema`
2. Salvar imagens em `public/images/covers/{slug}.png`
3. Atualizar `blog/index.astro` e `licoes/index.astro` para exibir coverImage nos cards
4. Atualizar `blog/[...slug].astro` e `licoes/[slug].astro` para mostrar coverImage no header
5. Criar página `/galeria` com lightbox + filtros
