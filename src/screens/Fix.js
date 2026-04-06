import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Fix() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('swedish');

  const latestHistory = JSON.parse(
    localStorage.getItem('nutrimo_history') || '[]'
  )[0];

  const aiData = latestHistory?.aiData;

  if (!aiData) {
    return (
      <div className="min-h-screen bg-fridge-light flex flex-col
                      items-center justify-center p-6">
        <div className="text-6xl mb-4 animate-bounce">🍳</div>
        <h2 className="text-fridge-green font-bold text-xl mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          No results yet
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Scan your fridge first to get your personalised fix
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="press-effect text-white px-8 py-3 rounded-2xl
                     font-semibold"
          style={{
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
          }}
        >
          Scan My Fridge
        </button>
      </div>
    );
  }

  const tabs = [
    {
      id: 'swedish',
      emoji: '🇸🇪',
      label: 'Swedish',
      data: aiData.swedish_fix,
      gradient: 'linear-gradient(135deg, #1a3a5c, #2563EB)',
      lightBg: '#EFF6FF',
      textColor: '#1D4ED8',
      wisdom: 'Nordic food culture has always treated nature as a pharmacy. From rosehip for Vitamin C to fatty fish for Vitamin D — the Swedish kitchen is deeply functional medicine going back centuries.',
    },
    {
      id: 'south_asian',
      emoji: '🌶️',
      label: 'South Asian',
      data: aiData.south_asian_fix,
      gradient: 'linear-gradient(135deg, #7C2D12, #E76F51)',
      lightBg: '#FFF7ED',
      textColor: '#C2410C',
      wisdom: 'South Asian cuisine from India, Pakistan, Bangladesh and Sri Lanka has used spices as medicine for over 5,000 years. Turmeric, fenugreek, cumin and black seed are not just flavour — they are clinically studied compounds.',
    },
    {
      id: 'fusion',
      emoji: '✨',
      label: 'Fusion',
      data: aiData.fusion_fix,
      gradient: 'linear-gradient(135deg, #1B4332, #F4A261)',
      lightBg: '#F0FDF4',
      textColor: '#166534',
      wisdom: 'When Swedish and South Asian food wisdom meet, something remarkable happens. Filmjolk + turmeric. Lingonberries + ginger. Rye + methi. Two ancient traditions creating one nutritionally superior result.',
    },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);
  const recipe = activeTabData?.data;

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #C25A3A 0%, #E76F51 50%, #F4A261 100%)',
        padding: '3rem 1.5rem 1.5rem',
      }}>
        <button
          onClick={() => navigate('/results')}
          className="text-orange-200 text-sm mb-4 press-effect"
        >
          ← Back to Results
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
        }}>
          Tonight's Fix 🍳
        </h1>
        <p className="text-orange-100 text-sm mt-1">
          Three ways to close your nutritional gaps
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex bg-white shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-3 text-xs font-bold transition-all
                       flex flex-col items-center gap-0.5"
            style={{
              borderBottom: activeTab === tab.id
                ? '3px solid #E76F51'
                : '3px solid transparent',
              color: activeTab === tab.id ? '#E76F51' : '#9CA3AF',
            }}
          >
            <span className="text-lg">{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">

        {recipe ? (
          <>
            {/* Recipe hero card */}
            <div className="rounded-3xl overflow-hidden card-shadow">
              <div className="p-5" style={{ background: activeTabData.gradient }}>
                <div className="flex items-start gap-3">
                  <span className="text-4xl">{activeTabData.emoji}</span>
                  <div>
                    <p className="text-white text-xs font-semibold
                                   tracking-widest uppercase opacity-70 mb-1">
                      {activeTabData.label} Recipe
                    </p>
                    <h2 className="text-white font-bold text-lg leading-snug"
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                      {recipe.name}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {recipe.why}
                </p>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-3xl p-5 card-shadow">
              <h3 className="font-bold text-gray-800 mb-4 flex
                              items-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                🧾 Ingredients
                <span className="text-xs text-gray-400 font-normal
                                  ml-1 bg-gray-100 px-2 py-0.5 rounded-full">
                  {recipe.ingredients?.length} items
                </span>
              </h3>
              <div className="space-y-2">
                {recipe.ingredients?.map((ing, i) => (
                  <div key={i}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ backgroundColor: activeTabData.lightBg }}>
                    <span className="w-6 h-6 rounded-full flex items-center
                                     justify-center text-white text-xs
                                     font-bold flex-shrink-0"
                      style={{ background: activeTabData.gradient }}>
                      {i + 1}
                    </span>
                    <span className="text-gray-700 text-sm font-medium">
                      {ing}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cultural wisdom */}
            <div className="rounded-3xl p-4 card-shadow"
              style={{ backgroundColor: activeTabData.lightBg }}>
              <p className="font-bold text-xs mb-2 tracking-widest
                             uppercase"
                style={{ color: activeTabData.textColor }}>
                {activeTab === 'swedish' ? '🌲 Nordic Wisdom'
                  : activeTab === 'south_asian' ? '🌿 Ancient Wisdom'
                  : '✨ Why This Fusion Works'}
              </p>
              <p className="text-sm leading-relaxed"
                style={{ color: activeTabData.textColor }}>
                {activeTabData.wisdom}
              </p>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl p-6 text-center card-shadow">
            <p className="text-gray-400 text-sm">
              Recipe not available — try scanning again
            </p>
          </div>
        )}

        {/* Shopping List */}
        {aiData.shopping_list && aiData.shopping_list.length > 0 && (
          <div className="bg-white rounded-3xl p-5 card-shadow">
            <h3 className="font-bold text-gray-800 mb-1"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              🛒 Buy This Week
            </h3>
            <p className="text-gray-400 text-xs mb-4">
              These 3 ingredients will close your biggest gaps
            </p>
            <div className="space-y-3">
              {aiData.shopping_list.map((item, i) => (
                <div key={i} className="rounded-2xl p-4"
                  style={{ backgroundColor: '#FFFBF5' }}>
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-xl flex items-center
                                     justify-center text-white text-sm
                                     font-bold flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                      }}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-bold mb-1">
                        {typeof item === 'object' ? item.item : item}
                      </p>
                      {typeof item === 'object' && item.reason && (
                        <p className="text-xs text-gray-500 mb-1
                                       leading-relaxed">
                          💊 {item.reason}
                        </p>
                      )}
                      {typeof item === 'object' && item.where && (
                        <p className="text-xs font-semibold"
                          style={{ color: '#1B4332' }}>
                          📍 {item.where}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spice Tip */}
        {aiData.spice_tip && (
          <div className="rounded-3xl p-5 card-shadow"
            style={{
              background: 'linear-gradient(135deg, #7C2D12, #E76F51)',
            }}>
            <h3 className="text-white font-bold mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}>
              🌶️ Spice Wisdom
            </h3>
            <p className="text-orange-100 text-sm leading-relaxed">
              {aiData.spice_tip}
            </p>
          </div>
        )}

        {/* Buttons */}
        <button
          onClick={() => navigate('/scan')}
          className="w-full py-4 rounded-2xl font-bold text-white
                     text-base press-effect"
          style={{
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
            boxShadow: '0 8px 24px rgba(27, 67, 50, 0.3)',
          }}
        >
          🔍 Scan Again
        </button>

        <button
          onClick={() => navigate('/history')}
          className="w-full py-3 rounded-2xl font-semibold text-sm
                     border-2 press-effect"
          style={{
            borderColor: '#1B4332',
            color: '#1B4332',
          }}
        >
          📊 View History
        </button>

        <div className="h-6" />
      </div>
    </div>
  );
}

export default Fix;