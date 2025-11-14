import type { DistrictScore } from '../types';

interface LeaderboardProps {
  districts: DistrictScore[];
}

export const Leaderboard = ({ districts }: LeaderboardProps) => (
  <section className="panel">
    <header className="panel__header">
      <div>
        <p className="panel__eyebrow">Community momentum</p>
        <h3>District leaderboard</h3>
      </div>
      <span className="panel__chip chip--ghost">Weekly refresh</span>
    </header>
    <div className="panel__body">
      <table className="leaderboard">
        <thead>
          <tr>
            <th>Rank</th>
            <th>District</th>
            <th>Score</th>
            <th>Participation</th>
            <th>Households</th>
          </tr>
        </thead>
        <tbody>
          {districts.map((district, index) => (
            <tr key={district.district}>
              <td>{index + 1}</td>
              <td>{district.district}</td>
              <td>{district.score}</td>
              <td>{district.participationRate}%</td>
              <td>{district.households.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
