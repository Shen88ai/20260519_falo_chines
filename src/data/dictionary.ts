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
  // 丨 radical
  '旧': { character: '旧', pinyin: 'jiù', portuguese: 'Velho / Antigo', radical: '丨', strokeCount: 5, fase: 'B', topic: 'descricao' },
  '丰': { character: '丰', pinyin: 'fēng', portuguese: 'Abundante / Rico', radical: '丨', strokeCount: 4, fase: 'B', topic: 'descricao' },
  '临': { character: '临', pinyin: 'lín', portuguese: 'Aproximar-se / Diante de', radical: '丨', strokeCount: 9, fase: 'C', topic: 'direcao' },
  '串': { character: '串', pinyin: 'chuàn', portuguese: 'Espeto / Ligar / Unir', radical: '丨', strokeCount: 7, fase: 'D', topic: 'acao' },
  // 文 radical
  '刘': { character: '刘', pinyin: 'liú', portuguese: 'Sobrenome Liu / Matar', radical: '文', strokeCount: 6, fase: 'A', topic: 'social' },
  '斋': { character: '斋', pinyin: 'zhāi', portuguese: 'Estudo / Jejum / Vegetariano', radical: '文', strokeCount: 10, fase: 'D', topic: 'cultura' },
  '斑': { character: '斑', pinyin: 'bān', portuguese: 'Mancha / Pintado', radical: '文', strokeCount: 12, fase: 'D', topic: 'descricao' },
  '斌': { character: '斌', pinyin: 'bīn', portuguese: 'Sobrenome Bin / Culto', radical: '文', strokeCount: 12, fase: 'D', topic: 'social' },
  // 囗 radical
  '回': { character: '回', pinyin: 'huí', portuguese: 'Voltar / Vez / Responder', radical: '囗', strokeCount: 6, fase: 'A', topic: 'direcao' },
  '四': { character: '四', pinyin: 'sì', portuguese: 'Quatro', radical: '囗', strokeCount: 5, fase: 'A', topic: 'numeros' },
  '园': { character: '园', pinyin: 'yuán', portuguese: 'Jardim / Parque', radical: '囗', strokeCount: 7, fase: 'C', topic: 'natureza' },
  '图': { character: '图', pinyin: 'tú', portuguese: 'Mapa / Desenho / Plano', radical: '囗', strokeCount: 8, fase: 'B', topic: 'educacao' },
  // 子 radical
  '孩': { character: '孩', pinyin: 'hái', portuguese: 'Criança / Filho', radical: '子', strokeCount: 9, fase: 'A', topic: 'familia' },
  '字': { character: '字', pinyin: 'zì', portuguese: 'Caractere / Letra / Palavra', radical: '子', strokeCount: 6, fase: 'A', topic: 'educacao' },
  '孙': { character: '孙', pinyin: 'sūn', portuguese: 'Neto / Sobrenome Sun', radical: '子', strokeCount: 6, fase: 'C', topic: 'familia' },
  '仔': { character: '仔', pinyin: 'zǐ', portuguese: 'Jovem / Detalhado / Cuidadoso', radical: '子', strokeCount: 5, fase: 'B', topic: 'descricao' },
  // 女 radical
  '她': { character: '她', pinyin: 'tā', portuguese: 'Ela / Elas', radical: '女', strokeCount: 6, fase: 'A', topic: 'social' },
  '姐': { character: '姐', pinyin: 'jiě', portuguese: 'Irmã mais velha / Senhorita', radical: '女', strokeCount: 8, fase: 'A', topic: 'familia' },
  '妹': { character: '妹', pinyin: 'mèi', portuguese: 'Irmã mais nova', radical: '女', strokeCount: 8, fase: 'A', topic: 'familia' },
  '姓': { character: '姓', pinyin: 'xìng', portuguese: 'Sobrenome / Apelido de família', radical: '女', strokeCount: 8, fase: 'B', topic: 'social' },
  // 小 radical
  '少': { character: '少', pinyin: 'shǎo', portuguese: 'Pouco / Menos / Faltar', radical: '小', strokeCount: 4, fase: 'A', topic: 'numeros' },
  '尖': { character: '尖', pinyin: 'jiān', portuguese: 'Ponta / Aguçado / Afiado', radical: '小', strokeCount: 6, fase: 'C', topic: 'descricao' },
  '尘': { character: '尘', pinyin: 'chén', portuguese: 'Poeira / Pó', radical: '小', strokeCount: 6, fase: 'D', topic: 'natureza' },
  '尚': { character: '尚', pinyin: 'shàng', portuguese: 'Ainda / Contudo / Estimar', radical: '小', strokeCount: 8, fase: 'B', topic: 'tempo' },
  // 儿 radical
  '元': { character: '元', pinyin: 'yuán', portuguese: 'Original / Primeiro / Dólar', radical: '儿', strokeCount: 4, fase: 'A', topic: 'negocios' },
  '先': { character: '先', pinyin: 'xiān', portuguese: 'Antes / Primeiro / Anterior', radical: '儿', strokeCount: 6, fase: 'A', topic: 'tempo' },
  '光': { character: '光', pinyin: 'guāng', portuguese: 'Luz / Brilho / Só', radical: '儿', strokeCount: 6, fase: 'A', topic: 'natureza' },
  '兄': { character: '兄', pinyin: 'xiōng', portuguese: 'Irmão mais velho', radical: '儿', strokeCount: 5, fase: 'B', topic: 'familia' },
  // 大 radical
  '太': { character: '太', pinyin: 'tài', portuguese: 'Muito / Demais / Tão', radical: '大', strokeCount: 4, fase: 'A', topic: 'descricao' },
  '头': { character: '头', pinyin: 'tóu', portuguese: 'Cabeça / Primeiro / Chefe', radical: '大', strokeCount: 5, fase: 'A', topic: 'corpo' },
  '夫': { character: '夫', pinyin: 'fū', portuguese: 'Marido / Homem', radical: '大', strokeCount: 4, fase: 'B', topic: 'familia' },
  '央': { character: '央', pinyin: 'yāng', portuguese: 'Centro / Suplicar', radical: '大', strokeCount: 5, fase: 'B', topic: 'direcao' },
  // 人 radical
  '个': { character: '个', pinyin: 'gè', portuguese: 'Unidade / Individual', radical: '人', strokeCount: 3, fase: 'A', topic: 'numeros' },
  '从': { character: '从', pinyin: 'cóng', portuguese: 'Desde / Seguir / A partir de', radical: '人', strokeCount: 4, fase: 'A', topic: 'direcao' },
  '今': { character: '今', pinyin: 'jīn', portuguese: 'Hoje / Agora / Atual', radical: '人', strokeCount: 4, fase: 'A', topic: 'tempo' },
  '以': { character: '以', pinyin: 'yǐ', portuguese: 'Para / A fim de / Usando', radical: '人', strokeCount: 4, fase: 'A', topic: 'direcao' },
  // 亻 radical
  '他': { character: '他', pinyin: 'tā', portuguese: 'Ele / Outro', radical: '亻', strokeCount: 5, fase: 'A', topic: 'social' },
  '们': { character: '们', pinyin: 'men', portuguese: 'Sufixo de plural', radical: '亻', strokeCount: 5, fase: 'A', topic: 'social' },
  '休': { character: '休', pinyin: 'xiū', portuguese: 'Descansar / Parar', radical: '亻', strokeCount: 6, fase: 'B', topic: 'acao' },
  '体': { character: '体', pinyin: 'tǐ', portuguese: 'Corpo / Forma / Sistema', radical: '亻', strokeCount: 7, fase: 'B', topic: 'corpo' },
  // 戈 radical
  '成': { character: '成', pinyin: 'chéng', portuguese: 'Tornar-se / Bem-sucedido', radical: '戈', strokeCount: 6, fase: 'A', topic: 'acao' },
  '或': { character: '或', pinyin: 'huò', portuguese: 'Ou / Talvez / Alguém', radical: '戈', strokeCount: 8, fase: 'B', topic: 'gramatica' },
  '战': { character: '战', pinyin: 'zhàn', portuguese: 'Guerra / Lutar / Batalha', radical: '戈', strokeCount: 9, fase: 'C', topic: 'social' },
  '戏': { character: '戏', pinyin: 'xì', portuguese: 'Jogar / Drama / Teatro', radical: '戈', strokeCount: 6, fase: 'C', topic: 'cultura' },
  // 口 radical
  '吃': { character: '吃', pinyin: 'chī', portuguese: 'Comer / Consumir', radical: '口', strokeCount: 6, fase: 'A', topic: 'comida' },
  '喝': { character: '喝', pinyin: 'hē', portuguese: 'Beber', radical: '口', strokeCount: 12, fase: 'A', topic: 'comida' },
  '叫': { character: '叫', pinyin: 'jiào', portuguese: 'Chamar / Gritar / Ordenar', radical: '口', strokeCount: 5, fase: 'A', topic: 'acao' },
  '吗': { character: '吗', pinyin: 'ma', portuguese: 'Partícula interrogativa', radical: '口', strokeCount: 6, fase: 'A', topic: 'gramatica' },
  // 手 radical
  '拿': { character: '拿', pinyin: 'ná', portuguese: 'Pegar / Agarrar / Levar', radical: '手', strokeCount: 10, fase: 'A', topic: 'acao' },
  '打': { character: '打', pinyin: 'dǎ', portuguese: 'Bater / Fazer / Jogar', radical: '手', strokeCount: 5, fase: 'A', topic: 'acao' },
  '找': { character: '找', pinyin: 'zhǎo', portuguese: 'Procurar / Dar troco', radical: '手', strokeCount: 7, fase: 'A', topic: 'acao' },
  '拜': { character: '拜', pinyin: 'bài', portuguese: 'Reverenciar / Visitar', radical: '手', strokeCount: 9, fase: 'C', topic: 'cultura' },
  // 日 radical
  '明': { character: '明', pinyin: 'míng', portuguese: 'Brilhante / Claro / Amanhã', radical: '日', strokeCount: 8, fase: 'A', topic: 'tempo' },
  '时': { character: '时', pinyin: 'shí', portuguese: 'Tempo / Hora / Época', radical: '日', strokeCount: 7, fase: 'A', topic: 'tempo' },
  '早': { character: '早', pinyin: 'zǎo', portuguese: 'Cedo / Bom dia', radical: '日', strokeCount: 6, fase: 'A', topic: 'tempo' },
  '星': { character: '星', pinyin: 'xīng', portuguese: 'Estrela / Planeta', radical: '日', strokeCount: 9, fase: 'A', topic: 'natureza' },
  // 二 radical
  '云': { character: '云', pinyin: 'yún', portuguese: 'Nuvem / Dizer', radical: '二', strokeCount: 4, fase: 'B', topic: 'natureza' },
  '五': { character: '五', pinyin: 'wǔ', portuguese: 'Cinco', radical: '二', strokeCount: 4, fase: 'A', topic: 'numeros' },
  '些': { character: '些', pinyin: 'xiē', portuguese: 'Alguns / Poucos', radical: '二', strokeCount: 8, fase: 'A', topic: 'numeros' },
  '井': { character: '井', pinyin: 'jǐng', portuguese: 'Poço / Ordenado', radical: '二', strokeCount: 4, fase: 'C', topic: 'natureza' },
  // 水 radical
  '冰': { character: '冰', pinyin: 'bīng', portuguese: 'Gelo / Gelado', radical: '水', strokeCount: 6, fase: 'B', topic: 'natureza' },
  '永': { character: '永', pinyin: 'yǒng', portuguese: 'Eterno / Para sempre', radical: '水', strokeCount: 5, fase: 'C', topic: 'tempo' },
  '泉': { character: '泉', pinyin: 'quán', portuguese: 'Fonte / Nascente', radical: '水', strokeCount: 9, fase: 'D', topic: 'natureza' },
  '汞': { character: '汞', pinyin: 'gǒng', portuguese: 'Mercúrio (metal)', radical: '水', strokeCount: 7, fase: 'D', topic: 'natureza' },
  // 火 radical
  '灯': { character: '灯', pinyin: 'dēng', portuguese: 'Lâmpada / Luz', radical: '火', strokeCount: 6, fase: 'B', topic: 'objetos' },
  '炒': { character: '炒', pinyin: 'chǎo', portuguese: 'Fritar / Refogar', radical: '火', strokeCount: 8, fase: 'C', topic: 'comida' },
  '烧': { character: '烧', pinyin: 'shāo', portuguese: 'Queimar / Cozinhar / Assar', radical: '火', strokeCount: 10, fase: 'C', topic: 'comida' },
  '烟': { character: '烟', pinyin: 'yān', portuguese: 'Fumaça / Cigarro', radical: '火', strokeCount: 10, fase: 'B', topic: 'natureza' },
  // 山 radical
  '岁': { character: '岁', pinyin: 'suì', portuguese: 'Idade / Ano (idade)', radical: '山', strokeCount: 6, fase: 'A', topic: 'tempo' },
  '岛': { character: '岛', pinyin: 'dǎo', portuguese: 'Ilha', radical: '山', strokeCount: 7, fase: 'C', topic: 'natureza' },
  '岸': { character: '岸', pinyin: 'àn', portuguese: 'Costa / Margem / Praia', radical: '山', strokeCount: 8, fase: 'C', topic: 'natureza' },
  '峰': { character: '峰', pinyin: 'fēng', portuguese: 'Pico / Montanha / Topo', radical: '山', strokeCount: 10, fase: 'D', topic: 'natureza' },
  // 月 radical
  '有': { character: '有', pinyin: 'yǒu', portuguese: 'Ter / Possuir / Existir', radical: '月', strokeCount: 6, fase: 'A', topic: 'gramatica' },
  '朋': { character: '朋', pinyin: 'péng', portuguese: 'Amigo / Companheiro', radical: '月', strokeCount: 8, fase: 'A', topic: 'social' },
  '期': { character: '期', pinyin: 'qī', portuguese: 'Período / Tempo / Prazo', radical: '月', strokeCount: 12, fase: 'B', topic: 'tempo' },
  '朗': { character: '朗', pinyin: 'lǎng', portuguese: 'Claro / Sonoro', radical: '月', strokeCount: 10, fase: 'D', topic: 'descricao' },
  // 金 radical
  '银': { character: '银', pinyin: 'yín', portuguese: 'Prata / Dinheiro', radical: '金', strokeCount: 11, fase: 'B', topic: 'negocios' },
  '铁': { character: '铁', pinyin: 'tiě', portuguese: 'Ferro / Metal', radical: '金', strokeCount: 10, fase: 'C', topic: 'objetos' },
  '铜': { character: '铜', pinyin: 'tóng', portuguese: 'Cobre / Bronze', radical: '金', strokeCount: 11, fase: 'D', topic: 'objetos' },
  '针': { character: '针', pinyin: 'zhēn', portuguese: 'Agulha / Injeção', radical: '金', strokeCount: 7, fase: 'C', topic: 'objetos' },
  // 心 radical
  '想': { character: '想', pinyin: 'xiǎng', portuguese: 'Pensar / Querer / Desejar', radical: '心', strokeCount: 13, fase: 'A', topic: 'emocao' },
  '思': { character: '思', pinyin: 'sī', portuguese: 'Pensar / Refletir', radical: '心', strokeCount: 9, fase: 'B', topic: 'emocao' },
  '意': { character: '意', pinyin: 'yì', portuguese: 'Significado / Intenção', radical: '心', strokeCount: 13, fase: 'B', topic: 'educacao' },
  '念': { character: '念', pinyin: 'niàn', portuguese: 'Ler em voz alta / Pensar', radical: '心', strokeCount: 8, fase: 'B', topic: 'educacao' },
  // 讠 radical
  '说': { character: '说', pinyin: 'shuō', portuguese: 'Falar / Dizer / Explicar', radical: '讠', strokeCount: 9, fase: 'A', topic: 'acao' },
  '话': { character: '话', pinyin: 'huà', portuguese: 'Fala / Palavra / Discurso', radical: '讠', strokeCount: 8, fase: 'A', topic: 'social' },
  '请': { character: '请', pinyin: 'qǐng', portuguese: 'Convidar / Por favor', radical: '讠', strokeCount: 10, fase: 'A', topic: 'social' },
  '谢': { character: '谢', pinyin: 'xiè', portuguese: 'Agradecer / Obrigado', radical: '讠', strokeCount: 12, fase: 'A', topic: 'social' },
  // 老 radical
  '考': { character: '考', pinyin: 'kǎo', portuguese: 'Exame / Prova / Testar', radical: '老', strokeCount: 6, fase: 'B', topic: 'educacao' },
  '者': { character: '者', pinyin: 'zhě', portuguese: 'Aquele que / Partícula', radical: '老', strokeCount: 8, fase: 'B', topic: 'gramatica' },
  '姥': { character: '姥', pinyin: 'lǎo', portuguese: 'Avó materna', radical: '老', strokeCount: 9, fase: 'D', topic: 'familia' },
  '佬': { character: '佬', pinyin: 'lǎo', portuguese: 'Rapaz / Pessoa (sufixo)', radical: '老', strokeCount: 8, fase: 'D', topic: 'social' },
  // 巾 radical
  '布': { character: '布', pinyin: 'bù', portuguese: 'Pano / Tecido / Espalhar', radical: '巾', strokeCount: 5, fase: 'B', topic: 'objetos' },
  '市': { character: '市', pinyin: 'shì', portuguese: 'Cidade / Mercado', radical: '巾', strokeCount: 5, fase: 'A', topic: 'social' },
  '带': { character: '带', pinyin: 'dài', portuguese: 'Trazer / Levar / Cinta', radical: '巾', strokeCount: 9, fase: 'A', topic: 'acao' },
  '常': { character: '常', pinyin: 'cháng', portuguese: 'Sempre / Freqüente / Comum', radical: '巾', strokeCount: 11, fase: 'A', topic: 'tempo' },
  // 爫 radical
  '采': { character: '采', pinyin: 'cǎi', portuguese: 'Colher / Coletar', radical: '爫', strokeCount: 8, fase: 'C', topic: 'acao' },
  '受': { character: '受', pinyin: 'shòu', portuguese: 'Receber / Aceitar / Sofrer', radical: '爫', strokeCount: 8, fase: 'B', topic: 'acao' },
  '乳': { character: '乳', pinyin: 'rǔ', portuguese: 'Leite / Mama', radical: '爫', strokeCount: 8, fase: 'D', topic: 'corpo' },
  '觅': { character: '觅', pinyin: 'mì', portuguese: 'Procurar / Buscar', radical: '爫', strokeCount: 8, fase: 'D', topic: 'acao' },
  // 宀 radical
  '定': { character: '定', pinyin: 'dìng', portuguese: 'Fixo / Decidir / Certamente', radical: '宀', strokeCount: 8, fase: 'A', topic: 'acao' },
  '完': { character: '完', pinyin: 'wán', portuguese: 'Completo / Terminar', radical: '宀', strokeCount: 7, fase: 'A', topic: 'acao' },
  '室': { character: '室', pinyin: 'shì', portuguese: 'Quarto / Sala', radical: '宀', strokeCount: 9, fase: 'B', topic: 'objetos' },
  '客': { character: '客', pinyin: 'kè', portuguese: 'Convidado / Cliente / Hóspede', radical: '宀', strokeCount: 9, fase: 'A', topic: 'social' },
  // 丿 radical
  '久': { character: '久', pinyin: 'jiǔ', portuguese: 'Muito tempo / Longo / Durar', radical: '丿', strokeCount: 3, fase: 'B', topic: 'tempo' },
  '乎': { character: '乎', pinyin: 'hū', portuguese: 'Partícula / Em / Sufixo', radical: '丿', strokeCount: 5, fase: 'C', topic: 'gramatica' },
  '乏': { character: '乏', pinyin: 'fá', portuguese: 'Faltar / Cansado / Pobre', radical: '丿', strokeCount: 5, fase: 'D', topic: 'descricao' },
  '乖': { character: '乖', pinyin: 'guāi', portuguese: 'Comportado / Obediente', radical: '丿', strokeCount: 8, fase: 'D', topic: 'descricao' },
  // 艹 radical
  '草': { character: '草', pinyin: 'cǎo', portuguese: 'Grama / Erva / Relvado', radical: '艹', strokeCount: 9, fase: 'B', topic: 'natureza' },
  '茶': { character: '茶', pinyin: 'chá', portuguese: 'Chá', radical: '艹', strokeCount: 9, fase: 'A', topic: 'comida' },
  '药': { character: '药', pinyin: 'yào', portuguese: 'Remédio / Medicamento', radical: '艹', strokeCount: 9, fase: 'B', topic: 'corpo' },
  '英': { character: '英', pinyin: 'yīng', portuguese: 'Herói / Inglaterra / Pétala', radical: '艹', strokeCount: 8, fase: 'B', topic: 'social' },
};
