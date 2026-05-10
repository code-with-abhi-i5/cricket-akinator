import { useState, useEffect } from 'react';
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

// ─── MOCK CANDIDATE POOL ─────────────────────────────────────────────────────
const ALL_CANDIDATES = [
  { name: "MS Dhoni", team: "CSK", role: "WK-Bat" },
  { name: "Virat Kohli", team: "RCB", role: "Batsman" },
  { name: "Rohit Sharma", team: "MI", role: "Batsman" },
  { name: "AB de Villiers", team: "RCB", role: "Batsman" },
  { name: "Jasprit Bumrah", team: "MI", role: "Bowler" },
  { name: "Suryakumar Yadav", team: "MI", role: "Batsman" },
  { name: "KL Rahul", team: "LSG", role: "WK-Bat" },
  { name: "Hardik Pandya", team: "MI", role: "All-Rounder" },
  { name: "Ravindra Jadeja", team: "CSK", role: "All-Rounder" },
  { name: "Rashid Khan", team: "GT", role: "Bowler" },
  { name: "Jos Buttler", team: "RR", role: "WK-Bat" },
  { name: "Faf du Plessis", team: "RCB", role: "Batsman" },
  { name: "David Warner", team: "DC", role: "Batsman" },
  { name: "Rishabh Pant", team: "DC", role: "WK-Bat" },
  { name: "Shreyas Iyer", team: "KKR", role: "Batsman" },
  { name: "Sanju Samson", team: "RR", role: "WK-Bat" },
  { name: "Yuzvendra Chahal", team: "RR", role: "Bowler" },
  { name: "Bhuvneshwar Kumar", team: "SRH", role: "Bowler" },
  { name: "Mohammed Shami", team: "GT", role: "Bowler" },
  { name: "Kagiso Rabada", team: "PBKS", role: "Bowler" },
  { name: "Pat Cummins", team: "SRH", role: "Bowler" },
  { name: "Ruturaj Gaikwad", team: "CSK", role: "Batsman" },
  { name: "Shubman Gill", team: "GT", role: "Batsman" },
  { name: "Ishan Kishan", team: "MI", role: "WK-Bat" },
  { name: "Rinku Singh", team: "KKR", role: "Batsman" },
  { name: "Yashasvi Jaiswal", team: "RR", role: "Batsman" },
  { name: "Axar Patel", team: "DC", role: "All-Rounder" },
  { name: "Kuldeep Yadav", team: "DC", role: "Bowler" },
  { name: "Arshdeep Singh", team: "PBKS", role: "Bowler" },
  { name: "Trent Boult", team: "RR", role: "Bowler" },
  { name: "Glenn Maxwell", team: "RCB", role: "All-Rounder" },
  { name: "Andre Russell", team: "KKR", role: "All-Rounder" },
  { name: "Sunil Narine", team: "KKR", role: "All-Rounder" },
  { name: "Chris Gayle", team: "RCB", role: "Batsman" },
  { name: "Dwayne Bravo", team: "CSK", role: "All-Rounder" },
  { name: "Lasith Malinga", team: "MI", role: "Bowler" },
  { name: "Gautam Gambhir", team: "KKR", role: "Batsman" },
  { name: "Robin Uthappa", team: "CSK", role: "Batsman" },
  { name: "Shane Watson", team: "CSK", role: "All-Rounder" },
  { name: "Mayank Agarwal", team: "PBKS", role: "Batsman" },
];

const TOTAL_POOL = 487;

function getCandidateSnapshot(qIndex, confidence) {
  const remaining = Math.max(1, Math.round(TOTAL_POOL * (1 - confidence / 100)));
  const topCount = Math.min(5, Math.max(1, Math.ceil(5 * (1 - confidence / 120))));
  const seed = qIndex * 7;
  const sorted = [...ALL_CANDIDATES].sort((a, b) => {
    const ha = (a.name.charCodeAt(0) * 31 + seed) % 100;
    const hb = (b.name.charCodeAt(0) * 31 + seed) % 100;
    return hb - ha;
  });
  return { remaining, topCandidates: sorted.slice(0, topCount), totalPool: TOTAL_POOL };
}

