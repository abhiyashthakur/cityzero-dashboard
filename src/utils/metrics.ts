import type { Challenge, DiversionPoint, WasteMetric } from '../types';

const safeDivide = (numerator: number, denominator: number) => {
  if (denominator === 0) {
    return 0;
  }
  return Number((numerator / denominator).toFixed(2));
};

export const calculateDiversionRate = (metrics: WasteMetric[]) => {
  const diverted = metrics
    .filter((metric) => metric.stream !== 'landfill')
    .reduce((sum, metric) => sum + metric.currentTons, 0);

  const total = metrics.reduce((sum, metric) => sum + metric.currentTons, 0);
  return safeDivide(diverted, total);
};

export const calculateTargetGap = (metrics: WasteMetric[]) => {
  const divertedTarget = metrics
    .filter((metric) => metric.stream !== 'landfill')
    .reduce((sum, metric) => sum + metric.targetTons, 0);

  const divertedActual = metrics
    .filter((metric) => metric.stream !== 'landfill')
    .reduce((sum, metric) => sum + metric.currentTons, 0);

  return Number((divertedTarget - divertedActual).toFixed(1));
};

export const projectedLandfillReduction = (trend: DiversionPoint[]) => {
  if (!trend.length) {
    return 0;
  }
  const first = trend[0].landfill;
  const last = trend[trend.length - 1].landfill;
  return safeDivide(first - last, first);
};

export const summarizeChallengeImpact = (challenges: Challenge[]) => {
  const active = challenges.filter((challenge) => challenge.status === 'active');
  const households = active.reduce((sum, challenge) => sum + challenge.households, 0);
  const tons = active.reduce((sum, challenge) => sum + challenge.impactTons, 0);

  return `Engaging ${households.toLocaleString()} households to divert ${tons.toFixed(0)} tons this quarter.`;
};

export const findNextMilestone = (metrics: WasteMetric[]) => {
  const compost = metrics.find((metric) => metric.stream === 'compost');
  if (!compost) {
    return 'Scale compost capture data first.';
  }
  const remaining = Math.max(0, compost.targetTons - compost.currentTons);
  return remaining <= 60 ? 'Compost milestone in sight — push for community drop-offs.' : 'Expand kitchen caddy distribution to close compost gap.';
};
