import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateNutritionScore } from '../nutritionEngine';

const JUNK_FOODS = [
  'Pizza', 'Burger', 'Hot dog', 'Falukorv', 'Sausages',
  'Frozen pizza', 'Crisps', 'Chocolate', 'Ice cream',
  'Soft drink', 'Energy drink', 'Takeaway', 'Frozen meal',
  'Bacon', 'Cake', 'Sweets', 'Popcorn', 'Biscuits', 'Pizza slice',
];

const SWAP_TIPS = {
  'Pizza': 'Top your pizza with rocket and chilli flakes after baking — adds folate and antioxidants in 10 seconds',
  'Burger': 'Add sliced tomato and spinach to your burger — doubles the micronutrient value instantly',
  'Hot dog': 'Dip in a mustard seed and turmeric sauce — adds iron absorption boosters',
  'Falukorv': 'Serve with beetroot and dill — classic Swedish combo that adds folate and antioxidants',
  'Sausages': 'Pair with sauteed kale and garlic — adds Vitamin C which boosts the iron from sausages',
  'Frozen pizza': 'Add an egg on top before baking — adds Vitamin D and protein for almost zero effort',
  'Crisps': 'Swap half the crisps for a small handful of mixed nuts — same crunch, completely different nutrition',
  'Chocolate': 'Choose dark chocolate 70%+ — same satisfaction, significantly more magnesium and antioxidants',
  'Takeaway': 'Add a side salad or ask for extra vegetables — closes the fibre gap from processed takeaway',
  'Instant noodles': 'Add an egg, frozen spinach and a pinch of turmeric — same comfort, three extra nutrients',
  'Bacon': 'Pair with eggs and a handful of spinach — the Vitamin C in spinach boosts iron from bacon',
};

