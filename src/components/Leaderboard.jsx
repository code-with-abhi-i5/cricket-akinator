import { useEffect, useRef } from 'react';
import './Leaderboard.css';

const PLAYERS = [
  { rank: 1, name: 'CricketGuru_07', avatar: '🧠', score: 9850, streak: 42, badge: '🏆' },
  { rank: 2, name: 'IPL_Oracle', avatar: '🔮', score: 9420, streak: 38, badge: '🥈' },
  { rank: 3, name: 'DhoniStan', avatar: '🦁', score: 9100, streak: 35, badge: '🥉' },
  { rank: 4, name: 'SixerKing', avatar: '💥', score: 8740, streak: 31, badge: '' },
  { rank: 5, name: 'SpinWizard', avatar: '🎯', score: 8320, streak: 28, badge: '' },
  { rank: 6, name: 'PaceHunter', avatar: '⚡', score: 7950, streak: 25, badge: '' },
  { rank: 7, name: 'BoundaryBoss', avatar: '🏏', score: 7600, streak: 22, badge: '' },
  { rank: 8, name: 'YorkerMaster', avatar: '🔥', score: 7210, streak: 19, badge: '' },
];

export default function Leaderboard() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('lb--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="lb" id="leaderboard" ref={sectionRef}>
      <div className="container">
        <div className="lb__header">
          <span className="section-label">🏆 // Hall of Fame</span>
          <h2 className="headline-xl" id="lb-title">Leaderboard</h2>
          <p className="body-lg lb__desc">
            Top cricket minds competing for the crown. Can you beat them?
          </p>
        </div>

        <div className="lb__table glass-panel">
          {/* Table Header */}
          <div className="lb__row lb__row--header">
            <div className="lb__col lb__col--rank">RANK</div>
            <div className="lb__col lb__col--player">PLAYER</div>
            <div className="lb__col lb__col--score">SCORE</div>
            <div className="lb__col lb__col--streak">STREAK</div>
          </div>

          {/* Rows */}
          {PLAYERS.map((p, i) => (
            <div
              key={p.rank}
              className={`lb__row ${p.rank <= 3 ? 'lb__row--top' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="lb__col lb__col--rank">
                <span className={`lb__rank lb__rank--${p.rank}`}>
                  {p.badge || `#${p.rank}`}
                </span>
              </div>
              <div className="lb__col lb__col--player">
                <span className="lb__avatar">{p.avatar}</span>
                <span className="lb__name">{p.name}</span>
              </div>
              <div className="lb__col lb__col--score">
                <span className="lb__score">{p.score.toLocaleString()}</span>
                <span className="lb__score-label">PTS</span>
              </div>
              <div className="lb__col lb__col--streak">
                <span className="lb__streak">🔥 {p.streak}</span>
              </div>
            </div>
          ))}

          {/* Your Spot */}
          <div className="lb__row lb__row--you">
            <div className="lb__col lb__col--rank">
              <span className="lb__rank">?</span>
            </div>
            <div className="lb__col lb__col--player">
              <span className="lb__avatar">👤</span>
              <span className="lb__name lb__name--you">Your Spot</span>
            </div>
            <div className="lb__col lb__col--score">
              <span className="lb__score">—</span>
              <span className="lb__score-label">PTS</span>
            </div>
            <div className="lb__col lb__col--streak">
              <span className="lb__streak">🔥 0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
