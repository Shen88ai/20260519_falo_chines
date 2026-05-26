export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastVisit: string | null;
  milestonesReached: number[];
}

const STORAGE_KEY = 'falo-chines-streak';
const MILESTONES = [3, 7, 14, 21, 30, 60, 90];

function load(): StreakData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisit: null, milestonesReached: [] };
    }
    return JSON.parse(raw);
  } catch {
    return { currentStreak: 0, longestStreak: 0, totalDays: 0, lastVisit: null, milestonesReached: [] };
  }
}

function save(data: StreakData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStreak(): StreakData {
  return load();
}

export function recordVisit(): StreakData {
  const data = load();
  const today = new Date().toISOString().slice(0, 10);

  if (data.lastVisit === today) {
    return data;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let newStreak: number;
  if (data.lastVisit === yesterday) {
    newStreak = data.currentStreak + 1;
  } else if (data.lastVisit === null) {
    newStreak = 1;
  } else {
    newStreak = 1;
  }

  const updated: StreakData = {
    currentStreak: newStreak,
    longestStreak: Math.max(newStreak, data.longestStreak),
    totalDays: data.totalDays + 1,
    lastVisit: today,
    milestonesReached: data.milestonesReached,
  };

  if (MILESTONES.includes(newStreak) && !updated.milestonesReached.includes(newStreak)) {
    updated.milestonesReached = [...updated.milestonesReached, newStreak];
  }

  save(updated);
  return updated;
}

export function hasReachedMilestone(day: number): boolean {
  return load().milestonesReached.includes(day);
}

export function getNextMilestone(): number | null {
  const data = load();
  return MILESTONES.find(m => !data.milestonesReached.includes(m)) ?? null;
}
