import { useEffect, useState } from 'react';
import { InsightBanner } from './components/InsightBanner';
import { Leaderboard } from './components/Leaderboard';
import { MetricCard } from './components/MetricCard';
import { ParticipationPanel } from './components/ParticipationPanel';
import { TrendChart } from './components/TrendChart';
import { siteConfig } from './config/site';
import type { Challenge, DistrictScore, DiversionPoint, ResidentChampion, WasteMetric } from './types';
import { loadChallenges, loadChampions, loadWasteData } from './utils/dataLoader';
import './App.css';

const App = () => {
  const [wasteMetrics, setWasteMetrics] = useState<WasteMetric[]>([]);
  const [diversionTrend, setDiversionTrend] = useState<DiversionPoint[]>([]);
  const [districtLeaderboard, setDistrictLeaderboard] = useState<DistrictScore[]>([]);
  const [citizenChampions, setCitizenChampions] = useState<ResidentChampion[]>([]);
  const [neighborhoodChallenges, setNeighborhoodChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [wasteData, champions, challenges] = await Promise.all([
          loadWasteData(),
          loadChampions(),
          loadChallenges()
        ]);

        setWasteMetrics(wasteData.wasteMetrics);
        setDiversionTrend(wasteData.diversionTrend);
        setDistrictLeaderboard(wasteData.districtLeaderboard);
        setCitizenChampions(champions);
        setNeighborhoodChallenges(challenges);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <main className="app-shell" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading real-time data...</h2>
          <p>Fetching municipal waste metrics from dataset</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="app-shell" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Error loading data</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  const totalHouseholds = districtLeaderboard.reduce((sum, d) => sum + d.households, 0);
  const avgDiversion = wasteMetrics.length > 0
    ? Math.round(((wasteMetrics[0].currentTons + wasteMetrics[1].currentTons) / 
        wasteMetrics.reduce((sum, m) => sum + m.currentTons, 0)) * 100)
    : 64;

  return (
    <main className="app-shell">
      <header className="app-shell__hero">
        <div>
          <p className="app-shell__eyebrow">{siteConfig.name} // Zero-Waste command center</p>
          <h1>{siteConfig.tagline}</h1>
          <p className="app-shell__subtitle">
            Track municipal recycling, compost, and landfill metrics while rallying neighborhoods through friendly leaderboards and
            citizen challenges across {siteConfig.city}.
          </p>
        </div>
        <div className="hero-stats">
          <div>
            <span>Live diversion</span>
            <strong>{avgDiversion}%</strong>
            <small>Real-time from dataset</small>
          </div>
          <div>
            <span>Participation</span>
            <strong>{Math.round(totalHouseholds / 1000)}k</strong>
            <small>opted-in households</small>
          </div>
        </div>
      </header>

      <InsightBanner metrics={wasteMetrics} trend={diversionTrend} />

      <section className="grid grid--metrics">
        {wasteMetrics.map((metric: WasteMetric) => (
          <MetricCard key={metric.stream} metric={metric} />
        ))}
      </section>

      <section className="grid grid--two">
        <TrendChart data={diversionTrend} />
        <Leaderboard districts={districtLeaderboard} />
      </section>

      <ParticipationPanel champions={citizenChampions} challenges={neighborhoodChallenges} />

      <footer className="site-footer">
        <div>
          <strong>{siteConfig.name}</strong>
          <span>{siteConfig.domain.replace('https://', '')}</span>
        </div>
        <p>
          Operated by the {siteConfig.authority}. Contact <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a> for
          deployment or domain updates.
        </p>
      </footer>
    </main>
  );
};

export default App;
