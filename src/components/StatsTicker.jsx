import './StatsTicker.css';

const FACTS = [
  { icon: '🏏', text: 'MS Dhoni — 5 IPL Titles with CSK' },
  { icon: '🔥', text: 'Virat Kohli — 7263 Runs, All-time Top Scorer' },
  { icon: '⚡', text: 'Bumrah — Best Economy in Death Overs' },
  { icon: '🏆', text: 'Rohit Sharma — Most Successful IPL Captain' },
  { icon: '💥', text: 'Chris Gayle — 175* Highest Individual Score' },
  { icon: '🎯', text: 'Rashid Khan — 500+ T20 Wickets Worldwide' },
  { icon: '👑', text: 'AB de Villiers — Mr. 360° of IPL' },
  { icon: '🌟', text: 'Sunil Narine — 4-Time Purple Cap Contender' },
  { icon: '🔴', text: 'Andre Russell — Most Sixes in a Single Season' },
  { icon: '💎', text: 'Yashasvi Jaiswal — Youngest IPL Centurion' },
];

export default function StatsTicker() {
  const doubled = [...FACTS, ...FACTS];

  return (
    <div className="stats-ticker">
      <div className="stats-ticker__label">
        <span className="stats-ticker__live-dot"></span>
        LIVE IPL INTEL
      </div>
      <div className="stats-ticker__track">
        <div className="stats-ticker__scroll">
          {doubled.map((fact, i) => (
            <div key={i} className="stats-ticker__item">
              <span className="stats-ticker__icon">{fact.icon}</span>
              <span className="stats-ticker__text">{fact.text}</span>
              <span className="stats-ticker__sep">◈</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
