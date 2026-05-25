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

export function renderSearchResults(
  results: SearchResult[],
  getPhaseLabel: (phase: string) => string,
  getPhaseColor: (phase: string) => string,
  maxResults: number = 8,
): string {
  return results.slice(0, maxResults).map(r => {
    const phaseLabel = r.phase ? getPhaseLabel(r.phase) : '';
    const phaseColor = r.phase ? getPhaseColor(r.phase) : '';
    const href = r.phase ? `/licoes/${r.slug}` : `/blog/${r.slug}`;
    return `
      <a href="${href}" class="block px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <span class="block text-xs font-bold text-white truncate">${r.title}</span>
            <span class="block text-[10px] text-gray-400 mt-0.5 line-clamp-1">${r.description}</span>
          </div>
          ${r.phase ? `<span class="shrink-0 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${phaseColor}">${phaseLabel}</span>` : ''}
        </div>
      </a>
    `;
  }).join('');
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
