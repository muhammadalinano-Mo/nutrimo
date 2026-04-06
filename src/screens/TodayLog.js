import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MEAL_CATEGORIES = {
  '🌅 Breakfast': [
    'Eggs', 'Toast', 'White bread', 'Cereal', 'Oats', 'Yoghurt',
    'Filmjolk', 'Pancakes', 'Bacon', 'Sausages', 'Orange juice',
    'Coffee', 'Tea', 'Milk', 'Banana', 'Apple', 'Avocado toast',
    'Rye bread', 'Cheese', 'Butter', 'Jam', 'Honey',
    'Paratha', 'Chapati', 'Halwa', 'Lassi', 'Chai',
  ],
  '☀️ Lunch': [
    'Sandwich', 'Burger', 'Pizza slice', 'Pasta', 'Rice', 'Salad',
    'Soup', 'Wrap', 'Hot dog', 'Falukorv', 'Meatballs', 'Fish',
    'Chicken', 'Kebab', 'Falafel', 'Sushi', 'Noodles',
    'Daal', 'Roti', 'Biryani', 'Samosa', 'Pakora',
    'Leftovers', 'Frozen meal', 'Takeaway',
  ],
  '🌙 Dinner': [
    'Pasta', 'Pizza', 'Rice', 'Chicken', 'Beef', 'Lamb', 'Fish',
    'Salmon', 'Meatballs', 'Falukorv', 'Sausages', 'Hot dogs',
    'Burger', 'Steak', 'Curry', 'Daal', 'Biryani', 'Roti',
    'Noodles', 'Stir fry', 'Soup', 'Salad', 'Tacos',
    'Frozen pizza', 'Takeaway', 'Leftovers',
    'Karahi', 'Nihari', 'Haleem', 'Saag',
  ],
  '🍪 Snacks': [
    'Crisps', 'Chocolate', 'Biscuits', 'Cake', 'Sweets',
    'Nuts', 'Fruit', 'Yoghurt', 'Cheese', 'Crackers',
    'Ice cream', 'Popcorn', 'Energy drink', 'Soft drink',
    'Juice', 'Coffee', 'Tea', 'Protein bar',
    'Samosa', 'Pakora', 'Nimko',
  ],
};

const JUNK_FOODS = [
  'Pizza', 'Burger', 'Hot dog', 'Falukorv', 'Sausages',
  'Frozen pizza', 'Crisps', 'Chocolate', 'Ice cream',
  'Soft drink', 'Energy drink', 'Takeaway', 'Frozen meal',
  'Bacon', 'Cake', 'Sweets', 'Popcorn', 'Biscuits', 'Pizza slice',
];

