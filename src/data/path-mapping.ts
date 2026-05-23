export interface Checkpoint {
  slug: string;
  title: string;
  eta: string;
  difficulty: number;
  strategy: string;
}

export interface PathDetail {
  name: string;
  checkpoints: number;
  hours: number;
  icon: string;
  description: string;
}

export const pathConfigs: Record<string, Checkpoint[]> = {
  A: [
    {
      slug: '01-tons-primordiais',
      title: 'Os Quatro Tons Primordiais',
      eta: '25min',
      difficulty: 2,
      strategy: '👔 Foco Profissional: A entonação correta em reuniões de negócios evita ruídos de comunicação cruciais.'
    },
    {
      slug: '02-pinyin-iniciais',
      title: 'Iniciais & Finais do Pinyin',
      eta: '30min',
      difficulty: 3,
      strategy: '🎙️ Pronúncia Executiva: Treine os fonemas "j, q, x" que confundem investidores ocidentais.'
    },
    {
      slug: '03-radicais-fundamentais',
      title: 'Radicais e Estrutura dos Ideogramas',
      eta: '20min',
      difficulty: 3,
      strategy: '🔍 Análise Visual: Conhecer os radicais ajuda a decifrar cardápios de almoços de negócios e contratos.'
    },
    {
      slug: '04-sintaxe-basica',
      title: 'Sintaxe e Estrutura de Sentenças',
      eta: '25min',
      difficulty: 2,
      strategy: '📊 Clareza Executiva: Use a ordem SVO simples para expor relatórios e apresentar propostas comerciais.'
    },
    {
      slug: '05-hsk-negocios',
      title: 'Etiqueta de Negócios e HSK',
      eta: '35min',
      difficulty: 4,
      strategy: '💼 Trato Comercial: Aprenda a trocar cartões de visita com as duas mãos e saudações hierárquicas formais.'
    },
    {
      slug: '06-mae-chinesa-fluencia',
      title: 'O Método da "Mãe Chinesa"',
      eta: '30min',
      difficulty: 1,
      strategy: '👩‍👦 O Segredo do Input: Entenda como a imersão afetiva e a escuta ativa aceleram drasticamente sua fluência real.'
    },
    {
      slug: '07-crianca-interior-fluencia',
      title: 'A Criança de 5 Anos em Você',
      eta: '35min',
      difficulty: 2,
      strategy: '🎈 Psicologia da Fala: Vença a autossabotagem e o medo de errar com técnicas de dramatização lúdica e IA.'
    }
  ],
  B: [
    {
      slug: '01-tons-primordiais',
      title: 'Os Quatro Tons Primordiais',
      eta: '25min',
      difficulty: 1,
      strategy: '✈️ Sobrevivência Rápida: Foque nos tons de cortesia e agradecimento para usar na alfândega e hotéis.'
    },
    {
      slug: '02-pinyin-iniciais',
      title: 'Iniciais & Finais do Pinyin',
      eta: '20min',
      difficulty: 2,
      strategy: '🗺️ Leitura de Placas: Domine a fonética básica para pronunciar nomes de estações de metrô e pontos turísticos.'
    },
    {
      slug: '04-sintaxe-basica',
      title: 'Sintaxe e Estrutura de Sentenças',
      eta: '25min',
      difficulty: 2,
      strategy: '🛒 Compras & Pedidos: Aprenda a perguntar "Quanto custa?" e pedir comida sem passar apuros.'
    },
    {
      slug: '06-mae-chinesa-fluencia',
      title: 'O Método da "Mãe Chinesa"',
      eta: '30min',
      difficulty: 1,
      strategy: '👩‍👦 O Segredo do Input: Entenda como a imersão afetiva e a escuta ativa aceleram drasticamente sua fluência real.'
    },
    {
      slug: '07-crianca-interior-fluencia',
      title: 'A Criança de 5 Anos em Você',
      eta: '35min',
      difficulty: 2,
      strategy: '🎈 Psicologia da Fala: Vença a autossabotagem e o medo de errar com técnicas de dramatização lúdica e IA.'
    }
  ],
  C: [
    {
      slug: '01-tons-primordiais',
      title: 'Os Quatro Tons Primordiais',
      eta: '25min',
      difficulty: 2,
      strategy: '🎓 Rigor Acadêmico: A precisão tonal é essencial para discussões intelectuais e exames de proficiência.'
    },
    {
      slug: '02-pinyin-iniciais',
      title: 'Iniciais & Finais do Pinyin',
      eta: '30min',
      difficulty: 3,
      strategy: '📚 Fonética Avançada: Estude a transcrição sistemática para compreender teses linguísticas.'
    },
    {
      slug: '03-radicais-fundamentais',
      title: 'Radicais e Estrutura dos Ideogramas',
      eta: '35min',
      difficulty: 4,
      strategy: '✍️ Escrita Literária: Pratique a ordem correta dos traços para desenvolver caligrafia esteticamente perfeita.'
    },
    {
      slug: '04-sintaxe-basica',
      title: 'Sintaxe e Estrutura de Sentenças',
      eta: '30min',
      difficulty: 3,
      strategy: '📝 Composição Sintática: Analise as partículas gramaticais estruturais "de" (的, 得, 地) e conectivos.'
    },
    {
      slug: '06-mae-chinesa-fluencia',
      title: 'O Método da "Mãe Chinesa"',
      eta: '30min',
      difficulty: 1,
      strategy: '👩‍👦 O Segredo do Input: Entenda como a imersão afetiva e a escuta ativa aceleram drasticamente sua fluência real.'
    },
    {
      slug: '07-crianca-interior-fluencia',
      title: 'A Criança de 5 Anos em Você',
      eta: '35min',
      difficulty: 2,
      strategy: '🎈 Psicologia da Fala: Vença a autossabotagem e o medo de errar com técnicas de dramatização lúdica e IA.'
    }
  ],
  D: [
    {
      slug: '01-tons-primordiais',
      title: 'Os Quatro Tons Primordiais',
      eta: '25min',
      difficulty: 2,
      strategy: '🎭 Musicalidade Cultural: Sinta os tons como a melodia da poesia tradicional chinesa.'
    },
    {
      slug: '03-radicais-fundamentais',
      title: 'Radicais e Estrutura dos Ideogramas',
      eta: '30min',
      difficulty: 3,
      strategy: '🎨 Arte Hanzi: Explore a evolução pictográfica desde os ossos oraculares até os caracteres simplificados.'
    },
    {
      slug: '04-sintaxe-basica',
      title: 'Sintaxe e Estrutura de Sentenças',
      eta: '25min',
      difficulty: 2,
      strategy: '💬 Conexão Social: Expresse seus sentimentos e compreenda nuances culturais em séries (C-dramas) e músicas.'
    },
    {
      slug: '06-mae-chinesa-fluencia',
      title: 'O Método da "Mãe Chinesa"',
      eta: '30min',
      difficulty: 1,
      strategy: '👩‍👦 O Segredo do Input: Entenda como a imersão afetiva e a escuta ativa aceleram drasticamente sua fluência real.'
    },
    {
      slug: '07-crianca-interior-fluencia',
      title: 'A Criança de 5 Anos em Você',
      eta: '35min',
      difficulty: 2,
      strategy: '🎈 Psicologia da Fala: Vença a autossabotagem e o medo de errar com técnicas de dramatização lúdica e IA.'
    }
  ]
};

