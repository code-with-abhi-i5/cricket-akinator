import { useEffect, useRef } from 'react';
import './Playbook.css';

const steps = [
  {
    id: 'select-era',
    number: '01',
    emoji: '🏏',
    title: 'Select Your Era',
    description: 'Choose between Classic IPL, Modern Day, or specific franchise legends. Each era presents unique challenges and player pools.',
    tag: 'STRATEGY',
    tagColor: 'cyan',
  },
  {
    id: 'decode-clues',
    number: '02',
    emoji: '📊',
    title: 'Decode The Clues',
    description: 'Analyze AI-generated career paths — batting averages, bowling figures, iconic innings, and key dismissals. Every data point is a piece of the puzzle.',
    tag: 'ANALYSIS',
    tagColor: 'green',
  },
  {
    id: 'claim-title',
    number: '03',
    emoji: '🏆',
    title: 'Claim the Title',
    description: 'Submit your guess and earn runs based on speed and accuracy. Rise through the ranks from a nets bowler to the ultimate cricket oracle.',
    tag: 'VICTORY',
    tagColor: 'cyan',
  },
];

export default function Playbook() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('playbook--visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="playbook" id="playbook" ref={sectionRef}>
      <div className="container">
        <div className="playbook__header">
          <span className="section-label">⚡ Match Protocol</span>
          <h2 className="headline-xl" id="playbook-title">The Playbook</h2>
          <p className="body-lg playbook__desc">
            Mastering CricGuess AI requires more than just luck — it requires tactical insight and deep cricket knowledge.
          </p>
        </div>

        <div className="playbook__timeline" id="playbook-timeline">
          <div className="playbook__timeline-line"></div>

          {steps.map((step, index) => (
            <div
              className="playbook__step"
              key={step.id}
              id={`playbook-step-${step.id}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="playbook__step-connector">
                <div className="playbook__step-dot">
                  <span className="playbook__step-emoji">{step.emoji}</span>
                </div>
                {index < steps.length - 1 && <div className="playbook__step-line"></div>}
              </div>

              <div className="playbook__step-card glass-panel">
                <div className="playbook__step-card-top">
                  <span className="playbook__step-number">{step.number}</span>
                  <span className={`playbook__step-tag playbook__step-tag--${step.tagColor}`}>
                    {step.tag}
                  </span>
                </div>
                <h3 className="headline-md playbook__step-title">{step.title}</h3>
                <p className="body-md playbook__step-desc">{step.description}</p>

                {/* Decorative scan line */}
                <div className="playbook__step-scan"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