function TodayResults() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [nutritionData, setNutritionData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('gaps');

  const todayFoods = JSON.parse(
    localStorage.getItem('nutrimo_today') || '[]'
  );

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    try {
      setLoading(true);

      // Score today's food
      const nutrition = calculateNutritionScore(todayFoods);
      setNutritionData(nutrition);

      const missingNutrients = nutrition.breakdown
        .filter(n => !n.covered)
        .map(n => n.name)
        .slice(0, 5)
        .join(', ');

      const junkEaten = todayFoods
        .filter(f => JUNK_FOODS.includes(f))
        .join(', ');

      const prompt = `You are NutriMo — a nutritionist with deep expertise in Swedish/Nordic and South Asian food traditions.

A user ate these foods today: ${todayFoods.join(', ')}.

Their nutritional gaps from today are: ${missingNutrients}.
${junkEaten ? `Processed foods eaten: ${junkEaten}.` : ''}

Return ONLY a raw JSON object. No markdown. No backticks. Just JSON.

{
  "day_summary": "one warm encouraging sentence summarising their day nutritionally — acknowledge what was good, mention what was missing",
  "tomorrow_breakfast": {
    "name": "specific breakfast dish name",
    "ingredients": ["item 1", "item 2", "item 3"],
    "closes": "which nutrient gap this closes",
    "culture": "Swedish or South Asian or Fusion"
  },
  "tomorrow_lunch": {
    "name": "specific lunch dish name",
    "ingredients": ["item 1", "item 2", "item 3"],
    "closes": "which nutrient gap this closes",
    "culture": "Swedish or South Asian or Fusion"
  },
  "tomorrow_dinner": {
    "name": "specific dinner dish name",
    "ingredients": ["item 1", "item 2", "item 3"],
    "closes": "which nutrient gap this closes",
    "culture": "Swedish or South Asian or Fusion"
  },
  "quick_win": "one simple thing they can do RIGHT NOW today to partially compensate — under 2 minutes, uses common ingredients",
  "spice_tip": "one specific spice tip that addresses their main gap — include exact mechanism and dose"
}`;

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are a warm, encouraging nutrition expert. Return only valid raw JSON. No markdown. No backticks. Just the JSON object.',
              },
              { role: 'user', content: prompt },
            ],
            temperature: 0.9,
          }),
        }
      );

      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('No AI response');
      const text = data.choices[0].message.content;
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setAiData(parsed);

      // Save to daily history
      const history = JSON.parse(
        localStorage.getItem('nutrimo_daily_history') || '[]'
      );
      history.unshift({
        date: new Date().toLocaleDateString('sv-SE'),
        foods: todayFoods,
        score: nutrition.score,
        breakdown: nutrition.breakdown,
        aiData: parsed,
      });
      localStorage.setItem(
        'nutrimo_daily_history',
        JSON.stringify(history.slice(0, 30))
      );

    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 75) return '#1B4332';
    if (score >= 50) return '#E76F51';
    return '#C1121F';
  };

  const cultureColor = (culture) => {
    if (!culture) return { bg: '#F0FDF4', text: '#166534' };
    if (culture.includes('Swedish')) return { bg: '#EFF6FF', text: '#1D4ED8' };
    if (culture.includes('South Asian')) return { bg: '#FFF7ED', text: '#C2410C' };
    return { bg: '#F0FDF4', text: '#166534' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fridge-light flex flex-col
                      items-center justify-center p-6">
        <div className="text-6xl mb-6 animate-bounce">📅</div>
        <h2 className="font-bold text-xl mb-2 text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#E76F51',
          }}>
          Analysing your day...
        </h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed
                       max-w-xs">
          Finding your gaps and building tomorrow's plan
        </p>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {['🌅', '☀️', '🌙', '🍪', '🌿', '🫐', '🌾', '🧄'].map(
            (emoji, i) => (
              <span key={i} className="text-2xl text-center"
                style={{
                  animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`,
                  display: 'block',
                }}>
                {emoji}
              </span>
            )
          )}
        </div>
      </div>
    );
  }

  if (error || !nutritionData) {
    return (
      <div className="min-h-screen bg-fridge-light flex flex-col
                      items-center justify-center p-6">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-gray-400 text-sm text-center mb-6">{error}</p>
        <button
          onClick={() => navigate('/today')}
          className="press-effect text-white px-8 py-3 rounded-2xl
                     font-semibold"
          style={{
            background: 'linear-gradient(135deg, #E76F51, #F4A261)',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const missingItems = nutritionData.breakdown.filter(n => !n.covered);
  const junkEaten = todayFoods.filter(f => JUNK_FOODS.includes(f));
  const swapTipsAvailable = junkEaten
    .filter(f => SWAP_TIPS[f])
    .slice(0, 3);

  const tomorrowMeals = aiData ? [
    {
      time: '🌅 Breakfast',
      data: aiData.tomorrow_breakfast,
    },
    {
      time: '☀️ Lunch',
      data: aiData.tomorrow_lunch,
    },
    {
      time: '🌙 Dinner',
      data: aiData.tomorrow_dinner,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background:
          'linear-gradient(160deg, #C25A3A 0%, #E76F51 50%, #F4A261 100%)',
        padding: '3rem 1.5rem 1.5rem',
      }}>
        <button
          onClick={() => navigate('/')}
          className="text-orange-200 text-sm mb-4 press-effect"
        >
          ← Home
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
        }}>
          Today's Nutrition
        </h1>
        <p className="text-orange-100 text-sm mt-1">
          {todayFoods.length} items logged today
        </p>
      </div>

      {/* Score + summary */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5 card-shadow">

        {/* Score */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest
                           font-semibold mb-1">
              Today's Score
            </p>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              {aiData?.day_summary}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <span className="font-bold"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '3rem',
                color: scoreColor(nutritionData.score),
                lineHeight: 1,
              }}>
              {nutritionData.score}
            </span>
            <p className="text-gray-400 text-xs">/100</p>
          </div>
        </div>

        {/* Score bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
          <div className="h-3 rounded-full transition-all duration-1000"
            style={{
              width: `${nutritionData.score}%`,
              backgroundColor: scoreColor(nutritionData.score),
            }}
          />
        </div>

        {/* What you ate */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 mb-2
                         tracking-widest uppercase">
            You ate today
          </p>
          <div className="flex flex-wrap gap-1">
            {todayFoods.map((food, i) => (
              <span key={i}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: JUNK_FOODS.includes(food)
                    ? '#FEF3C7' : '#F4ECD8',
                  color: JUNK_FOODS.includes(food)
                    ? '#D97706' : '#555',
                }}>
                {food}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 bg-white rounded-2xl
                      overflow-hidden card-shadow">
        {[
          { id: 'gaps', label: '❌ Gaps' },
          { id: 'tomorrow', label: '🌅 Tomorrow' },
          { id: 'swaps', label: '🔄 Swaps' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-3 text-xs font-bold transition-all"
            style={{
              backgroundColor: activeTab === tab.id
                ? '#E76F51' : 'white',
              color: activeTab === tab.id ? 'white' : '#9CA3AF',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 px-4 pt-4 pb-6 space-y-3 overflow-y-auto">

        {/* GAPS TAB */}
        {activeTab === 'gaps' && (
          <>
            {/* Quick win */}
            {aiData?.quick_win && (
              <div className="rounded-3xl p-4 card-shadow"
                style={{
                  background:
                    'linear-gradient(135deg, #1B4332, #2D6A4F)',
                }}>
                <p className="text-green-300 text-xs font-bold mb-1
                               uppercase tracking-widest">
                  Do this right now
                </p>
                <p className="text-white text-sm leading-relaxed">
                  {aiData.quick_win}
                </p>
              </div>
            )}

            {/* Missing nutrients */}
            <div className="bg-white rounded-3xl p-5 card-shadow">
              <h3 className="font-bold text-gray-800 mb-3 text-sm"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                What your body missed today
              </h3>
              {missingItems.length === 0 ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-fridge-green font-bold text-sm">
                    Excellent day — all covered!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {missingItems.slice(0, 6).map((item, i) => (
                    <div key={i}
                      className="flex items-center justify-between
                                 p-3 rounded-2xl"
                      style={{
                        backgroundColor:
                          item.importance === 'critical'
                            ? '#FEE2E2'
                            : item.importance === 'high'
                              ? '#FFF7ED'
                              : '#F9FAFB',
                      }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.deficiencySymptoms.split(',')[0]}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5
                                       rounded-full"
                        style={{
                          backgroundColor:
                            item.importance === 'critical'
                              ? '#FECACA'
                              : item.importance === 'high'
                                ? '#FED7AA'
                                : '#E5E7EB',
                          color:
                            item.importance === 'critical'
                              ? '#DC2626'
                              : item.importance === 'high'
                                ? '#D97706'
                                : '#6B7280',
                        }}>
                        {item.importance === 'critical'
                          ? 'Critical'
                          : item.importance === 'high'
                            ? 'Important'
                            : 'Moderate'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spice tip */}
            {aiData?.spice_tip && (
              <div className="rounded-3xl p-4 card-shadow"
                style={{
                  background:
                    'linear-gradient(135deg, #7C2D12, #E76F51)',
                }}>
                <p className="text-white font-bold text-sm mb-1">
                  🌶️ Spice Wisdom
                </p>
                <p className="text-orange-100 text-xs leading-relaxed">
                  {aiData.spice_tip}
                </p>
              </div>
            )}
          </>
        )}

        {/* TOMORROW TAB */}
        {activeTab === 'tomorrow' && (
          <>
            <div className="bg-white rounded-3xl p-4 card-shadow">
              <h3 className="font-bold text-gray-800 mb-1 text-sm"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Tomorrow's Rebalance Plan
              </h3>
              <p className="text-gray-400 text-xs mb-4">
                Follow this and today is fully balanced
              </p>
              <div className="space-y-3">
                {tomorrowMeals.map((meal, i) => (
                  meal.data && (
                    <div key={i} className="rounded-2xl p-4"
                      style={{ backgroundColor: '#FFFBF5' }}>
                      <div className="flex items-center
                                      justify-between mb-2">
                        <span className="font-bold text-sm text-gray-700">
                          {meal.time}
                        </span>
                        <span className="text-xs px-2 py-0.5
                                         rounded-full font-medium"
                          style={{
                            backgroundColor: cultureColor(
                              meal.data.culture
                            ).bg,
                            color: cultureColor(
                              meal.data.culture
                            ).text,
                          }}>
                          {meal.data.culture}
                        </span>
                      </div>
                      <p className="font-bold text-sm mb-1"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                          color: '#1B4332',
                        }}>
                        {meal.data.name}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {meal.data.ingredients?.map((ing, j) => (
                          <span key={j}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: '#F4ECD8',
                              color: '#555',
                            }}>
                            {ing}
                          </span>
                        ))}
                      </div>
                      {meal.data.closes && (
                        <p className="text-xs text-green-600 font-medium">
                          ✓ Closes: {meal.data.closes}
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Scan kitchen CTA */}
            <div className="bg-white rounded-3xl p-4 card-shadow">
              <p className="font-bold text-gray-700 text-sm mb-1">
                Got these ingredients at home?
              </p>
              <p className="text-gray-400 text-xs mb-3">
                Scan your kitchen to see what you already have
                and get more personalised recipes
              </p>
              <button
                onClick={() => navigate('/scan')}
                className="w-full py-3 rounded-2xl text-white font-bold
                           text-sm press-effect"
                style={{
                  background:
                    'linear-gradient(135deg, #1B4332, #2D6A4F)',
                }}
              >
                🥗 Scan My Kitchen
              </button>
            </div>
          </>
        )}

        {/* SWAPS TAB */}
        {activeTab === 'swaps' && (
          <>
            {swapTipsAvailable.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 text-center
                              card-shadow">
                <div className="text-4xl mb-3">🥦</div>
                <p className="font-bold text-fridge-green text-sm"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Great choices today!
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  No processed food swaps needed
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-3xl p-4 card-shadow">
                  <h3 className="font-bold text-gray-800 text-sm mb-1"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Quick Upgrade Tips
                  </h3>
                  <p className="text-gray-400 text-xs mb-4">
                    Small tweaks to the foods you already eat
                  </p>
                  <div className="space-y-3">
                    {swapTipsAvailable.map((food, i) => (
                      <div key={i} className="rounded-2xl p-4"
                        style={{
                          backgroundColor: '#FFF7ED',
                          border: '1px solid #FED7AA',
                        }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">🍔</span>
                          <span className="font-bold text-orange-800
                                           text-sm">
                            {food}
                          </span>
                        </div>
                        <p className="text-orange-700 text-xs
                                       leading-relaxed">
                          💡 {SWAP_TIPS[food]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* General swaps */}
                <div className="bg-white rounded-3xl p-4 card-shadow">
                  <h3 className="font-bold text-gray-700 text-sm mb-3">
                    Universal upgrade rules
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Add a handful of spinach or kale to any meal',
                      'Squeeze lemon on anything — boosts iron absorption',
                      'Add a pinch of turmeric and black pepper to sauces',
                      'Swap white rice for brown rice or add lentils',
                      'End any meal with plain yoghurt — adds probiotics',
                    ].map((tip, i) => (
                      <div key={i}
                        className="flex items-start gap-2 py-2
                                   border-b border-gray-100 last:border-0">
                        <span className="text-fridge-green font-bold
                                         text-sm flex-shrink-0">
                          {i + 1}.
                        </span>
                        <p className="text-gray-600 text-xs
                                       leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Log again */}
        <button
          onClick={() => navigate('/today')}
          className="w-full py-3 rounded-2xl font-semibold text-sm
                     border-2 press-effect"
          style={{ borderColor: '#E76F51', color: '#E76F51' }}
        >
          📅 Log Again
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3 rounded-2xl font-semibold text-sm
                     border-2 press-effect"
          style={{ borderColor: '#1B4332', color: '#1B4332' }}
        >
          ← Back to Home
        </button>

        <div className="h-6" />
      </div>
    </div>
  );
}

export default TodayResults;