// ─── CANDIDATE POOL COMPONENT ───────────────────────────────────────────────
function CandidatePool({ snapshot, qIndex }) {
  const { remaining, topCandidates, totalPool } = snapshot;
  const narrowPct = ((totalPool - remaining) / totalPool) * 100;

  return (
    <div className="glass-panel side-panel">
      <div className="section-label" style={{ color: '#10B981' }}>◈ LIVE SQUAD TRACKER</div>
      <div className="panel-content">
        <div className="pool-count-wrap">
          <div className="pool-count" key={remaining}>{remaining}</div>
          <div className="pool-count-label">PLAYERS REMAINING</div>
          <div className="pool-count-sub">out of {totalPool}</div>
        </div>

        <div className="pool-narrow-bar">
          <div className="pool-narrow-fill" style={{ width: `${narrowPct}%` }}></div>
        </div>
        <div className="pool-narrow-meta">
          <span>ELIMINATED</span>
          <span style={{ color: '#EF4444' }}>{Math.round(narrowPct)}%</span>
        </div>

        <div className="pool-divider"></div>

        <div className="pool-top-label">🎯 TOP SUSPECTS</div>
        <div className="pool-candidates" key={qIndex}>
          {topCandidates.map((c, i) => (
            <div key={c.name} className="pool-candidate" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="pool-candidate-rank">#{i + 1}</div>
              <div className="pool-candidate-info">
                <div className="pool-candidate-name">{c.name}</div>
                <div className="pool-candidate-meta">{c.team} · {c.role}</div>
              </div>
              <div className="pool-candidate-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GAME SCREEN ─────────────────────────────────────────────────────────────
function GameScreen({ qIndex, question, confidence, history, onAnswer, thinking, candidateSnapshot }) {
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

      {/* RIGHT: AI Stats + Candidate Pool */}
      <div className="guess-sidebar guess-sidebar--right">
        <div className="glass-panel side-panel">
          <div className="section-label" style={{ color: '#3B82F6' }}>◈ MATCH STATUS</div>
          <div className="panel-content">
            <div className="ai-stat-row">
               <div className="ai-stat-lbl">Squad Remaining</div>
               <div className="ai-stat-val" style={{ color: '#3B82F6' }}>{candidateSnapshot.remaining}</div>
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

        {/* Live Candidate Pool */}
        <CandidatePool snapshot={candidateSnapshot} qIndex={qIndex} />
      </div>
    </div>
  );
}

// ─── GUESS SCREEN ────────────────────────────────────────────────────────────
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
          <button className="btn-tactical" style={{ background: 'rgba(46, 204, 113, 0.1)', color: 'var(--color-success)', borderColor: 'var(--color-success)' }} onClick={() => onCorrect(true)}>
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
          <button className="btn-tactical btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onCorrect(false)}>
            SUBMIT & TEACH AI
          </button>
        </div>
      )}
    </div>
  );
}

