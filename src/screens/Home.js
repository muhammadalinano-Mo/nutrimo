import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FLOATING_EMOJIS = ['🫚', '🥗', '🧄', '🌶️', '🫙', '🐟', '🫐', '🧅'];

function Home() {
  const navigate = useNavigate();
  const [lastKitchenScore, setLastKitchenScore] = useState(null);
  const [lastDailyScore, setLastDailyScore] = useState(null);

  useEffect(() => {
    const history = JSON.parse(
      localStorage.getItem('nutrimo_history') || '[]'
    );
    if (history.length > 0) {
      setLastKitchenScore(history[0].score);
    }
    const dailyHistory = JSON.parse(
      localStorage.getItem('nutrimo_daily_history') || '[]'
    );
    if (dailyHistory.length > 0) {
      setLastDailyScore(dailyHistory[0].score);
    }
  }, []);

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col spice-bg">

      {/* Hero Header */}
      <div className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)',
          paddingTop: '3rem',
          paddingBottom: '2.5rem',
        }}>

        {/* Floating background emojis */}
        {FLOATING_EMOJIS.map((emoji, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-10 select-none"
            style={{
              left: `${(i * 13) % 90}%`,
              top: `${(i * 17) % 80}%`,
              animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {emoji}
          </span>
        ))}

        {/* Logo and tagline */}
        <div className="relative px-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-fridge-gold rounded-xl
                            flex items-center justify-center text-lg">
              🥗
            </div>
            <span className="text-white text-sm font-semibold
                             tracking-widest uppercase opacity-80">
              NutriMo
            </span>
          </div>
          <h1 className="text-white mt-3 leading-tight"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem',
              fontWeight: 800,
            }}>
            Balance today.
            <br />
            <span style={{ color: '#F4A261' }}>
              Feel it tomorrow.
            </span>
          </h1>
          <p className="text-green-200 text-sm mt-2 leading-relaxed
                        max-w-xs">
            Nordic science meets South Asian wisdom —
            your personal nutritionist lives here.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-5 py-5 space-y-4">

        {/* PATH A — Kitchen Scanner */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase
                         tracking-widest mb-2 px-1">
            Kitchen Scanner
          </p>
          <button
            onClick={() => navigate('/scan')}
            className="w-full press-effect"
            style={{
              background:
                'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
              borderRadius: '20px',
              padding: '20px 24px',
              boxShadow: '0 8px 24px rgba(27, 67, 50, 0.3)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-green-300 text-xs font-semibold
                               tracking-widest uppercase mb-1">
                  What do I have?
                </p>
                <p className="text-white font-bold text-xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Scan My Kitchen
                </p>
                <p className="text-green-200 text-xs mt-1">
                  Score your ingredients · Get recipes
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 bg-white bg-opacity-15
                                rounded-2xl flex items-center
                                justify-center text-3xl">
                  🥗
                </div>
                {lastKitchenScore && (
                  <span className="text-xs text-green-300 font-bold">
                    Last: {lastKitchenScore}/100
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* PATH B — Daily Food Log */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase
                         tracking-widest mb-2 px-1">
            Daily Food Log
          </p>
          <button
            onClick={() => navigate('/today')}
            className="w-full press-effect"
            style={{
              background:
                'linear-gradient(135deg, #E76F51 0%, #F4A261 100%)',
              borderRadius: '20px',
              padding: '20px 24px',
              boxShadow: '0 8px 24px rgba(231, 111, 81, 0.35)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-orange-100 text-xs font-semibold
                               tracking-widest uppercase mb-1">
                  What did I eat?
                </p>
                <p className="text-white font-bold text-xl"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Log Today's Meals
                </p>
                <p className="text-orange-100 text-xs mt-1">
                  Find gaps · Get tomorrow's plan
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 bg-white bg-opacity-20
                                rounded-2xl flex items-center
                                justify-center text-3xl">
                  📅
                </div>
                {lastDailyScore && (
                  <span className="text-xs text-orange-100 font-bold">
                    Last: {lastDailyScore}/100
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Two cultures card */}
        <div className="rounded-3xl p-5"
          style={{
            background:
              'linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)',
          }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🇸🇪</span>
            <span className="text-green-300 text-sm">+</span>
            <span className="text-2xl">🌶️</span>
            <p className="text-white font-bold text-sm ml-1"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              Two Food Traditions
            </p>
          </div>
          <p className="text-green-200 text-xs leading-relaxed">
            Nordic food wisdom meets 5,000 years of South Asian
            spice medicine. Two cultures that independently
            discovered food as medicine — combined for you.
          </p>
        </div>

        {/* History */}
        <button
          onClick={() => navigate('/history')}
          className="w-full flex items-center justify-between
                     bg-white rounded-2xl p-4 card-shadow press-effect"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fridge-light
                            flex items-center justify-center text-lg">
              📊
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-700 text-sm">
                View My History
              </p>
              <p className="text-gray-400 text-xs">
                Kitchen scans and daily logs
              </p>
            </div>
          </div>
          <span className="text-gray-300 text-lg">→</span>
        </button>

        <div className="h-4" />
      </div>
    </div>
  );
}

export default Home;