import { useEffect, useRef } from 'react';
import './TacticalAnalysis.css';

const features = [
  {
    id: 'ai-analytics',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L28 10v12L16 28 4 22V10L16 4z" stroke="#00F2FF" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="5" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.1)" />
        <circle cx="16" cy="16" r="2" fill="#00F2FF" />
        <line x1="16" y1="4" x2="16" y2="11" stroke="#00F2FF" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="16" y1="21" x2="16" y2="28" stroke="#00F2FF" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
    title: 'AI Analytics',
    description: 'Our proprietary algorithms process decades of player data to generate dynamic, challenging guessing paths. Experience the future of cricket trivia.',
    stat: '99.2%',
    statLabel: 'PREDICTION RATE',
  },
  {
    id: 'realtime-stats',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="18" width="5" height="10" rx="1" fill="rgba(0,242,255,0.2)" stroke="#00F2FF" strokeWidth="1" />
        <rect x="13.5" y="12" width="5" height="16" rx="1" fill="rgba(0,242,255,0.3)" stroke="#00F2FF" strokeWidth="1" />
        <rect x="23" y="6" width="5" height="22" rx="1" fill="rgba(0,242,255,0.4)" stroke="#00F2FF" strokeWidth="1" />
        <circle cx="6.5" cy="14" r="2" fill="#2ECC71" />
        <circle cx="16" cy="8" r="2" fill="#2ECC71" />
        <circle cx="25.5" cy="4" r="2" fill="#2ECC71" />
        <line x1="6.5" y1="14" x2="16" y2="8" stroke="#2ECC71" strokeWidth="1" />
        <line x1="16" y1="8" x2="25.5" y2="4" stroke="#2ECC71" strokeWidth="1" />
      </svg>
    ),
    title: 'Real-time Stats',
    description: 'Every match, every ball, every player. Data synchronized with live stadium action for unmatched precision.',
    stat: 'LIVE',
    statLabel: 'DATA SYNC',
  },
  {
    id: 'leaderboards',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3 6 7 1-5 5 1.2 7L16 19.5 9.8 23 11 16 6 11l7-1 3-6z" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.1)" />
        <circle cx="16" cy="14" r="3" fill="#00F2FF" fillOpacity="0.3" />
      </svg>
    ),
    title: 'Live Leaderboards',
    description: 'Compete globally and climb the ranks of the command center. Real-time rankings updated every second.',
    stat: '150K+',
    statLabel: 'COMPETITORS',
  },
  {
    id: 'sports-tech',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="#00F2FF" strokeWidth="1.5" fill="none" />
        <line x1="4" y1="12" x2="28" y2="12" stroke="#00F2FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="4" y1="20" x2="28" y2="20" stroke="#00F2FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="12" y1="4" x2="12" y2="28" stroke="#00F2FF" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="20" y1="4" x2="20" y2="28" stroke="#00F2FF" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="16" cy="16" r="4" stroke="#2ECC71" strokeWidth="1.5" fill="rgba(46,204,113,0.15)" />
        <circle cx="16" cy="16" r="1.5" fill="#2ECC71" />
      </svg>
    ),
    title: 'Pro Sports-Tech',
    description: 'Designed for the elite fan who values precision over playfulness. Welcome to the Command Center.',
    stat: '4K+',
    statLabel: 'DATA POINTS',
  },
];

export default function TacticalAnalysis() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('tactical--visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tactical" id="tactical" ref={sectionRef}>
      <div className="tactical__bg-line tactical__bg-line--1"></div>
      <div className="tactical__bg-line tactical__bg-line--2"></div>

      <div className="container">
        <div className="tactical__header">
          <span className="section-label">// System Modules</span>
          <h2 className="headline-xl" id="tactical-title">Tactical Analysis</h2>
          <p className="body-lg tactical__desc">
            Four core modules powering the most sophisticated cricket intelligence platform ever built.
          </p>
        </div>

        <div className="tactical__grid" id="tactical-grid">
          {features.map((feature, index) => (
            <div
              className="tactical__card glass-panel"
              key={feature.id}
              id={`tactical-card-${feature.id}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="tactical__card-glow"></div>
              <div className="tactical__card-header">
                <div className="tactical__card-icon">{feature.icon}</div>
                <div className="tactical__card-stat">
                  <span className="tactical__card-stat-value">{feature.stat}</span>
                  <span className="tactical__card-stat-label">{feature.statLabel}</span>
                </div>
              </div>
              <h3 className="headline-md tactical__card-title">{feature.title}</h3>
              <p className="body-md tactical__card-desc">{feature.description}</p>
              <div className="tactical__card-footer">
                <span className="tactical__card-index">0{index + 1}</span>
                <div className="tactical__card-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
