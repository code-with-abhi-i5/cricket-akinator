import { useEffect, useRef } from 'react';
import './TacticalAnalysis.css';

const features = [
  {
    id: 'ai-analytics',
    icon: (
      /* Cricket Ball with AI brain icon */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.06)" />
        <path d="M10 18Q14 12 18 18Q22 24 26 18" stroke="#00F2FF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="14" cy="16" r="2" fill="#00F2FF" fillOpacity="0.4" />
        <circle cx="22" cy="20" r="2" fill="#00F2FF" fillOpacity="0.4" />
        <circle cx="18" cy="18" r="3" stroke="#2ECC71" strokeWidth="1" fill="rgba(46,204,113,0.15)" />
        <circle cx="18" cy="18" r="1" fill="#2ECC71" />
      </svg>
    ),
    title: 'AI Analytics',
    description: 'Our proprietary algorithms process decades of IPL player data — batting averages, strike rates, bowling economy — to generate challenging guessing paths.',
    stat: '99.2%',
    statLabel: 'PREDICTION RATE',
  },
  {
    id: 'realtime-stats',
    icon: (
      /* Scoreboard / Stats Chart */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="28" height="28" rx="3" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.04)" />
        <rect x="8" y="20" width="4" height="8" rx="1" fill="rgba(0,242,255,0.3)" />
        <rect x="16" y="14" width="4" height="14" rx="1" fill="rgba(0,242,255,0.5)" />
        <rect x="24" y="8" width="4" height="20" rx="1" fill="rgba(0,242,255,0.7)" />
        <circle cx="10" cy="17" r="2" fill="#2ECC71" />
        <circle cx="18" cy="11" r="2" fill="#2ECC71" />
        <circle cx="26" cy="6" r="2" fill="#2ECC71" />
        <line x1="10" y1="17" x2="18" y2="11" stroke="#2ECC71" strokeWidth="1" />
        <line x1="18" y1="11" x2="26" y2="6" stroke="#2ECC71" strokeWidth="1" />
      </svg>
    ),
    title: 'Live Match Stats',
    description: 'Every match, every ball, every wicket. Data synchronized with live IPL action for unmatched precision in your guessing game.',
    stat: 'LIVE',
    statLabel: 'DATA SYNC',
  },
  {
    id: 'leaderboards',
    icon: (
      /* Trophy / Leaderboard */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M12 8h12v10c0 3.3-2.7 6-6 6s-6-2.7-6-6V8z" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.08)" />
        <path d="M12 12H8c0 4 2 6 4 6" stroke="#00F2FF" strokeWidth="1" fill="none" />
        <path d="M24 12h4c0 4-2 6-4 6" stroke="#00F2FF" strokeWidth="1" fill="none" />
        <rect x="16" y="24" width="4" height="4" fill="#00F2FF" fillOpacity="0.3" />
        <rect x="12" y="28" width="12" height="2" rx="1" fill="#00F2FF" fillOpacity="0.5" />
        <text x="18" y="19" textAnchor="middle" fill="#00F2FF" fontSize="8" fontWeight="bold">🏆</text>
      </svg>
    ),
    title: 'Live Leaderboards',
    description: 'Compete with cricket fans worldwide. Climb the ranks and become the ultimate IPL oracle. Updated in real-time every second.',
    stat: '150K+',
    statLabel: 'COMPETITORS',
  },
  {
    id: 'sports-tech',
    icon: (
      /* Hawk-Eye / DRS style */
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="28" height="28" rx="3" stroke="#00F2FF" strokeWidth="1.5" fill="none" />
        {/* Pitch lines */}
        <rect x="14" y="6" width="8" height="24" rx="1" stroke="#2ECC71" strokeWidth="0.8" fill="rgba(46,204,113,0.06)" />
        {/* Ball trajectory */}
        <circle cx="18" cy="14" r="3" stroke="#FFB4AB" strokeWidth="1" fill="rgba(255,180,171,0.15)" />
        <circle cx="18" cy="14" r="1" fill="#FFB4AB" />
        <path d="M18 8L18 14L20 22" stroke="#FFB4AB" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
        {/* Crosshair */}
        <line x1="18" y1="4" x2="18" y2="9" stroke="#00F2FF" strokeWidth="0.5" opacity="0.4" />
        <line x1="18" y1="19" x2="18" y2="32" stroke="#00F2FF" strokeWidth="0.5" opacity="0.4" />
        <line x1="4" y1="14" x2="15" y2="14" stroke="#00F2FF" strokeWidth="0.5" opacity="0.4" />
        <line x1="21" y1="14" x2="32" y2="14" stroke="#00F2FF" strokeWidth="0.5" opacity="0.4" />
      </svg>
    ),
    title: 'Hawk-Eye Tech',
    description: 'Inspired by real DRS and Hawk-Eye systems used in international cricket. Experience broadcast-grade sports analytics at your fingertips.',
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
          <span className="section-label">🏏 // Cricket Intelligence Modules</span>
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
