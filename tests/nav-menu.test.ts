import { describe, it, expect, beforeEach } from 'vitest';
import {
  NAV_CATEGORIES,
  getFlatNavItems,
  createNavController,
  createNavMenuLayer,
  type NavCategory,
} from '../src/lib/nav-menu';

describe('nav-menu data structure', () => {
  it('has exactly 4 categories', () => {
    expect(NAV_CATEGORIES).toHaveLength(4);
  });

  it('each category has a label, icon and items array', () => {
    for (const cat of NAV_CATEGORIES) {
      expect(cat.label).toBeTypeOf('string');
      expect(cat.icon).toBeTypeOf('string');
      expect(Array.isArray(cat.items)).toBe(true);
      expect(cat.items.length).toBeGreaterThan(0);
    }
  });

  it('each item has label, href, and optional description', () => {
    for (const cat of NAV_CATEGORIES) {
      for (const item of cat.items) {
        expect(item.label).toBeTypeOf('string');
        expect(item.href).toBeTypeOf('string');
        expect(item.href).toMatch(/^\//);
      }
    }
  });

  it('getFlatNavItems returns all items flattened', () => {
    const flat = getFlatNavItems();
    const allItems = NAV_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
    expect(flat).toHaveLength(allItems);
  });
});

describe('nav-menu categories content', () => {
  it('Aprender category contains Lições, Traços, Glossário', () => {
    const aprender = NAV_CATEGORIES.find(c => c.id === 'aprender')!;
    expect(aprender).toBeDefined();
    const labels = aprender.items.map(i => i.label);
    expect(labels).toContain('Lições');
    expect(labels).toContain('Traços');
    expect(labels).toContain('Glossário');
  });

  it('Comunidade category contains Blog, Galeria, Comunidade', () => {
    const comunidade = NAV_CATEGORIES.find(c => c.id === 'comunidade')!;
    expect(comunidade).toBeDefined();
    const labels = comunidade.items.map(i => i.label);
    expect(labels).toContain('Blog');
    expect(labels).toContain('Galeria');
    expect(labels).toContain('Comunidade');
  });

  it('Serviços category contains Serviços Empresariais, Imersão Mandarim', () => {
    const servicos = NAV_CATEGORIES.find(c => c.id === 'servicos')!;
    expect(servicos).toBeDefined();
    const labels = servicos.items.map(i => i.label);
    expect(labels).toContain('Serviços Empresariais');
    expect(labels).toContain('Imersão Mandarim');
  });

  it('Sobre category contains Sobre Mim, Licenças', () => {
    const sobre = NAV_CATEGORIES.find(c => c.id === 'sobre')!;
    expect(sobre).toBeDefined();
    const labels = sobre.items.map(i => i.label);
    expect(labels).toContain('Sobre Mim');
    expect(labels).toContain('Licenças');
  });

  it('all hrefs point to existing routes', () => {
    const validPaths = [
      '/licoes', '/licoes/', '/strokes', '/glossario',
      '/blog', '/galeria', '/comunidade',
      '/servicos-empresariais', '/imersao-mandarim',
      '/sobre-mim', '/licencas',
    ];
    for (const item of getFlatNavItems()) {
      const path = item.href.replace(/\/$/, '');
      expect(validPaths).toContain(path);
    }
  });
});

describe('nav-menu z-index layering', () => {
  it('mobile overlay z-index exceeds header z-40', () => {
    const overlay = createNavMenuLayer('overlay');
    expect(overlay.zIndex).toBeGreaterThan(40);
  });

  it('mobile menu z-index exceeds header z-40', () => {
    const menu = createNavMenuLayer('menu');
    expect(menu.zIndex).toBeGreaterThan(40);
  });

  it('mobile menu z-index is above overlay', () => {
    const overlay = createNavMenuLayer('overlay');
    const menu = createNavMenuLayer('menu');
    expect(menu.zIndex).toBeGreaterThan(overlay.zIndex);
  });
});

describe('nav-menu controller', () => {
  let controller: ReturnType<typeof createNavController>;

  beforeEach(() => {
    controller = createNavController();
  });

  it('starts with no dropdown open', () => {
    expect(controller.getOpenDropdown()).toBeNull();
  });

  it('starts with mobile menu closed', () => {
    expect(controller.isMobileOpen()).toBe(false);
  });

  it('toggleDropdown opens and closes the same dropdown', () => {
    controller.toggleDropdown('aprender');
    expect(controller.getOpenDropdown()).toBe('aprender');

    controller.toggleDropdown('aprender');
    expect(controller.getOpenDropdown()).toBeNull();
  });

  it('toggleDropdown switches between different dropdowns', () => {
    controller.toggleDropdown('aprender');
    expect(controller.getOpenDropdown()).toBe('aprender');

    controller.toggleDropdown('comunidade');
    expect(controller.getOpenDropdown()).toBe('comunidade');
  });

  it('closeDropdown closes the current dropdown', () => {
    controller.toggleDropdown('servicos');
    expect(controller.getOpenDropdown()).toBe('servicos');

    controller.closeDropdown();
    expect(controller.getOpenDropdown()).toBeNull();
  });

  it('closeDropdown is safe when no dropdown is open', () => {
    expect(() => controller.closeDropdown()).not.toThrow();
  });

  it('toggleMobile toggles mobile menu', () => {
    expect(controller.isMobileOpen()).toBe(false);

    controller.toggleMobile();
    expect(controller.isMobileOpen()).toBe(true);

    controller.toggleMobile();
    expect(controller.isMobileOpen()).toBe(false);
  });

  it('closeMobile closes mobile menu', () => {
    controller.toggleMobile();
    expect(controller.isMobileOpen()).toBe(true);

    controller.closeMobile();
    expect(controller.isMobileOpen()).toBe(false);
  });

  it('closeAll closes both dropdown and mobile', () => {
    controller.toggleDropdown('aprender');
    controller.toggleMobile();
    controller.closeAll();
    expect(controller.getOpenDropdown()).toBeNull();
    expect(controller.isMobileOpen()).toBe(false);
  });

  it('setActivePage marks the correct item as active', () => {
    controller.setActivePage('/licoes');
    expect(controller.getActivePage()).toBe('/licoes');
  });

  it('isActive returns true for matching page', () => {
    controller.setActivePage('/licoes');
    expect(controller.isActive('/licoes')).toBe(true);
    expect(controller.isActive('/glossario')).toBe(false);
  });

  it('isActive matches with or without trailing slash', () => {
    controller.setActivePage('/licoes/');
    expect(controller.isActive('/licoes')).toBe(true);
  });
});
