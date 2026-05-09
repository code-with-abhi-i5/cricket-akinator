import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './GuessPage.css';

// ─── DATA ────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  "Is your player primarily a batsman?",
  "Has your player ever captained an IPL franchise?",
  "Is your player from outside India?",
  "Has your player won the Purple or Orange Cap?",
  "Does your player usually bat in the top 4?",
  "Has your player played for CSK, MI, or RCB?",
  "Is your player known for death-over heroics?",
  "Has your player represented India in international cricket?",
];

const PLAYERS = [
  { name: "MS Dhoni", team: "Chennai Super Kings", role: "WK-Batsman", flag: "🇮🇳", abbr: "MSD", color: "#F2C94C" },
  { name: "Virat Kohli", team: "Royal Challengers Bengaluru", role: "Batsman", flag: "🇮🇳", abbr: "VK", color: "#EB5757" },
  { name: "Rohit Sharma", team: "Mumbai Indians", role: "Batsman", flag: "🇮🇳", abbr: "RO", color: "#2D9CDB" },
  { name: "AB de Villiers", team: "Royal Challengers Bengaluru", role: "Batsman", flag: "🇿🇦", abbr: "ABD", color: "#EB5757" },
  { name: "Jasprit Bumrah", team: "Mumbai Indians", role: "Bowler", flag: "🇮🇳", abbr: "JB", color: "#2D9CDB" },
  { name: "Suryakumar Yadav", team: "Mumbai Indians", role: "Batsman", flag: "🇮🇳", abbr: "SKY", color: "#2D9CDB" },
  { name: "KL Rahul", team: "Lucknow Super Giants", role: "WK-Batsman", flag: "🇮🇳", abbr: "KLR", color: "#27AE60" },
];

