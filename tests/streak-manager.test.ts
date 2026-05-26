import { describe, it, expect, beforeEach, vi } from 'vitest';

function mockLocalStorage(data: Record<string, string> = {}) {
  const store: Record<string, string> = { ...data };
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (_index: number) => Object.keys(store)[_index] ?? null,
  });
}

const STORAGE_KEY = 'falo-chines-streak';

describe('StreakManager - recordVisit', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return currentStreak 1 on first visit ever', async () => {
    mockLocalStorage({});
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.totalDays).toBe(1);
  });

  it('should increment streak when visiting consecutive days', async () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 1, longestStreak: 1, totalDays: 1,
        lastVisit: yesterday, milestonesReached: [],
      }),
    });
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(2);
  });

  it('should reset streak when gap >1 day', async () => {
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 5, longestStreak: 5, totalDays: 5,
        lastVisit: twoDaysAgo, milestonesReached: [3],
      }),
    });
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(5);
  });

  it('should not double-count same day', async () => {
    const today = new Date().toISOString().slice(0, 10);
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 3, longestStreak: 3, totalDays: 3,
        lastVisit: today, milestonesReached: [3],
      }),
    });
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(3);
    expect(result.totalDays).toBe(3);
  });

  it('should detect milestone on exact day', async () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 2, longestStreak: 2, totalDays: 2,
        lastVisit: yesterday, milestonesReached: [],
      }),
    });
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(3);
    expect(result.milestonesReached).toContain(3);
  });
});

describe('StreakManager - queries', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('getNextMilestone should return first un-reached milestone', async () => {
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 7, longestStreak: 7, totalDays: 7,
        lastVisit: new Date().toISOString().slice(0, 10),
        milestonesReached: [3, 7],
      }),
    });
    const { getNextMilestone } = await import('../src/lib/streak-manager');
    expect(getNextMilestone()).toBe(14);
  });

  it('getNextMilestone should return null when all milestones reached', async () => {
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 90, longestStreak: 90, totalDays: 90,
        lastVisit: new Date().toISOString().slice(0, 10),
        milestonesReached: [3, 7, 14, 21, 30, 60, 90],
      }),
    });
    const { getNextMilestone } = await import('../src/lib/streak-manager');
    expect(getNextMilestone()).toBeNull();
  });

  it('hasReachedMilestone should return true for reached milestones', async () => {
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 14, longestStreak: 14, totalDays: 14,
        lastVisit: new Date().toISOString().slice(0, 10),
        milestonesReached: [3, 7, 14],
      }),
    });
    const { hasReachedMilestone } = await import('../src/lib/streak-manager');
    expect(hasReachedMilestone(7)).toBe(true);
    expect(hasReachedMilestone(21)).toBe(false);
  });

  it('should keep longestStreak even after reset', async () => {
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().slice(0, 10);
    mockLocalStorage({
      [STORAGE_KEY]: JSON.stringify({
        currentStreak: 30, longestStreak: 30, totalDays: 30,
        lastVisit: twoDaysAgo, milestonesReached: [3, 7, 14, 21, 30],
      }),
    });
    const { recordVisit } = await import('../src/lib/streak-manager');
    const result = recordVisit();
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(30);
    expect(result.totalDays).toBe(31);
  });
});
