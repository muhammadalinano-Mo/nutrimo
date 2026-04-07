import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateNutritionScore } from '../nutritionEngine';

// ============================================================
// SCORE CIRCLE COMPONENT
// ============================================================
function ScoreCircle({ coveredCount, totalNutrients }) {
  const label = coveredCount >= 12 ? 'Excellent'
    : coveredCount >= 9 ? 'Good'
    : coveredCount >= 6 ? 'Fair'
    : 'Needs Work';

  const color = coveredCount >= 12 ? '#1B4332'
    : coveredCount >= 9 ? '#2D6A4F'
    : coveredCount >= 6 ? '#E76F51'
    : '#C1121F';

  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 rounded-full flex flex-col
                      items-center justify-center"
        style={{ backgroundColor: '#F4ECD8' }}>
        <span className="font-bold leading-none"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            color,
          }}>
          {coveredCount}/{totalNutrients}
        </span>
        <span className="text-xs text-gray-400 mt-1">
          nutrients
        </span>
      </div>
      <span className="font-bold text-sm mt-2 px-4 py-1 rounded-full"
        style={{
          backgroundColor: coveredCount >= 12 ? '#D1FAE5'
            : coveredCount >= 9 ? '#F0FDF4'
            : coveredCount >= 6 ? '#FEF3C7'
            : '#FEE2E2',
          color,
        }}>
        {label}
      </span>
    </div>
  );
}
// ============================================================
// TOMORROW PLAN COMPONENT
// ============================================================
function TomorrowPlan({ missingItems, aiData }) {
  const navigate = useNavigate();

  const todayFoods = JSON.parse(
    localStorage.getItem('nutrimo_today') || '[]'
  );

  const criticalMissing = missingItems
    .filter(n => n.importance === 'critical' || n.importance === 'high')
    .slice(0, 4);

  const meals = [
    {
      time: '🌅 Breakfast',
      recipe: aiData?.swedish_fix,
      closes: criticalMissing.slice(0, 1).map(n => n.name).join(', '),
      culture: '🇸🇪 Swedish',
    },
    {
      time: '☀️ Lunch',
      recipe: aiData?.south_asian_fix,
      closes: criticalMissing.slice(1, 3).map(n => n.name).join(', '),
      culture: '🌶️ South Asian',
    },
    {
      time: '🌙 Dinner',
      recipe: aiData?.fusion_fix,
      closes: criticalMissing.slice(2, 4).map(n => n.name).join(', '),
      culture: '✨ Fusion',
    },
  ];

  return (
    <div className="space-y-4">

      {/* What you had today */}
      {todayFoods.length > 0 && (
        <div className="bg-white rounded-3xl p-4 card-shadow">
          <h3 className="font-bold text-gray-800 text-sm mb-3"
            style={{ fontFamily: 'Playfair Display, serif' }}>
            🍽️ You ate today
          </h3>
          <div className="flex flex-wrap gap-1">
            {todayFoods.map((food, i) => (
              <span key={i}
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ backgroundColor: '#F4ECD8', color: '#555' }}>
                {food}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* What body missed */}
      {criticalMissing.length > 0 && (
        <div className="rounded-3xl p-4 card-shadow"
          style={{
            backgroundColor: '#FFF7ED',
            border: '1px solid #FED7AA',
          }}>
          <h3 className="font-bold text-orange-800 text-sm mb-2">
            Your body missed today
          </h3>
          <div className="flex flex-wrap gap-1">
            {criticalMissing.map((n, i) => (
              <span key={i}
                className="text-xs px-2 py-1 rounded-full font-bold"
                style={{
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                }}>
                {n.emoji} {n.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tomorrow meal plan */}
      <div className="bg-white rounded-3xl p-5 card-shadow">
        <h3 className="font-bold text-gray-800 mb-1"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          Tomorrow's Rebalance Plan
        </h3>
        <p className="text-gray-400 text-xs mb-4">
          Follow this and today is fully balanced
        </p>
        <div className="space-y-3">
          {meals.map((meal, i) => (
            meal.recipe && (
              <div key={i} className="rounded-2xl p-4"
                style={{ backgroundColor: '#FFFBF5' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-gray-700">
                    {meal.time}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full
                                   font-medium bg-green-100 text-green-700">
                    {meal.culture}
                  </span>
                </div>
                <p className="font-bold text-sm mb-1"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#1B4332',
                  }}>
                  {meal.recipe.name}
                </p>
                {meal.closes && (
                  <p className="text-xs text-gray-500">
                    Closes: {meal.closes}
                  </p>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Spice tip */}
      {aiData?.spice_tip && (
        <div className="rounded-3xl p-4 card-shadow"
          style={{
            background: 'linear-gradient(135deg, #7C2D12, #E76F51)',
          }}>
          <h3 className="text-white font-bold mb-2 text-sm">
            Quick Win For Tomorrow
          </h3>
          <p className="text-orange-100 text-xs leading-relaxed">
            {aiData.spice_tip}
          </p>
        </div>
      )}

      {/* See full recipes */}
      <button
        onClick={() => navigate('/fix')}
        className="w-full py-4 rounded-2xl font-bold text-white
                   text-base press-effect"
        style={{
          background: 'linear-gradient(135deg, #E76F51, #F4A261)',
          boxShadow: '0 8px 24px rgba(231, 111, 81, 0.35)',
        }}
      >
        See Full Recipes
      </button>

    </div>
  );
}

// ============================================================
// MAIN RESULTS COMPONENT
// ============================================================
function Results() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [nutritionData, setNutritionData] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('breakdown');

  const ingredients = JSON.parse(
    localStorage.getItem('nutrimo_ingredients') || '[]'
  );

  useEffect(() => {
    runAnalysis();
  }, []);

  const runAnalysis = async () => {
    try {
      setLoading(true);

      const nutrition = calculateNutritionScore(ingredients);
      setNutritionData(nutrition);

      const missingNutrients = nutrition.breakdown
        .filter(n => !n.covered)
        .map(n => n.name)
        .slice(0, 5)
        .join(', ');

      const missingFoodGroups = [
        !nutrition.foodGroups.hasVegetables && 'vegetables',
        !nutrition.foodGroups.hasFruits && 'fruit',
        !nutrition.foodGroups.hasHealthyFats && 'healthy fats',
        !nutrition.foodGroups.hasFermented && 'fermented foods',
      ].filter(Boolean).join(', ');

      const todayFoods = JSON.parse(
        localStorage.getItem('nutrimo_today') || '[]'
      );

      const prompt = `You are NutriMo — a nutritionist with deep expertise in Swedish/Nordic and South Asian food traditions including Indian, Pakistani, Bangladeshi and Sri Lankan cuisines.

A user has these ingredients available: ${ingredients.join(', ')}.
${todayFoods.length > 0 ? `They ate today: ${todayFoods.join(', ')}.` : ''}

Their missing nutrients are: ${missingNutrients}.
Their missing food groups are: ${missingFoodGroups || 'none'}.

Return ONLY a raw JSON object. No markdown. No backticks. Just JSON.

{
  "swedish_fix": {
    "name": "name of a real traditional Swedish recipe",
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"],
    "why": "explain precisely how this addresses the nutritional gaps"
  },
  "south_asian_fix": {
    "name": "name of a real South Asian recipe from India Pakistan Bangladesh or Sri Lanka",
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"],
    "why": "explain the South Asian food-as-medicine principle and which nutrients this provides"
  },
  "fusion_fix": {
    "name": "creative fusion recipe combining Swedish and South Asian ingredients",
    "ingredients": ["ingredient 1", "ingredient 2", "ingredient 3", "ingredient 4"],
    "why": "explain why this fusion creates a nutritionally superior result"
  },
  "swap_tips": [
    {
      "food": "name of a processed food from their list",
      "tip": "specific upgrade tip that takes 30 seconds",
      "benefit": "which nutrient this adds"
    }
  ],
  "shopping_list": [
    {
      "item": "most important ingredient to buy",
      "reason": "which deficiency this closes",
      "where": "specific Swedish store — ICA Maxi, Coop, Willys, or Asian grocery"
    },
    {
      "item": "second ingredient",
      "reason": "which deficiency this closes",
      "where": "where to buy in Sweden"
    },
    {
      "item": "third ingredient",
      "reason": "which deficiency this closes",
      "where": "where to buy in Sweden"
    }
  ],
  "spice_tip": "one very specific actionable spice tip addressing the main deficiency — include exact scientific mechanism and how to use in everyday cooking"
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
                content: 'You are a precise nutrition expert. Return only valid raw JSON. No markdown. No backticks. Just the JSON object.',
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

      const history = JSON.parse(
        localStorage.getItem('nutrimo_history') || '[]'
      );
      history.unshift({
        date: new Date().toLocaleDateString('sv-SE'),
        ingredients,
        todayFoods,
        score: nutrition.score,
        scoreMessage: nutrition.scoreMessage,
        breakdown: nutrition.breakdown,
        foodGroups: nutrition.foodGroups,
        aiData: parsed,
      });
      localStorage.setItem(
        'nutrimo_history',
        JSON.stringify(history.slice(0, 10))
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

  const scoreBarColor = (score) => {
    if (score >= 75) return '#1B4332';
    if (score >= 50) return '#E76F51';
    return '#C1121F';
  };

  const importanceColor = (importance) => {
    if (importance === 'critical') return {
      bg: '#FEE2E2', border: '#FECACA',
      badge: '#FEE2E2', badgeText: '#B91C1C',
    };
    if (importance === 'high') return {
      bg: '#FFF7ED', border: '#FED7AA',
      badge: '#FEF3C7', badgeText: '#D97706',
    };
    return {
      bg: '#F9FAFB', border: '#E5E7EB',
      badge: '#F3F4F6', badgeText: '#6B7280',
    };
  };

  const importanceLabel = (importance) => {
    if (importance === 'critical') return 'Critical';
    if (importance === 'high') return 'Important';
    return 'Moderate';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fridge-light flex flex-col
                      items-center justify-center p-6 spice-bg">
        <div className="text-6xl mb-6 animate-bounce">🔬</div>
        <h2 className="font-bold text-xl mb-2 text-center"
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#1B4332',
          }}>
          Analysing your nutrition...
        </h2>
        <p className="text-gray-400 text-sm text-center leading-relaxed
                       max-w-xs">
          Running scientific analysis across 15 key nutrients
        </p>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {['🌿', '🫚', '🧅', '🌶️', '🐟', '🫐', '🌾', '🧄'].map(
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
        <p className="text-gray-300 text-xs mt-8 text-center">
          Based on Nordic Nutrition Recommendations 2023
        </p>
      </div>
    );
  }

  if (error || !nutritionData) {
    return (
      <div className="min-h-screen bg-fridge-light flex flex-col
                      items-center justify-center p-6">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          Something went wrong
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          {error}
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="press-effect text-white px-8 py-3 rounded-2xl
                     font-semibold"
          style={{
            background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  const missingItems = nutritionData.breakdown.filter(n => !n.covered);
  const coveredItems = nutritionData.breakdown.filter(n => n.covered);

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 100%)',
        padding: '3rem 1.5rem 1.5rem',
      }}>
        <button
          onClick={() => navigate('/scan')}
          className="text-green-300 text-sm mb-4 press-effect"
        >
          Back
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
        }}>
          Your Analysis
        </h1>
        <p className="text-green-200 text-sm mt-1">
          {ingredients.length} ingredients · {nutritionData.coveredCount}/{nutritionData.totalNutrients} nutrients covered
        </p>
      </div>

      {/* Score card */}
      <div className="mx-4 mt-4 bg-white rounded-3xl p-5 card-shadow">
        <div className="flex items-center gap-4">
          <ScoreCircle
  coveredCount={nutritionData.coveredCount}
  totalNutrients={nutritionData.totalNutrients}
/>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1 uppercase
                           tracking-widest font-semibold">
              NNR2023 Score
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              {nutritionData.scoreMessage}
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              {nutritionData.bonuses.spice > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full
                                  bg-orange-100 text-orange-700 font-medium">
                  +{nutritionData.bonuses.spice} spice
                </span>
              )}
              {nutritionData.bonuses.nordic > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full
                                  bg-blue-100 text-blue-700 font-medium">
                  +{nutritionData.bonuses.nordic} nordic
                </span>
              )}
              {nutritionData.bonuses.diversity > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full
                                  bg-green-100 text-green-700 font-medium">
                  +{nutritionData.bonuses.diversity} variety
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Food groups */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-bold text-gray-400 mb-3
                         tracking-widest uppercase">
            Food Groups
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'hasVegetables', label: 'Vegetables', emoji: '🥦' },
              { key: 'hasFruits', label: 'Fruit', emoji: '🍎' },
              { key: 'hasProtein', label: 'Protein', emoji: '💪' },
              { key: 'hasDairy', label: 'Dairy', emoji: '🥛' },
              { key: 'hasHealthyFats', label: 'Healthy Fats', emoji: '🐟' },
              { key: 'hasWholegrains', label: 'Wholegrains', emoji: '🌾' },
              { key: 'hasFermented', label: 'Fermented', emoji: '🦠' },
            ].map(group => (
              <div key={group.key}
                className="flex items-center justify-between
                           rounded-xl px-3 py-2"
                style={{
                  backgroundColor: nutritionData.foodGroups[group.key]
                    ? '#F0FDF4' : '#FEF2F2',
                }}>
                <span className="text-xs text-gray-600">
                  {group.emoji} {group.label}
                </span>
                <span className="text-xs font-bold"
                  style={{
                    color: nutritionData.foodGroups[group.key]
                      ? '#15803D' : '#DC2626',
                  }}>
                  {nutritionData.foodGroups[group.key] ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 mt-4 bg-white rounded-2xl
                      overflow-hidden card-shadow">
        {[
          { id: 'breakdown', label: '📊 All' },
          { id: 'missing', label: `❌ (${missingItems.length})` },
          { id: 'covered', label: `✅ (${coveredItems.length})` },
          { id: 'tomorrow', label: '🌅 Tomorrow' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-3 text-xs font-bold transition-all"
            style={{
              backgroundColor: activeTab === tab.id
                ? '#1B4332' : 'white',
              color: activeTab === tab.id ? 'white' : '#9CA3AF',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 px-4 pt-4 pb-6 space-y-3 overflow-y-auto">

        {/* BREAKDOWN TAB */}
        {activeTab === 'breakdown' && (
          <>
            <div className="bg-white rounded-3xl p-5 card-shadow">
              <h3 className="font-bold text-gray-800 mb-4 text-sm"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                All 15 Nutrients
              </h3>
              <div className="space-y-3">
                {nutritionData.breakdown.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center flex-shrink-0">
                      {item.emoji}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center
                                      justify-between mb-1">
                        <span className="text-xs font-semibold
                                         text-gray-700">
                          {item.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full
                                          font-medium"
                          style={item.covered ? {
                            backgroundColor: '#D1FAE5',
                            color: '#065F46',
                          } : {
                            backgroundColor:
                              item.importance === 'critical'
                                ? '#FEE2E2' : '#FEF3C7',
                            color: item.importance === 'critical'
                              ? '#B91C1C' : '#D97706',
                          }}>
                          {item.covered ? 'Covered'
                            : item.importance === 'critical'
                              ? 'Critical' : 'Missing'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full
                                      h-1.5">
                        <div className="h-1.5 rounded-full transition-all
                                        duration-1000"
                          style={{
                            width: item.covered ? '100%' : '5%',
                            backgroundColor: item.covered
                              ? '#1B4332'
                              : item.importance === 'critical'
                                ? '#DC2626' : '#F59E0B',
                          }}
                        />
                      </div>
                      {item.covered && item.sources.length > 0 && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          From: {item.sources.slice(0, 2).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {aiData?.spice_tip && (
              <div className="rounded-3xl p-5 card-shadow"
                style={{
                  background:
                    'linear-gradient(135deg, #7C2D12, #E76F51)',
                }}>
                <h3 className="text-white font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Spice Wisdom
                </h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  {aiData.spice_tip}
                </p>
              </div>
            )}
          </>
        )}

        {/* MISSING TAB */}
        {activeTab === 'missing' && (
          missingItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 text-center
                            card-shadow">
              <div className="text-5xl mb-3">🏆</div>
              <p className="font-bold text-lg"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#1B4332',
                }}>
                All nutrients covered!
              </p>
            </div>
          ) : (
            missingItems.map((item, i) => {
              const colors = importanceColor(item.importance);
              return (
                <div key={i} className="rounded-3xl p-5 card-shadow"
                  style={{
                    backgroundColor: colors.bg,
                    border: `1px solid ${colors.border}`,
                  }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-bold text-gray-800 text-sm"
                        style={{
                          fontFamily: 'Playfair Display, serif',
                        }}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full
                                     font-bold"
                      style={{
                        backgroundColor: colors.badge,
                        color: colors.badgeText,
                      }}>
                      {importanceLabel(item.importance)}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-2
                                 text-gray-600">
                    May cause: {item.deficiencySymptoms}
                  </p>
                  <p className="text-xs font-semibold mb-1"
                    style={{ color: '#1B4332' }}>
                    Best sources: {item.goodSources}
                  </p>
                  <p className="text-xs text-gray-400">
                    Daily target: {item.dailyTarget}
                  </p>
                  {item.swedenNote && (
                    <p className="text-xs font-medium mt-2"
                      style={{ color: '#1D4ED8' }}>
                      🇸🇪 {item.swedenNote}
                    </p>
                  )}
                </div>
              );
            })
          )
        )}

        {/* COVERED TAB */}
        {activeTab === 'covered' && (
          coveredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 text-center
                            card-shadow">
              <p className="text-gray-400 text-sm">
                No nutrients covered yet
              </p>
            </div>
          ) : (
            coveredItems.map((item, i) => (
              <div key={i} className="rounded-3xl p-4 card-shadow"
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                }}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-bold text-gray-800 text-sm">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800
                                   px-2 py-1 rounded-full font-bold">
                    Covered
                  </span>
                </div>
                {item.sources.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1 pl-8">
                    From: {item.sources.join(', ')}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1 pl-8">
                  {item.dailyTarget}
                </p>
              </div>
            ))
          )
        )}

        {/* TOMORROW TAB */}
        {activeTab === 'tomorrow' && (
          <TomorrowPlan
            missingItems={missingItems}
            aiData={aiData}
          />
        )}

        {/* Action buttons */}
        <button
          onClick={() => navigate('/fix')}
          className="w-full py-4 rounded-2xl font-bold text-white
                     text-base press-effect"
          style={{
            background: 'linear-gradient(135deg, #E76F51, #F4A261)',
            boxShadow: '0 8px 24px rgba(231, 111, 81, 0.35)',
          }}
        >
          Show Me The Fix
        </button>

        <button
          onClick={() => navigate('/scan')}
          className="w-full py-3 rounded-2xl font-semibold text-sm
                     border-2 press-effect"
          style={{ borderColor: '#1B4332', color: '#1B4332' }}
        >
          Scan Again
        </button>

        <div className="h-6" />
      </div>
    </div>
  );
}

export default Results;