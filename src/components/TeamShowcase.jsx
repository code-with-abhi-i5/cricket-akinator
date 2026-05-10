import { useEffect, useRef } from 'react';
import './TeamShowcase.css';

const TEAMS = [
  { name: 'Chennai Super Kings', abbr: 'CSK', color: '#F2C94C', titles: 5, emoji: '🦁' },
  { name: 'Mumbai Indians', abbr: 'MI', color: '#2D9CDB', titles: 5, emoji: '🔵' },
  { name: 'Royal Challengers Bengaluru', abbr: 'RCB', color: '#EB5757', titles: 0, emoji: '🔴' },
  { name: 'Kolkata Knight Riders', abbr: 'KKR', color: '#8B5CF6', titles: 3, emoji: '💜' },
  { name: 'Rajasthan Royals', abbr: 'RR', color: '#EC4899', titles: 1, emoji: '👑' },
  { name: 'Delhi Capitals', abbr: 'DC', color: '#3B82F6', titles: 0, emoji: '🔷' },
  { name: 'Sunrisers Hyderabad', abbr: 'SRH', color: '#F97316', titles: 1, emoji: '🧡' },
  { name: 'Punjab Kings', abbr: 'PBKS', color: '#EF4444', titles: 0, emoji: '❤️' },
  { name: 'Gujarat Titans', abbr: 'GT', color: '#14B8A6', titles: 1, emoji: '💎' },
  { name: 'Lucknow Super Giants', abbr: 'LSG', color: '#06B6D4', titles: 0, emoji: '🩵' },
];

export default function TeamShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('teams--visible');
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="teams" id="teams" ref={sectionRef}>
      <div className="container">
        <div className="teams__header">
          <span className="section-label">🏟️ // IPL Franchises</span>
          <h2 className="headline-xl" id="teams-title">The Arena</h2>
          <p className="body-lg teams__desc">
            500+ players across 10 legendary franchises. Every team, every era, every legend — all in our database.
          </p>
        </div>

        <div className="teams__grid" id="teams-grid">
          {TEAMS.map((team, i) => (
            <div
              key={team.abbr}
              className="teams__card glass-panel"
              style={{ '--team-color': team.color, animationDelay: `${i * 0.08}s` }}
            >
              <div className="teams__card-glow"></div>
              <div className="teams__card-emoji">{team.emoji}</div>
              <div className="teams__card-abbr">{team.abbr}</div>
              <div className="teams__card-name">{team.name}</div>
              {team.titles > 0 && (
                <div className="teams__card-titles">
                  {'🏆'.repeat(team.titles)}
                </div>
              )}
              <div className="teams__card-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