export const pathInfo: Record<string, PathDetail> = {
  A: {
    name: '👔 Rota do Executivo (Negócios & HSK)',
    checkpoints: 7,
    hours: 3.5,
    icon: '💼',
    description: 'Desenvolvida especialmente para profissionais que buscam networking, comércio internacional, expansão corporativa e certificações formais HSK. Foco em precisão fonética e etiqueta corporativa.'
  },
  B: {
    name: '✈️ Rota do Viajante Rápido (Turismo & Sobrevivência)',
    checkpoints: 5,
    hours: 2.5,
    icon: '🗺️',
    description: 'Para quem tem pressa e quer viajar ou morar temporariamente na China. Foco máximo em frases práticas de sobrevivência, pedir direções, fazer compras, ler placas de trânsito e se socializar de forma leve.'
  },
  C: {
    name: '🎓 Rota do Acadêmico (Linguística & Escrita Completa)',
    checkpoints: 6,
    hours: 3.0,
    icon: '📚',
    description: 'Para entusiastas de estudos linguísticos, caligrafia tradicional, exames de proficiência elevados e leitura de artigos originais. Foco pesado na ordem dos traços, radicais e análise sintática rigorosa.'
  },
  D: {
    name: '🎭 Rota do Entusiasta Cultural (Hobbie & Imersão)',
    checkpoints: 5,
    hours: 2.3,
    icon: '🎨',
    description: 'Feita sob medida para amantes da cultura pop (C-Dramas, Donghua), artes tradicionais (chá, caligrafia, culinária), e pessoas que buscam aprender mandarim como um hobbie enriquecedor e prazeroso.'
  }
};