function TodayLog() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [activeCategory, setActiveCategory] = useState('🌅 Breakfast');
  const [freeText, setFreeText] = useState('');
  const [showFreeText, setShowFreeText] = useState(false);

  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleFreeTextAdd = () => {
    if (!freeText.trim()) return;
    const items = freeText
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);
    setSelected(prev => [...new Set([...prev, ...items])]);
    setFreeText('');
    setShowFreeText(false);
  };

  const handleAnalyse = () => {
    if (selected.length === 0) {
      alert('Please log at least one thing you ate today');
      return;
    }
    localStorage.setItem('nutrimo_today', JSON.stringify(selected));
    navigate('/today-results');
  };

  const junkCount = selected.filter(i => JUNK_FOODS.includes(i)).length;
  const categoryKeys = Object.keys(MEAL_CATEGORIES);

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #C25A3A 0%, #E76F51 50%, #F4A261 100%)',
        padding: '3rem 1.5rem 1.5rem',
      }}>
        <button
          onClick={() => navigate('/')}
          className="text-orange-200 text-sm mb-4 press-effect"
        >
          ← Back
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.2,
        }}>
          What did you
          <br />
          <span style={{ color: '#FFF3E0' }}>eat today?</span>
        </h1>
        <p className="text-orange-100 text-sm mt-2">
          Tap everything you had — no judgement here
        </p>
      </div>

      {/* Selected count */}
      <div className={`px-5 py-3 flex items-center justify-between
        transition-all ${selected.length > 0
          ? 'bg-fridge-gold'
          : 'bg-white border-b border-gray-100'}`}>
        <p className={`text-sm font-semibold ${selected.length > 0
          ? 'text-white' : 'text-gray-400'}`}>
          {selected.length === 0
            ? 'Nothing logged yet'
            : `${selected.length} item${selected.length !== 1 ? 's' : ''} logged today`
          }
        </p>
        {selected.length > 0 && (
          <button
            onClick={() => setSelected([])}
            className="text-white text-xs underline opacity-80"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Junk food notice */}
      {junkCount >= 2 && (
        <div className="mx-4 mt-3 rounded-2xl p-3 flex items-start gap-3"
          style={{
            backgroundColor: '#FFF7ED',
            border: '1px solid #FED7AA',
          }}>
          <span className="text-xl flex-shrink-0">🍕</span>
          <div>
            <p className="text-orange-800 text-xs font-bold mb-0.5">
              High processed food day
            </p>
            <p className="text-orange-600 text-xs leading-relaxed">
              No problem — NutriMo will build a rebalancing
              plan for tomorrow.
            </p>
          </div>
        </div>
      )}

      {/* Meal tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex overflow-x-auto gap-1 px-4 py-3">
          {categoryKeys.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full
                         text-xs font-semibold transition-all press-effect"
              style={{
                backgroundColor: activeCategory === cat
                  ? '#E76F51' : '#F4ECD8',
                color: activeCategory === cat ? 'white' : '#555',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="flex overflow-x-auto gap-2 px-4 py-2
                        bg-orange-50 border-b border-orange-100">
          {selected.map(item => (
            <span
              key={item}
              onClick={() => toggle(item)}
              className="whitespace-nowrap text-xs px-3 py-1
                         rounded-full cursor-pointer font-medium
                         press-effect flex-shrink-0"
              style={{ backgroundColor: '#E76F51', color: 'white' }}
            >
              {item} ×
            </span>
          ))}
        </div>
      )}

      {/* Food grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {MEAL_CATEGORIES[activeCategory].map(item => {
            const isSelected = selected.includes(item);
            const isJunk = JUNK_FOODS.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggle(item)}
                className="p-3 rounded-2xl text-sm font-medium
                           text-left transition-all press-effect"
                style={isSelected ? {
                  background:
                    'linear-gradient(135deg, #C25A3A, #E76F51)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(231, 111, 81, 0.3)',
                } : {
                  backgroundColor: 'white',
                  color: '#374151',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: isJunk ? '1px solid #FED7AA' : 'none',
                }}
              >
                {isSelected ? '✓ ' : ''}
                {''}
                {item}
              </button>
            );
          })}
        </div>

        {/* Free text */}
        {showFreeText ? (
          <div className="bg-white rounded-2xl p-4 card-shadow mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Type what you had — separate with commas
            </p>
            <input
              type="text"
              value={freeText}
              onChange={e => setFreeText(e.target.value)}
              placeholder="e.g. pasta, salad, apple juice"
              className="w-full p-3 rounded-xl border border-gray-200
                         text-sm outline-none mb-3"
              onKeyDown={e => e.key === 'Enter' && handleFreeTextAdd()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleFreeTextAdd}
                className="flex-1 py-2 rounded-xl text-white text-sm
                           font-bold press-effect"
                style={{
                  background:
                    'linear-gradient(135deg, #C25A3A, #E76F51)',
                }}
              >
                Add
              </button>
              <button
                onClick={() => setShowFreeText(false)}
                className="flex-1 py-2 rounded-xl text-sm font-bold
                           border-2 press-effect"
                style={{ borderColor: '#E5E7EB', color: '#9CA3AF' }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowFreeText(true)}
            className="w-full py-3 rounded-2xl text-sm font-semibold
                       border-2 press-effect mb-4"
            style={{
              borderColor: '#E76F51',
              color: '#E76F51',
              borderStyle: 'dashed',
            }}
          >
            + Type something not listed
          </button>
        )}

        <div className="h-28" />
      </div>

      {/* Analyse button */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2
                      w-full max-w-sm px-4 pb-6 pt-3"
        style={{
          background:
            'linear-gradient(to top, #FFFBF5 70%, transparent)',
        }}>
        <button
          onClick={handleAnalyse}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-2xl font-bold text-lg
                     text-white press-effect mb-2"
          style={selected.length > 0 ? {
            background:
              'linear-gradient(135deg, #E76F51, #F4A261)',
            boxShadow: '0 8px 24px rgba(231, 111, 81, 0.4)',
          } : {
            backgroundColor: '#E5E7EB',
            color: '#9CA3AF',
          }}
        >
          {selected.length > 0
            ? `Analyse My Day (${selected.length} items)`
            : 'Log at least one item'
          }
        </button>
        <p className="text-center text-gray-400 text-xs">
          NutriMo never judges what you eat
        </p>
      </div>

    </div>
  );
}

export default TodayLog;