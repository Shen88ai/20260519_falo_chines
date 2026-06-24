export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavCategory {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

export const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'aprender',
    label: 'Aprender',
    icon: '📖',
    items: [
      { label: 'Lições', href: '/licoes', description: 'Aulas estruturadas' },
      { label: 'Traços', href: '/strokes', description: 'Ordem dos traços' },
      { label: 'Glossário', href: '/glossario', description: 'Dicionário visual' },
    ],
  },
  {
    id: 'comunidade',
    label: 'Comunidade',
    icon: '🌐',
    items: [
      { label: 'Blog', href: '/blog', description: 'Artigos e dicas' },
      { label: 'Galeria', href: '/galeria', description: 'Galeria de hanzi' },
      { label: 'Comunidade', href: '/comunidade', description: 'Fórum de alunos' },
    ],
  },
  {
    id: 'servicos',
    label: 'Serviços',
    icon: '💼',
    items: [
      { label: 'Serviços Empresariais', href: '/servicos-empresariais', description: 'Soluções corporativas' },
      { label: 'Imersão Mandarim', href: '/imersao-mandarim', description: 'Programa intensivo' },
      { label: 'Consultoria Negociação', href: '/consultoria-negociacao-chineses', description: 'Negocie com chineses' },
    ],
  },
  {
    id: 'sobre',
    label: 'Sobre',
    icon: 'ℹ️',
    items: [
      { label: 'Sobre Mim', href: '/sobre-mim', description: 'Conheça a história' },
      { label: 'Licenças', href: '/licencas', description: 'Termos de uso' },
    ],
  },
];

export interface NavLayerConfig {
  zIndex: number;
  layer: 'overlay' | 'menu';
}

export function createNavMenuLayer(layer: 'overlay' | 'menu'): NavLayerConfig {
  const zIndices = { overlay: 50, menu: 60 };
  return { zIndex: zIndices[layer], layer };
}

export function getFlatNavItems(): NavItem[] {
  return NAV_CATEGORIES.flatMap(cat => cat.items);
}

export function createNavController() {
  let openDropdown: string | null = null;
  let mobileOpen = false;
  let activePage = '/';

  return {
    getOpenDropdown: () => openDropdown,
    toggleDropdown: (id: string) => {
      openDropdown = openDropdown === id ? null : id;
    },
    closeDropdown: () => {
      openDropdown = null;
    },
    isMobileOpen: () => mobileOpen,
    toggleMobile: () => {
      mobileOpen = !mobileOpen;
    },
    closeMobile: () => {
      mobileOpen = false;
    },
    closeAll: () => {
      openDropdown = null;
      mobileOpen = false;
    },
    setActivePage: (path: string) => {
      activePage = path;
    },
    getActivePage: () => activePage,
    isActive: (href: string) => {
      const clean = (s: string) => s.replace(/\/+$/, '');
      return clean(activePage) === clean(href);
    },
  };
}
