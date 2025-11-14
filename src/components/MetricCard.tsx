import { Leaf, Recycle, Trash2 } from 'lucide-react';
import type { WasteMetric } from '../types';

const config = {
  recycling: {
    label: 'Recycling',
    accent: '#0ba5ec',
    icon: Recycle
  },
  compost: {
    label: 'Compost',
    accent: '#0f9d58',
    icon: Leaf
  },
  landfill: {
    label: 'Landfill',
    accent: '#f97316',
    icon: Trash2
  }
} as const;

interface MetricCardProps {
  metric: WasteMetric;
}

const formatTons = (value: number) => `${value.toLocaleString()} t`; // `t` stands for metric tons

export const MetricCard = ({ metric }: MetricCardProps) => {
  const stream = config[metric.stream];
  const Icon = stream.icon;
  const progress = Math.min(100, Math.round((metric.currentTons / metric.targetTons) * 100));

  const isPositive = metric.stream !== 'landfill' ? metric.changePct >= 0 : metric.changePct <= 0;
  const deltaColor = isPositive ? '#10b981' : '#dc2626';

  return (
    <article className="metric-card" style={{ borderColor: stream.accent }}>
      <header className="metric-card__header">
        <span className="metric-card__icon" style={{ backgroundColor: `${stream.accent}1a`, color: stream.accent }}>
          <Icon size={20} />
        </span>
        <div>
          <p className="metric-card__label">{stream.label}</p>
          <small className="metric-card__subtitle">Target {formatTons(metric.targetTons)}</small>
        </div>
        <strong className="metric-card__value">{formatTons(metric.currentTons)}</strong>
      </header>

      <div className="metric-card__progress">
        <div className="metric-card__progress-bar" style={{ width: `${progress}%`, backgroundColor: stream.accent }} />
      </div>

      <footer className="metric-card__footer">
        <span style={{ color: deltaColor }}>{metric.changePct > 0 ? '+' : ''}{metric.changePct}% vs last month</span>
        {metric.contaminationRate > 0 ? <span className="metric-card__contamination">Contamination {metric.contaminationRate}%</span> : <span />}
      </footer>
    </article>
  );
};
