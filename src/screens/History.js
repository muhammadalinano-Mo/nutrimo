import React from 'react';
import { useNavigate } from 'react-router-dom';

function History() {
  const navigate = useNavigate();
  const history = JSON.parse(
    localStorage.getItem('fridgefix_history') || '[]'
  );

  const scoreColor = (score) => {
    if (score >= 75) return '#1B4332';
    if (score >= 50) return '#E76F51';
    return '#C1121F';
  };

  const scoreLabel = (score) => {
    if (score >= 75) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 35) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 100%)',
        padding: '3rem 1.5rem 1.5rem',
      }}>
        <button
          onClick={() => navigate('/')}
          className="text-green-300 text-sm mb-4 press-effect"
        >
          ← Back
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
        }}>
          My Journey 📊
        </h1>
        <p className="text-green-200 text-sm mt-1">
          Your nutritional progress over time
        </p>
      </div>

      <div className="flex-1 p-4">

        {history.length === 0 ? (

          <div className="flex flex-col items-center justify-center
                          h-64 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="font-bold text-fridge-green text-lg mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              No scans yet
            </h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed
                           max-w-xs">
              Your scan history will appear here after your
              first fridge analysis
            </p>
            <button
              onClick={() => navigate('/scan')}
              className="press-effect text-white px-8 py-3
                         rounded-2xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
              }}
            >
              Do My First Scan
            </button>
          </div>

        ) : (

          <div className="space-y-4">

            <p className="text-gray-400 text-xs font-medium
                           tracking-widest uppercase">
              {history.length} scan{history.length !== 1 ? 's' : ''} recorded
            </p>

            {history.map((scan, i) => (
              <div key={i}
                className="bg-white rounded-3xl overflow-hidden card-shadow">

                {/* Score header */}
                <div className="p-4 flex items-center justify-between"
                  style={{
                    borderBottom: '1px solid #F4ECD8',
                  }}>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      📅 {scan.date}
                    </p>
                    <p className="font-semibold text-sm text-gray-700">
                      {scan.ingredients?.length} ingredients scanned
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        color: scoreColor(scan.score),
                      }}>
                      {scan.score}
                    </p>
                    <p className="text-xs font-semibold"
                      style={{ color: scoreColor(scan.score) }}>
                      {scoreLabel(scan.score)}
                    </p>
                  </div>
                </div>

                {/* Score bar */}
                <div className="px-4 pt-3">
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${scan.score}%`,
                        backgroundColor: scoreColor(scan.score),
                      }}
                    />
                  </div>
                  {scan.scoreMessage && (
                    <p className="text-xs text-gray-400 mt-2
                                   leading-relaxed">
                      {scan.scoreMessage}
                    </p>
                  )}
                </div>

                {/* Missing nutrients */}
                {scan.breakdown && (
                  <div className="px-4 pb-2 pt-3">
                    <p className="text-xs font-semibold text-gray-500
                                   mb-2 uppercase tracking-widest">
                      Missing
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scan.breakdown
                        .filter(n => !n.covered)
                        .slice(0, 6)
                        .map((n, j) => (
                          <span key={j}
                            className="text-xs px-2 py-0.5 rounded-full
                                       font-medium"
                            style={{
                              backgroundColor: n.importance === 'critical'
                                ? '#FEE2E2'
                                : n.importance === 'high'
                                  ? '#FEF3C7'
                                  : '#F3F4F6',
                              color: n.importance === 'critical'
                                ? '#DC2626'
                                : n.importance === 'high'
                                  ? '#D97706'
                                  : '#6B7280',
                            }}>
                            {n.emoji} {n.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Covered nutrients */}
                {scan.breakdown && (
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-xs font-semibold text-gray-500
                                   mb-2 uppercase tracking-widest">
                      Covered
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scan.breakdown
                        .filter(n => n.covered)
                        .map((n, j) => (
                          <span key={j}
                            className="text-xs px-2 py-0.5 rounded-full
                                       font-medium bg-green-50 text-green-700">
                            {n.emoji} {n.name}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              </div>
            ))}

            <button
              onClick={() => {
                localStorage.removeItem('fridgefix_history');
                window.location.reload();
              }}
              className="w-full text-red-400 text-sm py-2 font-medium"
            >
              Clear All History
            </button>

          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="p-4">
        <button
          onClick={() => navigate('/scan')}
          className="w-full py-4 rounded-2xl font-bold text-white
                     text-base press-effect"
          style={{
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            boxShadow: '0 8px 24px rgba(27, 67, 50, 0.3)',
          }}
        >
          🔍 New Scan
        </button>
      </div>

    </div>
  );
}

export default History;