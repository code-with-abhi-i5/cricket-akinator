import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer__top-line"></div>

      <div className="container footer__inner">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="10" cy="10" r="7" stroke="#00F2FF" strokeWidth="1.5" fill="rgba(0,242,255,0.08)" />
              <circle cx="10" cy="10" r="2.5" fill="#00F2FF" fillOpacity="0.4" />
              <rect x="18" y="14" width="4" height="14" rx="1.5" fill="rgba(0,242,255,0.15)" stroke="#00F2FF" strokeWidth="1" transform="rotate(-20 20 21)" />
            </svg>
            <span className="footer__logo-text">
              CRIC<span className="footer__logo-accent">GUESS</span> AI
            </span>
          </div>
          <p className="footer__brand-desc body-md">
            The most advanced AI-powered IPL player guessing platform. Built for the elite cricket mind. 🏏
          </p>
          <div className="footer__status">
            <span className="footer__status-dot"></span>
            <span className="footer__status-text">All Systems Operational</span>
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer__columns">
          <div className="footer__col">
            <h4 className="footer__col-title">🏏 Platform</h4>
            <ul className="footer__col-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#tactical">Play Now</a></li>
              <li><a href="#leaderboard">Leaderboard</a></li>
              <li><a href="#playbook">Playbook</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">📊 Resources</h4>
            <ul className="footer__col-links">
              <li><a href="#">API Docs</a></li>
              <li><a href="#">Player Database</a></li>
              <li><a href="#">Stats Archive</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">⚖️ Legal</h4>
            <ul className="footer__col-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            &copy; {currentYear} CricGuess AI. All rights reserved.
          </p>
          <div className="footer__tech">
            <span className="footer__tech-label">Powered by</span>
            <span className="footer__tech-value">🏏 Cricket Intelligence Engine v4.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
