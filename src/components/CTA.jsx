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
        <div className="cta__bg-stadium">
          <img src="/images/cricket-field-aerial.png" alt="" aria-hidden="true" />
        </div>
        <div className="cta__bg-overlay"></div>
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

          <span className="section-label cta__label">🏏 Match Ready</span>

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
              <span className="cta__ribbon-emoji">🏏</span>
              <span>Free to Play</span>
            </div>
            <div className="cta__ribbon-sep"></div>
            <div className="cta__ribbon-item">
              <span className="cta__ribbon-emoji">⭐</span>
              <span>No Sign-up Required</span>
            </div>
            <div className="cta__ribbon-sep"></div>
            <div className="cta__ribbon-item">
              <span className="cta__ribbon-emoji">⚡</span>
              <span>Instant Matchmaking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
