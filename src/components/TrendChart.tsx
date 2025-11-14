import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import type { DiversionPoint } from '../types';

interface TrendChartProps {
  data: DiversionPoint[];
}

const colors = {
  recycling: '#0ba5ec',
  compost: '#0f9d58',
  landfill: '#f97316'
};

export const TrendChart = ({ data }: TrendChartProps) => (
  <section className="panel">
    <header className="panel__header">
      <div>
        <p className="panel__eyebrow">Citywide Flow</p>
        <h3>Diversion and landfill trend</h3>
      </div>
      <span className="panel__chip">6-month view</span>
    </header>
    <div className="panel__body chart">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            {Object.entries(colors).map(([key, color]) => (
              <linearGradient id={key} key={key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d7e3ec" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}t`} />
          <Tooltip contentStyle={{ borderRadius: 16, border: '1px solid #e2e8f0' }} formatter={(value: number) => [`${value} tons`, '']} />
          <Legend verticalAlign="top" height={36} />
          <Area type="monotone" dataKey="recycling" stroke={colors.recycling} fillOpacity={1} fill="url(#recycling)" />
          <Area type="monotone" dataKey="compost" stroke={colors.compost} fillOpacity={1} fill="url(#compost)" />
          <Area type="monotone" dataKey="landfill" stroke={colors.landfill} fillOpacity={0.4} fill="url(#landfill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </section>
);
