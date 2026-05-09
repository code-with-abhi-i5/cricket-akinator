import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

// Counter Component
const StatCounter = ({ end, suffix = '', duration = 2000, isFloat = false }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
};

// Typewriter Component
const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayedText}<span className="cursor-blink">_</span></span>;
};

export default function Hero() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section className="hero" id="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* Background Elements */}
      <div className="hero__bg">
        <div className="hero__grid" style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}></div>
        <div className="hero__vignette"></div>
        <div className="hero__glow hero__glow--1" style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)` }}></div>
        <div className="hero__glow hero__glow--2" style={{ transform: `translate(${mousePos.x * -50}px, ${mousePos.y * -50}px)` }}></div>
        <div className="hero__pitch-wrapper" style={{ transform: `translate(calc(-50% + ${mousePos.x * 40}px), calc(-50% + ${mousePos.y * 40}px))` }}>
          <div className="hero__pitch-tracker">
            {/* Pitch Area */}
            <div className="pitch-surface"></div>
            
            {/* Creases */}
            <div className="pitch-crease pitch-crease--top"></div>
            <div className="pitch-crease pitch-crease--bottom"></div>
            
            {/* Stumps */}
            <div className="stumps stumps--top">
              <div className="stump"></div><div className="stump"></div><div className="stump"></div>
            </div>
            <div className="stumps stumps--bottom">
              <div className="stump"></div><div className="stump"></div><div className="stump"></div>
            </div>

            {/* Hawk-Eye Trajectory */}
            <div className="hawk-eye-track">
              <div className="ball-bounce"></div>
              <div className="ball-path"></div>
              <div className="ball-current"></div>
            </div>
          </div>
        </div>

        {/* Floating Widgets */}
        <div className="hero__floating-widget widget-1" style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}>
          <span className="widget-icon">🏏</span>
          [ PITCH MAP: GOOD LENGTH ]
        </div>
        <div className="hero__floating-widget widget-2" style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px)` }}>
          <span className="widget-icon">⚡</span>
          [ SPIN RATE: 2400 RPM ]
        </div>
        <div className="hero__floating-widget widget-3" style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -20}px)` }}>
          <span className="widget-icon">🎯</span>
          [ IMPACT: IN-LINE ]
        </div>
      </div>

      <div className="container hero__content">
        <div className="hero__badge" id="hero-badge">
          <span className="hero__badge-dot"></span>
          <span>COMMAND CENTER — SEASON 2026</span>
        </div>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__title-line">Decode the Stats.</span>
          <span className="hero__title-line hero__title-line--accent">Guess the Legend.</span>
        </h1>

        <p className="hero__subtitle body-lg" id="hero-subtitle">
          <TypewriterText text="The most advanced AI-powered IPL player guessing platform. Analyze stats, track performance, and prove your cricket IQ." delay={1000} />
        </p>

        <div className="hero__actions" id="hero-actions">
          <Link to="/guess" className="btn-tactical btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 3.5l5 4.5-5 4.5V3.5z" />
            </svg>
            Start Playing
          </Link>
          <a href="#playbook" className="btn-tactical btn-secondary">
            View Playbook
          </a>
        </div>

        {/* Stats Bar */}
        <div className="hero__stats" id="hero-stats">
          <div className="hero__stat">
            <span className="hero__stat-value stat-value"><StatCounter end={2.4} isFloat={true} suffix="M+" /></span>
            <span className="hero__stat-label">Games Played</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-value stat-value"><StatCounter end={150} suffix="K+" /></span>
            <span className="hero__stat-label">Active Players</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-value stat-value"><StatCounter end={98.7} isFloat={true} suffix="%" /></span>
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
