import { describe, expect, it } from 'vitest';
import {
  calculateDiversionRate,
  calculateTargetGap,
  findNextMilestone,
  projectedLandfillReduction,
  summarizeChallengeImpact
} from './metrics.ts';
} from './metrics';
import type { Challenge, DiversionPoint, WasteMetric } from '../types';

const sampleMetrics: WasteMetric[] = [
  { stream: 'recycling', currentTons: 100, targetTons: 120, changePct: 5, contaminationRate: 3 },
  { stream: 'compost', currentTons: 80, targetTons: 100, changePct: 6, contaminationRate: 2 },
  { stream: 'landfill', currentTons: 90, targetTons: 70, changePct: -4, contaminationRate: 0 }
];

const sampleTrend: DiversionPoint[] = [
  { date: 'Jan', recycling: 50, compost: 30, landfill: 120 },
  { date: 'Feb', recycling: 60, compost: 40, landfill: 110 },
  { date: 'Mar', recycling: 70, compost: 50, landfill: 90 }
];

const sampleChallenges: Challenge[] = [
  { id: '1', title: '', households: 1000, status: 'active', impactTons: 10 },
  { id: '2', title: '', households: 700, status: 'upcoming', impactTons: 5 },
  { id: '3', title: '', households: 600, status: 'active', impactTons: 8 }
];

describe('metrics utils', () => {
  it('calculates diversion rate', () => {
    expect(calculateDiversionRate(sampleMetrics)).toBeCloseTo(0.67, 2);
  });

  it('calculates diverted target gap', () => {
    expect(calculateTargetGap(sampleMetrics)).toBeCloseTo(40);
  });

  it('projects landfill reduction', () => {
    expect(projectedLandfillReduction(sampleTrend)).toBeCloseTo(0.25, 2);
  });

  it('summarizes active challenge impact', () => {
    const summary = summarizeChallengeImpact(sampleChallenges);
    expect(summary).toContain('households');
    expect(summary).toContain('tons');
  });

  it('recommends next milestone', () => {
    expect(findNextMilestone(sampleMetrics)).toContain('Compost');
  });
});
