import { AlertTriangle, GanttChartSquare, Rocket } from 'lucide-react';
import type { DiversionPoint, WasteMetric } from '../types';
import {
  calculateDiversionRate,
  calculateTargetGap,
  findNextMilestone,
  projectedLandfillReduction
} from '../utils/metrics';

interface InsightBannerProps {
  metrics: WasteMetric[];
  trend: DiversionPoint[];
}

const formatPct = (value: number) => `${Math.round(value * 100)}%`;

export const InsightBanner = ({ metrics, trend }: InsightBannerProps) => {
  const diversion = calculateDiversionRate(metrics);
  const gap = calculateTargetGap(metrics);
  const landfillReduction = projectedLandfillReduction(trend);
  const milestone = findNextMilestone(metrics);

  return (
    <section className="insight-banner">
      <div>
        <Rocket size={32} />
        <div>
          <p className="insight-banner__label">Current diversion</p>
          <strong>{formatPct(diversion)}</strong>
          <small>Tracking toward 75% by 2030</small>
        </div>
      </div>
      <div>
        <GanttChartSquare size={32} />
        <div>
          <p className="insight-banner__label">Target gap</p>
          <strong>{gap.toLocaleString()} tons</strong>
          <small>{milestone}</small>
        </div>
      </div>
      <div>
        <AlertTriangle size={32} />
        <div>
          <p className="insight-banner__label">Landfill reduction</p>
          <strong>{formatPct(landfillReduction)}</strong>
          <small>Six-month glide path</small>
        </div>
      </div>
    </section>
  );
};
