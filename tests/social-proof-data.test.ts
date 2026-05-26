import { describe, it, expect } from 'vitest';
import { socialProof } from '../src/data/social-proof-data';

describe('SocialProofData', () => {
  it('should have entries for every lesson slug', () => {
    const slugs = Object.keys(socialProof.lessons);
    expect(slugs.length).toBeGreaterThan(0);
    slugs.forEach(slug => {
      expect(socialProof.lessons[slug].students).toBeGreaterThan(0);
    });
  });

  it('should have phase data for all 4 phases', () => {
    const phases = Object.keys(socialProof.phases);
    expect(phases.sort()).toEqual(['A', 'B', 'C', 'D']);
    Object.values(socialProof.phases).forEach(phase => {
      expect(phase.students).toBeGreaterThan(0);
      expect(phase.charactersLearned).toBeGreaterThan(0);
    });
  });

  it('should have weeklyStats', () => {
    expect(socialProof.weeklyStats.studentsActive).toBeGreaterThan(0);
    expect(socialProof.weeklyStats.newCharacters).toBeGreaterThan(0);
  });
});
