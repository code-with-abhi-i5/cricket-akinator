import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cta--visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta" id="cta" ref={sectionRef}>
      {/* Background Effects */}
      <div className="cta__bg">
        <div className="cta__bg-grid"></div>
        <div className="cta__bg-glow cta__bg-glow--1"></div>
        <div className="cta__bg-glow cta__bg-glow--2"></div>
        <div className="cta__bg-glow cta__bg-glow--3"></div>
      </div>

      <div className="container cta__inner">
        <div className="cta__card glass-panel">
          {/* Corner accents */}
          <div className="cta__corner cta__corner--tl"></div>
          <div className="cta__corner cta__corner--tr"></div>
          <div className="cta__corner cta__corner--bl"></div>
          <div className="cta__corner cta__corner--br"></div>

          <span className="section-label cta__label">// Engage Protocol</span>

          <h2 className="cta__title" id="cta-title">
            Ready to prove your<br />
            <span className="cta__title-accent">cricket IQ?</span>
          </h2>

          <p className="body-lg cta__desc" id="cta-desc">
            The stadium lights are on. The crowd is waiting. Your turn at the crease.
          </p>

          <div className="cta__actions" id="cta-actions">
            <Link to="/guess" className="btn-tactical btn-primary cta__btn-main">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M7 4l7 5-7 5V4z" />
              </svg>
              Enter the Arena
            </Link>
            <a href="#playbook" className="btn-tactical btn-secondary">
              Review Playbook
            </a>
          </div>

          {/* Bottom stats ribbon */}
          <div className="cta__ribbon">
            <div className="cta__ribbon-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="#2ECC71" strokeWidth="1.5" />
                <circle cx="7" cy="7" r="2" fill="#2ECC71" />
              </svg>
              <span>Free to Play</span>
            </div>
            <div className="cta__ribbon-sep"></div>
            <div className="cta__ribbon-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2l1.5 3 3.5.5-2.5 2.5.6 3.5L7 9.75 3.9 11.5l.6-3.5L2 5.5 5.5 5 7 2z" stroke="#00F2FF" strokeWidth="1" fill="rgba(0,242,255,0.2)" />
              </svg>
              <span>No Sign-up Required</span>
            </div>
            <div className="cta__ribbon-sep"></div>
            <div className="cta__ribbon-item">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="2" y="2" width="10" height="10" rx="2" stroke="#00F2FF" strokeWidth="1.5" />
                <line x1="5" y1="7" x2="9" y2="7" stroke="#00F2FF" strokeWidth="1.5" />
                <line x1="7" y1="5" x2="7" y2="9" stroke="#00F2FF" strokeWidth="1.5" />
              </svg>
              <span>Instant Matchmaking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
