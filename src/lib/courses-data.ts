export interface Course {
  id: string;
  title: string;
  hours: string;
  material: string;
  objective: string;
}

export interface SpecialCourse {
  title: string;
  hours: string;
  description: string;
}

export interface TranslationService {
  title: string;
  types: string;
  languages: string[];
  clients: string[];
}

export interface Biography {
  name: string;
  origin: string;
  raised: string;
  educated: string;
  resides: string;
  languages: string;
  mission: string;
}

export const CONTACT_PHONE = '551196990939';

export const courses: Course[] = [
  {
    id: 'iniciante',
    title: 'Iniciante – Sobrevivência 100',
    hours: '30h',
    material: '100 caracteres essenciais',
    objective: 'Aprender vocabulário de sobrevivência para viagens, primeiros contatos e negócios iniciais.'
  },
  {
    id: 'basico',
    title: 'Básico – Falo Chinês 300',
    hours: '30h',
    material: '300 caracteres',
    objective: 'Ler, escrever e digitar em chinês; simulações práticas em situações do dia a dia.'
  },
  {
    id: 'intermediario',
    title: 'Intermediário I & II – Falo Chinês 500',
    hours: '30h cada módulo',
    material: '500 caracteres e 1.000 frases curtas',
    objective: 'Comunicação fluente em entrevistas, redações, e-mails e vida acadêmica.'
  },
  {
    id: 'avancado',
    title: 'Avançado I–IV – Falo Chinês 1000',
    hours: '30h cada módulo',
    material: '1.000 caracteres e gramática avançada',
    objective: 'Ler jornais, revistas e literatura chinesa; expressão espontânea e autônoma.'
  },
  {
    id: 'comercial',
    title: 'Conversação Comercial',
    hours: '30h',
    material: 'Customizado para negócios',
    objective: 'Fluência em negociações, vocabulário técnico e etiqueta empresarial.'
  }
];

export const specialCourses: SpecialCourse[] = [
  {
    title: 'Cultura, Filosofia e Literatura',
    hours: '8h',
    description: 'mitos, lendas e sabedoria ancestral.'
  },
  {
    title: 'Etiqueta Social',
    hours: '8h',
    description: 'convivência, namoro, casamento e costumes chineses.'
  },
  {
    title: 'Treinamento de Professores',
    hours: '8h',
    description: 'formação em método Right Brain Chinese.'
  },
  {
    title: 'Mandarim para Empresas',
    hours: '30h',
    description: 'curso corporativo para empresários e funcionários que trabalham com parceiros chineses.'
  }
];

export const translationService: TranslationService = {
  title: 'Serviços de Tradução & Interpretação',
  types: 'Tradução simultânea e consecutiva para eventos, seminários e congressos.',
  languages: ['Mandarim', 'Português', 'Espanhol', 'Inglês'],
  clients: ['CNI', 'HSBC', 'FIESP', 'Global Word', 'Bureau Translations']
};

export const stefanyShen: Biography = {
  name: 'Stefany Shen',
  origin: 'Taiwan',
  raised: 'Paraguai',
  educated: 'Chile',
  resides: 'Brasil',
  languages: 'quatro idiomas',
  mission: 'aproximar culturas e facilitar negócios entre Brasil e Ásia'
};

export const differentials: string[] = [
  'Método exclusivo Right Brain Chinese',
  'Cursos práticos e customizados',
  'Experiência internacional em ensino e tradução',
  'Atendimento virtualmente para pessoas físicas e empresas'
];

export function getWhatsAppEnrollUrl(courseTitle: string): string {
  const message = `Olá! Gostaria de me inscrever no curso: ${courseTitle}.`;
  return `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppQuoteUrl(serviceType: string): string {
  const message = `Olá! Gostaria de solicitar um orçamento para o serviço de: ${serviceType}.`;
  return `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(message)}`;
}
