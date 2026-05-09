import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#" className="navbar__logo" id="nav-logo">
          <span className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#00F2FF" strokeWidth="2" />
              <circle cx="14" cy="14" r="6" fill="#00F2FF" fillOpacity="0.3" />
              <circle cx="14" cy="14" r="3" fill="#00F2FF" />
              <line x1="14" y1="2" x2="14" y2="8" stroke="#00F2FF" strokeWidth="1.5" />
              <line x1="14" y1="20" x2="14" y2="26" stroke="#00F2FF" strokeWidth="1.5" />
              <line x1="2" y1="14" x2="8" y2="14" stroke="#00F2FF" strokeWidth="1.5" />
              <line x1="20" y1="14" x2="26" y2="14" stroke="#00F2FF" strokeWidth="1.5" />
            </svg>
          </span>
          <span className="navbar__logo-text">
            CRIC<span className="navbar__logo-accent">GUESS</span> AI
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar__links" id="nav-links">
          <li><a href="#hero" className="navbar__link">Home</a></li>
          <li><a href="#tactical" className="navbar__link">Play</a></li>
          <li><a href="#leaderboard" className="navbar__link">Leaderboard</a></li>
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <div className="navbar__status" id="nav-status">
            <span className="navbar__status-dot"></span>
            <span className="navbar__status-text">LIVE</span>
          </div>
          <a href="#cta" className="btn-tactical btn-primary navbar__cta" id="nav-cta">
            Launch Game
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`} id="mobile-menu">
        <ul className="navbar__mobile-links">
          <li><a href="#hero" onClick={() => setMobileOpen(false)}>Home</a></li>
          <li><a href="#tactical" onClick={() => setMobileOpen(false)}>Play</a></li>
          <li><a href="#leaderboard" onClick={() => setMobileOpen(false)}>Leaderboard</a></li>
          <li>
            <a href="#cta" className="btn-tactical btn-primary" onClick={() => setMobileOpen(false)} style={{marginTop: '16px', width: '100%', justifyContent: 'center'}}>
              Launch Game
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