const BTNS = [
  { label: "YES", icon: "✓", key: "yes", bg: "linear-gradient(135deg, #34D399 0%, #10B981 100%)", shadow: "rgba(16, 185, 129, 0.4)" },
  { label: "NO", icon: "✕", key: "no", bg: "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)", shadow: "rgba(225, 29, 72, 0.4)" },
  { label: "MAYBE", icon: "~", key: "maybe", bg: "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)", shadow: "rgba(217, 119, 6, 0.4)" },
  { label: "DON'T KNOW", icon: "?", key: "dk", bg: "linear-gradient(135deg, #94A3B8 0%, #475569 100%)", shadow: "rgba(71, 85, 105, 0.4)" },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function GameScreen({ qIndex, question, confidence, history, onAnswer, thinking }) {
  return (
    <div className="container guess-game-grid">
      {/* LEFT SIDEBAR */}
      <div className="guess-sidebar guess-sidebar--left">
        <div className="glass-panel side-panel">
          <div className="section-label" style={{ color: '#F59E0B' }}>◈ HISTORY</div>
          <div className="panel-content history-content">
            {history.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px 0' }}>No answers yet</div>
            ) : (
              history.map((h, i) => (
                <div key={i} className="history-item">
                  <div className="history-q">{h.q}</div>
                  <div className="history-a" style={{
                    color: h.a === "YES" ? "var(--color-success)" : h.a === "NO" ? "#EF4444" : h.a === "MAYBE" ? "#F2C94C" : "var(--color-text-muted)",
                  }}>{h.a}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass-panel side-panel">
          <div className="section-label" style={{ color: '#3B82F6' }}>◈ HOW IT WORKS</div>
          <div className="panel-content how-it-works">
            <div className="hiw-item"><span className="hiw-icon">🏏</span> AI narrows 500+ players</div>
            <div className="hiw-item"><span className="hiw-icon">📊</span> Entropy-based questioning</div>
            <div className="hiw-item"><span className="hiw-icon">🏆</span> Guesses at 80%+ confidence</div>
            <div className="hiw-item"><span className="hiw-icon">⚡</span> Learns from mistakes</div>
          </div>
        </div>
      </div>

      {/* CENTER: Main Game */}
      <div className="guess-main">
        <div className="game-header">
          <h1 className="game-title">IPL AKINATOR</h1>
          <div className="game-conf-badge">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="conf-text">
              <span className="conf-val">{confidence}%</span>
              <span className="conf-lbl">CONF</span>
            </div>
          </div>
        </div>

        <div className="guess-progress-wrap">
          <div className="guess-progress-header">
            <span>QUESTION {qIndex + 1} OF 8</span>
            <span style={{ color: '#F59E0B' }}>{Math.round(((qIndex + 1) / 8) * 100)}%</span>
          </div>
          <div className="guess-progress-track">
             <div className="guess-progress-fill" style={{ width: `${((qIndex + 1) / 8) * 100}%` }}></div>
          </div>
        </div>

        <div className="ai-analyst-row">
          <div className="ai-avatar-wrap">
            <div className="ai-avatar-ring"></div>
            <div className="ai-avatar-core cricket-ball">
              <div className="ball-seam"></div>
            </div>
          </div>
          <div className="ai-analyst-text">
            <div className="section-label" style={{ color: '#3B82F6', marginBottom: '4px' }}>◈ THIRD UMPIRE</div>
            <div className="ai-status-msg">{thinking ? 'Reviewing Decision...' : 'Ready for your answer'}</div>
          </div>
        </div>

        <div className={`guess-question-card glass-panel ${thinking ? 'thinking' : ''}`}>
          <div className="section-label" style={{ marginBottom: '16px', color: '#F59E0B' }}>
            ◈ QUESTION {qIndex + 1}
          </div>
          <h2 className="headline-lg">{question}</h2>
        </div>

        <div className={`guess-buttons ${thinking ? 'disabled' : ''}`}>
          {BTNS.map((b) => (
            <button 
              key={b.key} 
              className="guess-btn solid-btn" 
              onClick={() => onAnswer(b.key, b.label)}
              style={{ background: b.bg, '--btn-shadow': b.shadow }}
            >
              <span className="icon">{b.icon}</span>
              <span className="btn-label">{b.label}</span>
            </button>
          ))}
        </div>
        
        <div className="game-footer-text">
          Think carefully before answering — every response narrows the pool
        </div>
      </div>

      {/* RIGHT: AI Stats */}
      <div className="guess-sidebar guess-sidebar--right">
        <div className="glass-panel side-panel">
          <div className="section-label" style={{ color: '#3B82F6' }}>◈ MATCH STATUS</div>
          <div className="panel-content">
            <div className="ai-stat-row">
               <div className="ai-stat-lbl">Squad Remaining</div>
               <div className="ai-stat-val" style={{ color: '#3B82F6' }}>{Math.max(1, Math.round(500 * (1 - confidence / 100)))}</div>
            </div>
            <div className="progress-thin"><div className="progress-fill" style={{ width: `${100-confidence}%`, background: '#3B82F6' }}></div></div>

            <div className="ai-stat-row" style={{ marginTop: '16px' }}>
               <div className="ai-stat-lbl">Overs Left</div>
               <div className="ai-stat-val" style={{ color: '#F59E0B' }}>{8 - qIndex}</div>
            </div>
            <div className="progress-thin"><div className="progress-fill" style={{ width: `${((8-qIndex)/8) * 100}%`, background: '#F59E0B' }}></div></div>

            <div className="ai-stat-row" style={{ marginTop: '16px' }}>
               <div className="ai-stat-lbl">Win Predictor</div>
               <div className="ai-stat-val" style={{ color: '#10B981' }}>{confidence}%</div>
            </div>
            <div className="progress-thin"><div className="progress-fill" style={{ width: `${confidence}%`, background: '#10B981' }}></div></div>
          </div>
        </div>

        <div className="glass-panel side-panel">
          <div className="section-label" style={{ color: '#F59E0B' }}>◈ DRS SCAN</div>
          <div className="panel-content" style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
             <div className="large-scan-circle">
                <svg className="circular-chart" viewBox="0 0 36 36">
                   <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <path className="circle" strokeDasharray={`${confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="scan-inner">
                  <span className="scan-val">{confidence}%</span>
                  <span className="scan-lbl">CONF</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuessScreen({ player, confidence, onCorrect, onWrong }) {
  const [phase, setPhase] = useState("reveal");

  return (
    <div className="container guess-reveal">
      <div className="section-label" style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>◈ NEURAL VERDICT</div>
      <h2 className="headline-lg" style={{ color: 'var(--color-text-muted)' }}>You are thinking of...</h2>

      <div className="reveal-card glass-panel" style={{ borderColor: player.color }}>
        <div className="reveal-avatar" style={{ background: `radial-gradient(circle at top left, ${player.color}, #0B0E14)` }}>
          {player.abbr}
        </div>
        <div className="reveal-flag">{player.flag}</div>
        <h1 className="headline-xl reveal-name">{player.name}</h1>
        <div className="reveal-team" style={{ color: player.color }}>{player.team}</div>
        <div className="reveal-role">{player.role}</div>

        <div className="reveal-confidence">
          <div className="dot"></div>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>I am</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: '900', color: 'var(--color-primary)' }}>{confidence}%</span>
          <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>sure</span>
        </div>
      </div>

      {phase === "reveal" && (
        <div className="reveal-actions">
          <button className="btn-tactical" style={{ background: 'rgba(46, 204, 113, 0.1)', color: 'var(--color-success)', borderColor: 'var(--color-success)' }} onClick={onCorrect}>
            ✓ CORRECT!
          </button>
          <button className="btn-tactical" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderColor: '#EF4444' }} onClick={() => setPhase("wrong")}>
            ✕ WRONG
          </button>
        </div>
      )}

      {phase === "wrong" && (
        <div className="glass-panel" style={{ padding: '24px', animation: 'fadeUp 0.4s ease' }}>
          <div className="section-label" style={{ color: '#EF4444', marginBottom: '12px' }}>◈ NEURAL LEARNING MODE</div>
          <p className="body-lg" style={{ marginBottom: '16px' }}>Who were you thinking of? Help me learn!</p>
          <input type="text" placeholder="Enter player name..." style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontFamily: 'var(--font-sans)', marginBottom: '16px', outline: 'none' }} />
          <button className="btn-tactical btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onCorrect}>
            SUBMIT & TEACH AI
          </button>
        </div>
      )}
    </div>
  );
}

