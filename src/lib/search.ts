import Fuse from 'fuse.js';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  content: string;
  phase: string;
  tags: string[];
  slug: string;
}

export interface SearchResult {
  title: string;
  description: string;
  slug: string;
  phase: string;
}

const options: Fuse.IFuseOptions<SearchItem> = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'content', weight: 0.5 },
    { name: 'tags', weight: 1.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 1,
};

export function createSearchIndex(items: SearchItem[]): Fuse<SearchItem> {
  return new Fuse(items, options);
}

export function searchItems(
  fuse: Fuse<SearchItem>,
  query: string,
  limit: number = 5,
): SearchResult[] {
  const trimmed = query.trim();
  const hasCJK = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(trimmed);
  if (!trimmed || (!hasCJK && trimmed.length < 2)) return [];
  return fuse.search(trimmed).slice(0, limit).map(r => ({
    title: r.item.title,
    description: r.item.description,
    slug: r.item.slug,
    phase: r.item.phase,
  }));
}
