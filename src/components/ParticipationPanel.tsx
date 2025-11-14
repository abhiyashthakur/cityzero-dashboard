import { Sparkles } from 'lucide-react';
import type { Challenge, ResidentChampion } from '../types';
import { summarizeChallengeImpact } from '../utils/metrics';

interface ParticipationPanelProps {
  champions: ResidentChampion[];
  challenges: Challenge[];
}

export const ParticipationPanel = ({ champions, challenges }: ParticipationPanelProps) => (
  <section className="panel">
    <header className="panel__header">
      <div>
        <p className="panel__eyebrow">Citizen participation</p>
        <h3>Challenges + champions</h3>
      </div>
      <span className="panel__chip">Live beta</span>
    </header>

    <div className="participation">
      <div>
        <h4>Active neighborhood challenges</h4>
        <p className="participation__summary">{summarizeChallengeImpact(challenges)}</p>
        <ul className="challenge-list">
          {challenges.map((challenge) => (
            <li key={challenge.id} className={`challenge challenge--${challenge.status}`}>
              <div>
                <p className="challenge__title">{challenge.title}</p>
                <small>{challenge.households.toLocaleString()} households</small>
              </div>
              <div className="challenge__meta">
                <span>{challenge.status}</span>
                <strong>{challenge.impactTons} t</strong>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="champions">
        <h4>Citizen champions</h4>
        <ul>
          {champions.map((champion) => (
            <li key={champion.name}>
              <div>
                <strong>{champion.name}</strong>
                <p>{champion.badge}</p>
              </div>
              <span>
                <Sparkles size={16} /> {champion.actions} actions
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
