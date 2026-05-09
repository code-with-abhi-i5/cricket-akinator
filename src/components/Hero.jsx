import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero--visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Background Elements */}
      <div className="hero__bg">
        <div className="hero__grid"></div>
        <div className="hero__vignette"></div>
        <div className="hero__glow hero__glow--1"></div>
        <div className="hero__glow hero__glow--2"></div>
        <div className="hero__radar">
          <div className="hero__radar-ring hero__radar-ring--1"></div>
          <div className="hero__radar-ring hero__radar-ring--2"></div>
          <div className="hero__radar-ring hero__radar-ring--3"></div>
          <div className="hero__radar-sweep"></div>
        </div>
      </div>

      <div className="container hero__content">
        <div className="hero__badge" id="hero-badge">
          <span className="hero__badge-dot"></span>
          <span>COMMAND CENTER — SEASON 2026</span>
        </div>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__title-line">Master the Game.</span>
          <span className="hero__title-line hero__title-line--accent">Guess the Star.</span>
        </h1>

        <p className="hero__subtitle body-lg" id="hero-subtitle">
          The most advanced AI-powered IPL player guessing platform. Analyze stats,
          track performance, and prove your cricket IQ.
        </p>

        <div className="hero__actions" id="hero-actions">
          <a href="#tactical" className="btn-tactical btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 3.5l5 4.5-5 4.5V3.5z" />
            </svg>
            Start Playing
          </a>
          <a href="#playbook" className="btn-tactical btn-secondary">
            View Playbook
          </a>
        </div>

        {/* Stats Bar */}
        <div className="hero__stats" id="hero-stats">
          <div className="hero__stat">
            <span className="hero__stat-value stat-value">2.4M+</span>
            <span className="hero__stat-label">Games Played</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-value stat-value">150K+</span>
            <span className="hero__stat-label">Active Players</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-value stat-value">98.7%</span>
            <span className="hero__stat-label">AI Accuracy</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-value stat-value">IPL 2026</span>
            <span className="hero__stat-label">Current Season</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" id="hero-scroll">
        <div className="hero__scroll-line"></div>
        <span className="hero__scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