// ─── RESULTS SCREEN ──────────────────────────────────────────────────────────
function ResultsScreen({ player, confidence, questionsAsked, timeTakenSec, isCorrect, onPlayAgain }) {
  const mins = Math.floor(timeTakenSec / 60);
  const secs = timeTakenSec % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  const grade = isCorrect
    ? (questionsAsked <= 3 ? 'S+' : questionsAsked <= 5 ? 'A' : questionsAsked <= 7 ? 'B+' : 'B')
    : 'C';

  return (
    <div className="container results-screen">
      {/* Verdict Banner */}
      <div className={`results-verdict ${isCorrect ? 'verdict-win' : 'verdict-lose'}`}>
        <div className="verdict-emoji">{isCorrect ? '🏆' : '😅'}</div>
        <h1 className="results-verdict-title">{isCorrect ? 'MATCH WON!' : 'MATCH DRAWN'}</h1>
        <p className="results-verdict-sub">
          {isCorrect
            ? `AI cracked it in just ${questionsAsked} questions!`
            : "The AI couldn't crack this one. It'll learn for next time!"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="results-stats-grid">
        <div className="results-stat glass-panel">
          <div className="results-stat-icon">❓</div>
          <div className="results-stat-val">{questionsAsked}</div>
          <div className="results-stat-lbl">QUESTIONS</div>
        </div>
        <div className="results-stat glass-panel">
          <div className="results-stat-icon">⏱️</div>
          <div className="results-stat-val">{timeStr}</div>
          <div className="results-stat-lbl">TIME TAKEN</div>
        </div>
        <div className="results-stat glass-panel">
          <div className="results-stat-icon">🎯</div>
          <div className="results-stat-val">{confidence}%</div>
          <div className="results-stat-lbl">CONFIDENCE</div>
        </div>
        <div className="results-stat glass-panel">
          <div className="results-stat-icon">📊</div>
          <div className="results-stat-val">{grade}</div>
          <div className="results-stat-lbl">AI GRADE</div>
        </div>
      </div>

      {/* Player Card */}
      <div className="results-player glass-panel">
        <div className="section-label" style={{ color: player.color, marginBottom: '16px' }}>◈ FINAL ANSWER</div>
        <div className="results-player-avatar" style={{ background: `radial-gradient(circle at 30% 30%, ${player.color}40, #0B0E14)`, borderColor: player.color }}>
          {player.abbr}
        </div>
        <div className="results-player-flag">{player.flag}</div>
        <h2 className="results-player-name">{player.name}</h2>
        <div className="results-player-team" style={{ color: player.color }}>{player.team}</div>
        <div className="results-player-role">{player.role}</div>
      </div>

      {/* Play Again */}
      <div className="results-actions">
        <button className="btn-play-again" onClick={onPlayAgain}>
          <span>🏏</span>
          <span>PLAY AGAIN</span>
        </button>
      </div>
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
  const [startTime] = useState(() => Math.floor(Date.now() / 1000));
  const [endTime, setEndTime] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [candidateSnapshot, setCandidateSnapshot] = useState(() => getCandidateSnapshot(0, 12));

  const handleAnswer = (key, label) => {
    if (thinking) return;
    setThinking(true);
    
    const gain = key === "yes" ? 18 : key === "no" ? 16 : key === "maybe" ? 9 : 5;
    const noise = Math.floor(Math.random() * 8);
    const newConf = Math.min(97, confidence + gain + noise);
    const newHistory = [...history, { q: QUESTIONS[qIndex], a: label }];

    setTimeout(() => {
      setConfidence(newConf);
      setHistory(newHistory);
      setCandidateSnapshot(getCandidateSnapshot(qIndex + 1, newConf));
      
      if (newConf >= 80 || qIndex >= QUESTIONS.length - 1) {
        setPlayer(PLAYERS[Math.floor(Math.random() * PLAYERS.length)]);
        setScreen("guess");
      } else {
        setQIndex(qIndex + 1);
      }
      setThinking(false);
    }, 800 + Math.random() * 400);
  };

  const handleGuessResult = (wasCorrect) => {
    setEndTime(Math.floor(Date.now() / 1000));
    setGameResult(wasCorrect);
    setScreen("results");
  };

  const reset = () => {
    setScreen("game");
    setQIndex(0);
    setConfidence(12);
    setHistory([]);
    setThinking(false);
    setPlayer(null);
    setEndTime(null);
    setGameResult(null);
    setCandidateSnapshot(getCandidateSnapshot(0, 12));
  };

  const timeTakenSec = endTime ? endTime - startTime : 0;

  return (
    <>
      <Navbar />
      <div className="guess-page">
        <div className="guess-bg">
          <div className="guess-bg-glow"></div>

          {/* Wagon Wheel / Pitch Map Background */}
          <div className="wagon-wheel-wrap">
            <svg className="wagon-wheel-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer field boundary */}
              <circle cx="300" cy="300" r="280" stroke="rgba(0,242,255,0.08)" strokeWidth="1.5" />
              <circle cx="300" cy="300" r="220" stroke="rgba(0,242,255,0.06)" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx="300" cy="300" r="160" stroke="rgba(0,242,255,0.05)" strokeWidth="1" />
              <circle cx="300" cy="300" r="100" stroke="rgba(0,242,255,0.07)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="300" cy="300" r="40" stroke="rgba(0,242,255,0.06)" strokeWidth="1" />

              {/* 30-yard circle */}
              <circle cx="300" cy="300" r="130" stroke="rgba(245,158,11,0.08)" strokeWidth="1.5" strokeDasharray="8 4" />

              {/* Pitch rectangle */}
              <rect x="292" y="240" width="16" height="120" rx="2" stroke="rgba(0,242,255,0.12)" strokeWidth="1" fill="rgba(0,242,255,0.02)" />
              {/* Crease lines */}
              <line x1="280" y1="255" x2="320" y2="255" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="280" y1="345" x2="320" y2="345" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Wagon wheel spokes — field zones */}
              <line x1="300" y1="300" x2="300" y2="20" stroke="rgba(0,242,255,0.05)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="498" y2="100" stroke="rgba(0,242,255,0.04)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="580" y2="300" stroke="rgba(0,242,255,0.05)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="498" y2="500" stroke="rgba(0,242,255,0.04)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="300" y2="580" stroke="rgba(0,242,255,0.05)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="102" y2="500" stroke="rgba(0,242,255,0.04)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="20" y2="300" stroke="rgba(0,242,255,0.05)" strokeWidth="0.8" />
              <line x1="300" y1="300" x2="102" y2="100" stroke="rgba(0,242,255,0.04)" strokeWidth="0.8" />

              {/* Zone labels */}
              <text x="300" y="50" textAnchor="middle" fill="rgba(0,242,255,0.1)" fontSize="9" fontFamily="monospace">STRAIGHT</text>
              <text x="540" y="300" textAnchor="middle" fill="rgba(0,242,255,0.1)" fontSize="9" fontFamily="monospace">POINT</text>
              <text x="300" y="565" textAnchor="middle" fill="rgba(0,242,255,0.1)" fontSize="9" fontFamily="monospace">FINE LEG</text>
              <text x="60" y="300" textAnchor="middle" fill="rgba(0,242,255,0.1)" fontSize="9" fontFamily="monospace">MID-ON</text>
              <text x="475" y="120" textAnchor="middle" fill="rgba(0,242,255,0.08)" fontSize="8" fontFamily="monospace">COVER</text>
              <text x="475" y="490" textAnchor="middle" fill="rgba(0,242,255,0.08)" fontSize="8" fontFamily="monospace">SQUARE</text>
              <text x="125" y="490" textAnchor="middle" fill="rgba(0,242,255,0.08)" fontSize="8" fontFamily="monospace">LEG</text>
              <text x="125" y="120" textAnchor="middle" fill="rgba(0,242,255,0.08)" fontSize="8" fontFamily="monospace">MID-WKT</text>

              {/* Shot dots — simulated wagon wheel hits */}
              <circle cx="340" cy="120" r="3" fill="rgba(16,185,129,0.25)" />
              <circle cx="420" cy="180" r="2.5" fill="rgba(245,158,11,0.2)" />
              <circle cx="460" cy="260" r="3" fill="rgba(16,185,129,0.25)" />
              <circle cx="380" cy="350" r="2" fill="rgba(239,68,68,0.2)" />
              <circle cx="200" cy="200" r="3" fill="rgba(16,185,129,0.25)" />
              <circle cx="180" cy="380" r="2.5" fill="rgba(245,158,11,0.2)" />
              <circle cx="250" cy="150" r="2" fill="rgba(0,242,255,0.2)" />
              <circle cx="350" cy="450" r="3" fill="rgba(16,185,129,0.2)" />
              <circle cx="150" cy="280" r="2.5" fill="rgba(239,68,68,0.2)" />
              <circle cx="430" cy="400" r="2" fill="rgba(0,242,255,0.2)" />

              {/* Center dot */}
              <circle cx="300" cy="300" r="4" fill="rgba(0,242,255,0.15)" />
              <circle cx="300" cy="300" r="8" stroke="rgba(0,242,255,0.1)" strokeWidth="0.8" fill="none" />
            </svg>

            {/* Radar Sweep */}
            <div className="radar-sweep"></div>

            {/* Scan line */}
            <div className="radar-scanline"></div>
          </div>
        </div>

        {screen === "game" && (
          <GameScreen
            qIndex={qIndex}
            question={QUESTIONS[qIndex]}
            confidence={confidence}
            history={history}
            onAnswer={handleAnswer}
            thinking={thinking}
            candidateSnapshot={candidateSnapshot}
          />
        )}
        {screen === "guess" && player && (
          <GuessScreen
            player={player}
            confidence={confidence}
            onCorrect={handleGuessResult}
          />
        )}
        {screen === "results" && player && (
          <ResultsScreen
            player={player}
            confidence={confidence}
            questionsAsked={history.length}
            timeTakenSec={timeTakenSec}
            isCorrect={gameResult}
            onPlayAgain={reset}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
