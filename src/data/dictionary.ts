export interface DictionaryEntry {
  character: string;      // Caractere chinês (Hanzi)
  pinyin: string;         // Pronúncia Pinyin com acento tonal
  portuguese: string;     // Significado traduzido para o Português
  radical: string;        // Radical estrutural básico
  strokeCount: number;    // Número total de traços do caractere
  mnemonica?: string;     // Frase mnemônica para auxiliar a memorização visual
  audioFilename?: string; // Caminho para arquivo de áudio de referência de tom
}

export const dictionary: Record<string, DictionaryEntry> = {
  '中': {
    character: '中',
    pinyin: 'zhōng',
    portuguese: 'Centro / Meio / China',
    radical: '丨 (linha vertical)',
    strokeCount: 4,
    mnemonica: 'Um retângulo atravessado por uma linha vertical exatamente no centro.',
    audioFilename: 'zhong.mp3'
  },
  '文': {
    character: '文',
    pinyin: 'wén',
    portuguese: 'Escrita / Idioma / Cultura',
    radical: '文 (escrita)',
    strokeCount: 4,
    mnemonica: 'Uma pessoa de braços abertos mostrando padrões ou tatuagens no peito.',
    audioFilename: 'wen.mp3'
  },
  '商': {
    character: '商',
    pinyin: 'shāng',
    portuguese: 'Comércio / Negócios',
    radical: '口 (boca)',
    strokeCount: 11,
    mnemonica: 'Historicamente derivado de um pedestal ritualístico associado à Dinastia Shang.',
    audioFilename: 'shang.mp3'
  },
  '业': {
    character: '业',
    pinyin: 'yè',
    portuguese: 'Indústria / Profissão / Negócio',
    radical: '一 (horizontal)',
    strokeCount: 5,
    mnemonica: 'Representação de um painel de madeira ou ramificações de árvores prosperando.',
    audioFilename: 'ye.mp3'
  },
  '国': {
    character: '国',
    pinyin: 'guó',
    portuguese: 'País / Nação / Pátria',
    radical: '囗 (fronteira)',
    strokeCount: 8,
    mnemonica: 'Um pedaço de jade (玉) guardado em segurança dentro de uma grande fronteira (囗).',
    audioFilename: 'guo.mp3'
  },
  '学': {
    character: '学',
    pinyin: 'xué',
    portuguese: 'Estudar / Aprender / Ciência',
    radical: '子 (filho)',
    strokeCount: 8,
    mnemonica: 'Garras de conhecimento derramando luz em cima de um filho (子) sob um teto.',
    audioFilename: 'xue.mp3'
  },
  '妈': {
    character: '妈',
    pinyin: 'mā',
    portuguese: 'Mãe',
    radical: '女 (mulher)',
    strokeCount: 6,
    mnemonica: 'Uma mulher (女) ao lado de um cavalo (马) que soa parecido (ma) para representar a palavra Mãe.',
    audioFilename: 'ma.mp3'
  },
  '小': {
    character: '小',
    pinyin: 'xiǎo',
    portuguese: 'Pequeno / Menor',
    radical: '小 (pequeno)',
    strokeCount: 3,
    mnemonica: 'Três traços representando pequenas gotas caindo ou algo pequeno dividido em partes.',
    audioFilename: 'xiao.mp3'
  },
  '儿': {
    character: '儿',
    pinyin: 'ér',
    portuguese: 'Filho / Criança',
    radical: '儿 (pernas de pessoa / criança)',
    strokeCount: 2,
    mnemonica: 'Representação pictográfica simplificada de um bebê ou perninhas de uma criança pequena andando.',
    audioFilename: 'er.mp3'
  }
};