// ─── ROOT PAGE ───────────────────────────────────────────────────────────────
export default function GuessPage() {
  const [screen, setScreen] = useState("game");
  const [qIndex, setQIndex] = useState(0);
  const [confidence, setConfidence] = useState(12);
  const [history, setHistory] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [player, setPlayer] = useState(null);

  const handleAnswer = (key, label) => {
    if (thinking) return;
    setThinking(true);
    
    // Logic translated from snippet
    const gain = key === "yes" ? 18 : key === "no" ? 16 : key === "maybe" ? 9 : 5;
    const noise = Math.floor(Math.random() * 8);
    const newConf = Math.min(97, confidence + gain + noise);
    const newHistory = [...history, { q: QUESTIONS[qIndex], a: label }];

    setTimeout(() => {
      setConfidence(newConf);
      setHistory(newHistory);
      
      if (newConf >= 80 || qIndex >= QUESTIONS.length - 1) {
        // Randomly pick a player for the mock guess
        setPlayer(PLAYERS[Math.floor(Math.random() * PLAYERS.length)]);
        setScreen("guess");
      } else {
        setQIndex(qIndex + 1);
      }
      setThinking(false);
    }, 800 + Math.random() * 400); // Simulated network delay
  };

  const reset = () => {
    setScreen("game");
    setQIndex(0);
    setConfidence(12);
    setHistory([]);
    setThinking(false);
    setPlayer(null);
  };

  return (
    <>
      <Navbar />
      <div className="guess-page">
        {/* Ambient background glow for this page */}
        <div className="guess-bg">
          <div className="guess-bg-glow"></div>
        </div>


        {screen === "game" && (
          <GameScreen
            qIndex={qIndex}
            question={QUESTIONS[qIndex]}
            confidence={confidence}
            history={history}
            onAnswer={handleAnswer}
            thinking={thinking}
          />
        )}
        {screen === "guess" && player && (
          <GuessScreen
            player={player}
            confidence={confidence}
            onCorrect={reset}
            onWrong={() => {}}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
