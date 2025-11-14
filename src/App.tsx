import { citizenChampions, districtLeaderboard, diversionTrend, neighborhoodChallenges, wasteMetrics } from './data/mockData';
import { InsightBanner } from './components/InsightBanner';
import { Leaderboard } from './components/Leaderboard';
import { MetricCard } from './components/MetricCard';
import { ParticipationPanel } from './components/ParticipationPanel';
import { TrendChart } from './components/TrendChart';
import './App.css';

const App = () => (
  <main className="app-shell">
    <header className="app-shell__hero">
      <div>
        <p className="app-shell__eyebrow">CityZero // Zero-Waste command center</p>
        <h1>Real-time diversion, landfill drawdown, and community action</h1>
        <p className="app-shell__subtitle">
          Track municipal recycling, compost, and landfill metrics while rallying neighborhoods through friendly leaderboards and
          citizen challenges.
        </p>
      </div>
      <div className="hero-stats">
        <div>
          <span>Live diversion</span>
          <strong>64%</strong>
          <small>+3 pts vs last quarter</small>
        </div>
        <div>
          <span>Participation</span>
          <strong>71k</strong>
          <small>opted-in households</small>
        </div>
      </div>
    </header>

    <InsightBanner metrics={wasteMetrics} trend={diversionTrend} />

    <section className="grid grid--metrics">
      {wasteMetrics.map((metric) => (
        <MetricCard key={metric.stream} metric={metric} />
      ))}
    </section>

    <section className="grid grid--two">
      <TrendChart data={diversionTrend} />
      <Leaderboard districts={districtLeaderboard} />
    </section>

    <ParticipationPanel champions={citizenChampions} challenges={neighborhoodChallenges} />
  </main>
);

export default App;
