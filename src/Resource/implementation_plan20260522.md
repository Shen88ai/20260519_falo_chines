# Plano de Implementação: Seções Premium e Criativas (Cursos & Tradução)

Este plano detalha a reestruturação e o enriquecimento visual das seções **Cursos de Mandarim** e **Serviços de Tradução & Interpretação** na página inicial (`src/pages/index.astro`). A proposta incorpora conceitos visuais do **Obsidian** (como notas Markdown e o Graph View) e do **Brainstorming** (mapas mentais interativos) para criar uma experiência comercialmente irresistível e de alta qualidade estética.

## User Review Required

> [!NOTE]
> As alterações são puramente visuais e de conteúdo na página inicial, mantendo a compatibilidade total com o sistema de rotas e o leitor de lições do Obsidian.
> As chamadas de ação (CTAs) serão direcionadas para o WhatsApp Business da Stefany Shen (`+55 11 9699-0939`) com mensagens pré-preenchidas específicas para cada curso ou serviço, otimizando a taxa de conversão comercial.

## Proposed Changes

### 1. Seção: Ensino & Tradução Profissional (Sobre Nós & Diferenciais)

Redesenhar o topo do painel de serviços para introduzir a marca pessoal de **Stefany Shen** e a proposta de valor unificada.

- **Design Visual**: Painel dividido em duas colunas com efeito glassmorphic e bordas brilhantes em degradê.
  - **Coluna 1 (Apresentação)**: Perfil executivo de Stefany Shen, destacando sua história transcultural (nascimento em Taiwan, criação no Paraguai, educação no Chile, residência no Brasil) representada por bandeiras estilizadas, e sua missão comercial.
  - **Coluna 2 (Diferenciais)**: Formato de "post-its" ou cards de brainstorming interativos que reagem ao passar do mouse (hover), apresentando os 4 diferenciais fundamentais (Método Right Brain, Personalização, Experiência Internacional, Atendimento Flexível).

### 2. Seção: Cursos de Mandarim (Obsidian & Mind-Map Style)

Implementar uma visualização que simula a interface do Obsidian.

- **Obsidian Graph View Interativo (SVG + JS)**:
  - Criar um mini-mapa mental interativo no topo da seção dos cursos. O mapa conectará os nós dos cursos (Iniciante -> Básico -> Intermediário -> Avançado) com caminhos secundários (Conversação Comercial, Cursos Especiais).
  - Clicar ou passar o mouse em um nó no gráfico filtrará ou rolará suavemente a tela até o card do respectivo curso, com animações suaves de destaque.
- **Estilo de Cartões de Lição (Markdown Notes)**:
  - Cada curso será representado como uma nota do Obsidian, exibindo cabeçalhos simulando "Frontmatter" (Carga horária, Material, Tags) e um corpo de texto com links no formato `[[Objetivo]]` ou `[[Material]]` para manter a coerência estética do projeto.
  - Botão de CTA proeminente "Inscreva-se já 🚀" em cada curso, abrindo o WhatsApp com mensagem pré-configurada.

### 3. Seção: Serviços de Tradução & Interpretação (Premium Corporativo)

- **Layout e Estética**: Design escuro ultra-clean com detalhes em azul-royal metálico e dourado, transmitindo máxima confiança e credibilidade corporativa.
- **Gráfico de Competências**: Exibição visual do ecossistema de idiomas (Mandarim, Português, Espanhol, Inglês) com badges interativos e fluxos de tradução simultânea.
- **Logotipos de Clientes Reais**: Grid elegante com logos ou representações tipográficas dos clientes atendidos (CNI, HSBC, FIESP, Global Word, Bureau Translations).
- **CTA**: Botão de destaque "Solicite orçamento 📋" com redirecionamento de WhatsApp focado em eventos corporativos.

---

### Componentes de Arquivos

#### [MODIFY] [index.astro](file:///c:/Users/YANG/Antigravity/20260519_falo_chines/src/pages/index.astro)
Substituir as seções atuais pelos novos designs interativos, estruturando o HTML semântico com IDs únicos.

---

## Verification Plan

### Automated Tests
- Executar `npm test` para garantir que as alterações não quebram os utilitários de dicionário e leitores de markdown.
- Executar `npm run build` para validar que o compilador Astro compila todas as rotas estáticas sem erro.

### Manual Verification
- Testar a responsividade do gráfico SVG de cursos em dispositivos móveis e desktops.
- Clicar em todos os links e botões de WhatsApp para confirmar que as mensagens pré-definidas estão codificadas de forma correta e funcional.
