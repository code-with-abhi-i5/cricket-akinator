import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        {/* Logo — Cricket Bat & Ball */}
        <Link to="/" className="navbar__logo" id="nav-logo">
          <span className="navbar__logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              {/* Cricket Ball */}
              <circle cx="10" cy="10" r="7" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.08)" />
              <path d="M5.5 5.5Q10 10.5 14.5 14.5" stroke="#00F2FF" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
              <circle cx="10" cy="10" r="2.5" fill="#00F2FF" fillOpacity="0.4" />
              {/* Cricket Bat */}
              <rect x="18" y="14" width="4" height="14" rx="1.5" fill="rgba(0,242,255,0.15)" stroke="#00F2FF" strokeWidth="1" transform="rotate(-20 20 21)" />
              <rect x="19" y="27" width="2" height="4" rx="1" fill="#00F2FF" fillOpacity="0.5" transform="rotate(-20 20 29)" />
            </svg>
          </span>
          <span className="navbar__logo-text">
            CRIC<span className="navbar__logo-accent">GUESS</span> AI
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links" id="nav-links">
          <li><Link to="/" className="navbar__link">Home</Link></li>
          <li><Link to="/guess" className="navbar__link">Play</Link></li>
          <li><a href="#leaderboard" className="navbar__link">Leaderboard</a></li>
        </ul>

        {/* CTA */}
        <div className="navbar__actions">
          <div className="navbar__status" id="nav-status">
            <span className="navbar__status-dot"></span>
            <span className="navbar__status-text">🏏 LIVE</span>
          </div>
          <Link to="/guess" className="btn-tactical btn-primary navbar__cta" id="nav-cta">
            Launch Game
          </Link>
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
          <li><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
          <li><Link to="/guess" onClick={() => setMobileOpen(false)}>Play</Link></li>
          <li><a href="#leaderboard" onClick={() => setMobileOpen(false)}>Leaderboard</a></li>
          <li>
            <Link to="/guess" className="btn-tactical btn-primary" onClick={() => setMobileOpen(false)} style={{marginTop: '16px', width: '100%', justifyContent: 'center'}}>
              Launch Game
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
