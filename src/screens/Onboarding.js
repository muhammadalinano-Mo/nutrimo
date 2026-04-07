import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    emoji: '🔬',
    title: 'Find what your\nbody is missing',
    description: 'NutriMo analyses your kitchen ingredients against 15 key nutrients based on Nordic Nutrition Recommendations 2023. You see exactly what is missing and why it matters.',
    bg: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 100%)',
    accent: '#F4A261',
  },
  {
    emoji: '🍳',
    title: 'Fix it with food\nnot supplements',
    description: 'Get personalised recipes from Swedish, South Asian and Mediterranean traditions. Two of the world\'s most health-conscious food cultures — combined for you.',
    bg: 'linear-gradient(160deg, #C25A3A 0%, #E76F51 100%)',
    accent: '#FFF3E0',
  },
  {
    emoji: '🌅',
    title: 'Balance today.\nFeel it tomorrow.',
    description: 'Log what you ate today and get a personalised rebalancing plan for tomorrow. NutriMo never judges — it just helps you find your way back to balance.',
    bg: 'linear-gradient(160deg, #1a3a5c 0%, #2563EB 100%)',
    accent: '#F4A261',
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      // Mark onboarding as done
      localStorage.setItem('nutrimo_onboarded', 'true');
      navigate('/');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('nutrimo_onboarded', 'true');
    navigate('/');
  };

  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  return (
    <div className="min-h-screen flex flex-col"
      style={{ background: slide.bg, transition: 'background 0.5s ease' }}>

      {/* Skip button */}
      <div className="flex justify-end p-6 pt-12">
        {!isLast && (
          <button
            onClick={handleSkip}
            className="text-white text-sm font-medium opacity-60"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center
                      px-8 text-center">

        {/* Emoji */}
        <div className="text-8xl mb-8"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}>
          {slide.emoji}
        </div>

        {/* Title */}
        <h1 className="text-white font-bold mb-4 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            whiteSpace: 'pre-line',
          }}>
          {slide.title}
        </h1>

        {/* Description */}
        <p className="text-sm leading-relaxed max-w-xs"
          style={{ color: 'rgba(255,255,255,0.75)' }}>
          {slide.description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="p-8 pb-12">

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                backgroundColor: i === current
                  ? 'white'
                  : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        {/* Next / Get Started button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-lg
                     press-effect"
          style={{
            backgroundColor: 'white',
            color: '#1B4332',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}
        >
          {isLast ? '🥗 Get Started' : 'Next →'}
        </button>

        {/* Two cultures note on last slide */}
        {isLast && (
          <p className="text-center text-xs mt-4"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            🇸🇪 Swedish · 🌶️ South Asian · 🫒 Mediterranean
          </p>
        )}
      </div>
    </div>
  );
}

export default Onboarding;