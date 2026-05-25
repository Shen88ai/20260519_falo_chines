export interface DictionaryEntry {
  character: string;
  pinyin: string;
  portuguese: string;
  radical: string;
  strokeCount: number;
  mnemonica?: string;
  audioFilename?: string;
  fase: 'A' | 'B' | 'C' | 'D';
  topic: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  // Fase A entries
  '中': { character: '中', pinyin: 'zhōng', portuguese: 'Centro / Meio / China', radical: '丨', strokeCount: 4, mnemonica: 'Um retângulo atravessado por uma linha vertical exatamente no centro.', fase: 'A', topic: 'cultura' },
  '文': { character: '文', pinyin: 'wén', portuguese: 'Escrita / Idioma / Cultura', radical: '文', strokeCount: 4, mnemonica: 'Uma pessoa de braços abertos mostrando padrões.', fase: 'A', topic: 'cultura' },
  '国': { character: '国', pinyin: 'guó', portuguese: 'País / Nação / Pátria', radical: '囗', strokeCount: 8, mnemonica: 'Jade (玉) guardado dentro de uma fronteira (囗).', fase: 'A', topic: 'cultura' },
  '学': { character: '学', pinyin: 'xué', portuguese: 'Estudar / Aprender / Ciência', radical: '子', strokeCount: 8, mnemonica: 'Garras de conhecimento sobre um filho (子) sob um teto.', fase: 'A', topic: 'educacao' },
  '妈': { character: '妈', pinyin: 'mā', portuguese: 'Mãe', radical: '女', strokeCount: 6, mnemonica: 'Mulher (女) ao lado de um cavalo (马).', fase: 'A', topic: 'familia' },
  '小': { character: '小', pinyin: 'xiǎo', portuguese: 'Pequeno / Menor', radical: '小', strokeCount: 3, mnemonica: 'Três traços como pequenas gotas.', fase: 'A', topic: 'descricao' },
  '儿': { character: '儿', pinyin: 'ér', portuguese: 'Filho / Criança', radical: '儿', strokeCount: 2, mnemonica: 'Perninhas de uma criança.', fase: 'A', topic: 'familia' },
  '好': { character: '好', pinyin: 'hǎo', portuguese: 'Bom / Bem', radical: '女', strokeCount: 6, mnemonica: 'Mulher (女) com criança (子) — ter ambos é bom.', fase: 'A', topic: 'descricao' },
  '大': { character: '大', pinyin: 'dà', portuguese: 'Grande', radical: '大', strokeCount: 3, mnemonica: 'Pessoa de braços abertos.', fase: 'A', topic: 'descricao' },
  '人': { character: '人', pinyin: 'rén', portuguese: 'Pessoa / Humano', radical: '人', strokeCount: 2, fase: 'A', topic: 'social' },
  '你': { character: '你', pinyin: 'nǐ', portuguese: 'Tu / Você', radical: '亻', strokeCount: 7, fase: 'A', topic: 'social' },
  '我': { character: '我', pinyin: 'wǒ', portuguese: 'Eu / Me', radical: '戈', strokeCount: 7, fase: 'A', topic: 'social' },
  '口': { character: '口', pinyin: 'kǒu', portuguese: 'Boca', radical: '口', strokeCount: 3, fase: 'A', topic: 'corpo' },
  '手': { character: '手', pinyin: 'shǒu', portuguese: 'Mão', radical: '手', strokeCount: 4, fase: 'A', topic: 'corpo' },
  '天': { character: '天', pinyin: 'tiān', portuguese: 'Céu / Dia', radical: '大', strokeCount: 4, fase: 'A', topic: 'natureza' },
  '日': { character: '日', pinyin: 'rì', portuguese: 'Sol / Dia', radical: '日', strokeCount: 4, fase: 'A', topic: 'tempo' },
  '上': { character: '上', pinyin: 'shàng', portuguese: 'Acima / Subir', radical: '一', strokeCount: 3, fase: 'A', topic: 'direcao' },
  '下': { character: '下', pinyin: 'xià', portuguese: 'Abaixo / Descer', radical: '一', strokeCount: 3, fase: 'A', topic: 'direcao' },
  '一': { character: '一', pinyin: 'yī', portuguese: 'Um', radical: '一', strokeCount: 1, fase: 'A', topic: 'numeros' },
  '二': { character: '二', pinyin: 'èr', portuguese: 'Dois', radical: '二', strokeCount: 2, fase: 'A', topic: 'numeros' },
  '三': { character: '三', pinyin: 'sān', portuguese: 'Três', radical: '一', strokeCount: 3, fase: 'A', topic: 'numeros' },
  // Fase B entries
  '商': { character: '商', pinyin: 'shāng', portuguese: 'Comércio / Negócios', radical: '口', strokeCount: 11, mnemonica: 'Derivado de um pedestal ritualístico da Dinastia Shang.', fase: 'B', topic: 'negocios' },
  '业': { character: '业', pinyin: 'yè', portuguese: 'Indústria / Profissão', radical: '一', strokeCount: 5, mnemonica: 'Painel de madeira ou ramificações prosperando.', fase: 'B', topic: 'negocios' },
  '水': { character: '水', pinyin: 'shuǐ', portuguese: 'Água', radical: '水', strokeCount: 4, fase: 'B', topic: 'natureza' },
  '火': { character: '火', pinyin: 'huǒ', portuguese: 'Fogo', radical: '火', strokeCount: 4, fase: 'B', topic: 'natureza' },
  '山': { character: '山', pinyin: 'shān', portuguese: 'Montanha', radical: '山', strokeCount: 3, fase: 'B', topic: 'natureza' },
  '月': { character: '月', pinyin: 'yuè', portuguese: 'Lua / Mês', radical: '月', strokeCount: 4, fase: 'B', topic: 'tempo' },
  '金': { character: '金', pinyin: 'jīn', portuguese: 'Ouro / Metal', radical: '金', strokeCount: 8, fase: 'B', topic: 'negocios' },
  // Fase C entries
  '心': { character: '心', pinyin: 'xīn', portuguese: 'Coração / Mente', radical: '心', strokeCount: 4, fase: 'C', topic: 'emocao' },
  '语': { character: '语', pinyin: 'yǔ', portuguese: 'Idioma / Fala', radical: '讠', strokeCount: 9, fase: 'C', topic: 'educacao' },
  '书': { character: '书', pinyin: 'shū', portuguese: 'Livro / Escrever', radical: '一', strokeCount: 4, fase: 'C', topic: 'educacao' },
  '老': { character: '老', pinyin: 'lǎo', portuguese: 'Velho / Antigo / Sempre', radical: '老', strokeCount: 6, fase: 'C', topic: 'social' },
  '师': { character: '师', pinyin: 'shī', portuguese: 'Professor / Mestre', radical: '巾', strokeCount: 6, fase: 'C', topic: 'educacao' },
  // Fase D entries
  '爱': { character: '爱', pinyin: 'ài', portuguese: 'Amor / Gostar', radical: '爫', strokeCount: 10, mnemonica: 'Coração (心) dentro de uma mão amiga sob um teto.', fase: 'D', topic: 'emocao' },
  '家': { character: '家', pinyin: 'jiā', portuguese: 'Casa / Família', radical: '宀', strokeCount: 10, fase: 'D', topic: 'familia' },
  '安': { character: '安', pinyin: 'ān', portuguese: 'Paz / Calmo', radical: '宀', strokeCount: 6, fase: 'D', topic: 'emocao' },
  '乐': { character: '乐', pinyin: 'lè', portuguese: 'Alegria / Feliz', radical: '丿', strokeCount: 5, fase: 'D', topic: 'emocao' },
  '花': { character: '花', pinyin: 'huā', portuguese: 'Flor', radical: '艹', strokeCount: 7, fase: 'D', topic: 'natureza' },
};
