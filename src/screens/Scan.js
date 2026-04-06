import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = {
  '🍔 Everyday': [
    'Eggs', 'Milk', 'Butter', 'Cheese', 'Yoghurt',
    'White bread', 'Toast', 'Wraps', 'Tortilla', 'Naan', 'Chapati',
    'Pasta', 'Spaghetti', 'Noodles', 'Rice', 'Instant noodles',
    'Chicken', 'Beef', 'Lamb', 'Mince meat', 'Burger patties',
    'Sausages', 'Hot dog', 'Falukorv', 'Bacon', 'Ham', 'Salami',
    'Frozen pizza', 'Pizza', 'Burger', 'Fish fingers', 'Nuggets',
    'Frozen meatballs', 'Frozen paratha', 'Frozen peas',
    'Frozen vegetables', 'Frozen meal',
    'Canned tomatoes', 'Canned beans', 'Canned tuna', 'Canned corn',
    'Hummus', 'Avocado', 'Cream cheese', 'Cottage cheese',
    'Ketchup', 'Mayo', 'Soy sauce', 'Hot sauce', 'Olive oil',
    'Orange juice', 'Coffee', 'Tea',
  ],
  '🇸🇪 Swedish': [
    'Filmjolk', 'Herring', 'Salmon', 'Rye bread', 'Lingonberries',
    'Beetroot', 'Kale', 'Oats', 'Mackerel', 'Eggs', 'Cheese',
    'Butter', 'Potatoes', 'Cabbage', 'Pumpkin seeds', 'Gravlax',
    'Crispbread', 'Sour cream', 'Dill', 'Horseradish', 'Cloudberries',
    'Blueberries', 'Cod', 'Meatballs', 'Liver paste', 'Mustard',
    'Pickled cucumber', 'Chanterelles', 'Porcini mushrooms',
    'Nyponsoppa rosehip', 'Pearl barley', 'Rutabaga swede',
    'Celeriac', 'Parsnip', 'Sea buckthorn', 'Surströmming',
    'Whitefish', 'Perch', 'Crayfish',
  ],
  '🌶️ South Asian': [
    'Daal lentils', 'Saag spinach', 'Methi fenugreek',
    'Zeera cumin', 'Haldi turmeric', 'Ginger', 'Garlic',
    'Kalonji black seed', 'Ghee', 'Yoghurt', 'Chickpeas',
    'Basmati rice', 'Karela bitter gourd', 'Ajwain',
    'Mustard seeds', 'Coriander', 'Green chilli', 'Atta flour',
    'Moong dal', 'Chana dal', 'Masoor dal', 'Urad dal',
    'Paneer', 'Tamarind', 'Cardamom', 'Cloves', 'Cinnamon',
    'Bay leaves', 'Saffron', 'Fennel seeds', 'Amchur mango powder',
    'Kashmiri chilli', 'Garam masala', 'Curry leaves',
    'Coconut milk', 'Jaggery', 'Besan chickpea flour',
    'Moringa', 'Amla gooseberry', 'Tulsi holy basil',
  ],
  '🥦 Vegetables': [
    'Broccoli', 'Carrots', 'Onions', 'Leeks', 'Cucumber',
    'Bell peppers', 'Sweet potato', 'Mushrooms', 'Cauliflower',
    'Brussels sprouts', 'Asparagus', 'Spinach', 'Rocket',
    'Radishes', 'Fennel', 'Courgette', 'Aubergine', 'Peas',
    'Tomatoes', 'Okra bhindi', 'Bottle gourd lauki',
  ],
  '💪 Proteins': [
    'Chicken', 'Beef', 'Lamb', 'Tofu', 'Kidney beans',
    'Lentils', 'Edamame', 'Sardines', 'Tuna', 'Turkey',
    'Venison', 'Offal liver', 'Bone broth', 'Quinoa',
  ],
  '🥛 Dairy': [
    'Whole milk', 'Milk', 'Oat milk', 'Kefir', 'Quark',
    'Skyr', 'Lassi', 'Cream', 'Sour cream',
  ],
  '🍎 Fruits': [
    'Banana', 'Apple', 'Orange', 'Mango', 'Berries',
    'Strawberries', 'Raspberries', 'Lemon', 'Pomegranate',
    'Dates', 'Figs', 'Apricots', 'Kiwi', 'Papaya',
    'Blackcurrants', 'Elderberries', 'Rosehip',
  ],
  '🌾 Grains': [
    'Sourdough', 'Brown rice', 'Barley', 'Spelt',
    'Buckwheat', 'Millet', 'Semolina', 'Poha flattened rice',
    'Amaranth',
  ],
  '🫚 Nuts & Seeds': [
    'Walnuts', 'Almonds', 'Sunflower seeds', 'Flaxseed',
    'Sesame seeds til', 'Chia seeds', 'Hemp seeds', 'Cashews',
    'Pistachios', 'Pine nuts', 'Linseed oil',
  ],
  '🌿 Spices': [
    'Turmeric haldi', 'Cumin zeera', 'Coriander dhania',
    'Fenugreek methi', 'Black seed kalonji', 'Black pepper',
    'Paprika', 'Caraway seeds', 'Allspice', 'Juniper berries',
  ],
};

const ALL_INGREDIENTS = Object.entries(CATEGORIES).flatMap(
  ([category, items]) => items.map(item => ({ item, category }))
);

const ALL_INGREDIENT_NAMES = ALL_INGREDIENTS.map(i => i.item);

function Scan() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [activeCategory, setActiveCategory] = useState('🇸🇪 Swedish');
  const [poppedItem, setPoppedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('manual'); // 'manual' or 'camera'
  const [cameraState, setCameraState] = useState('idle');
  // idle | scanning | done | error
  const [photoPreview, setPhotoPreview] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [scanMessage, setScanMessage] = useState('');
  const fileInputRef = useRef(null);

  const toggle = (item) => {
    setPoppedItem(item);
    setTimeout(() => setPoppedItem(null), 200);
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleAnalyse = () => {
    if (selected.length < 3) {
      alert('Please select at least 3 ingredients');
      return;
    }
    localStorage.setItem(
      'NutriMo_ingredients',
      JSON.stringify(selected)
    );
    navigate('/results');
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Match AI detected ingredients to our database
  const matchIngredients = (aiIngredients) => {
    const matched = [];
    const unmatched = [];

    aiIngredients.forEach(aiItem => {
      const aiLower = aiItem.toLowerCase();

      // Direct match
      const direct = ALL_INGREDIENT_NAMES.find(
        name => name.toLowerCase() === aiLower
      );
      if (direct) {
        matched.push(direct);
        return;
      }

      // Partial match — AI says "spinach", we have "Saag spinach"
      const partial = ALL_INGREDIENT_NAMES.find(
        name => name.toLowerCase().includes(aiLower)
          || aiLower.includes(name.toLowerCase().split(' ')[0])
      );
      if (partial) {
        matched.push(partial);
        return;
      }

      unmatched.push(aiItem);
    });

    return { matched: [...new Set(matched)], unmatched };
  };

  // Handle photo upload and AI scan
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
    setCameraState('scanning');
    setScanMessage('Reading your fridge...');

    try {
      const base64 = await fileToBase64(file);

      setScanMessage('Identifying ingredients...');

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
                role: 'user',
                content: [
                  {
                    type: 'image_url',
                    image_url: {
                      url: `data:image/jpeg;base64,${base64}`,
                      detail: 'high',
                    },
                  },
                  {
                    type: 'text',
                    text: `You are NutriMo — an expert nutritionist scanning a fridge or kitchen.

Look carefully at this image and identify every food item, ingredient, vegetable, fruit, dairy product, meat, fish, spice, condiment, grain or drink you can see.

Be thorough — check shelves, drawers, doors, and any visible containers or packets.

Return ONLY a valid JSON array of ingredient names. Nothing else. No explanation. No markdown.

Example format: ["Eggs", "Milk", "Carrots", "Ginger", "Yoghurt", "Cheese"]

Include both common English names and note any South Asian or Nordic ingredients you recognise.
If you see a spice jar, try to identify what spice it is.
If you see a carton or bottle, identify the contents.
Be specific — "Salmon" not just "fish". "Yoghurt" not just "dairy".`,
                  },
                ],
              },
            ],
            max_tokens: 500,
          }),
        }
      );

      const data = await response.json();
      if (!data.choices?.[0]) throw new Error('No response');

      const text = data.choices[0].message.content;
      const clean = text.replace(/```json|```/g, '').trim();
      const aiIngredients = JSON.parse(clean);

      setScanMessage('Matching to nutrition database...');

      const { matched, unmatched } = matchIngredients(aiIngredients);

      setDetectedIngredients(matched);

      // Auto-select all matched ingredients
      setSelected(prev => {
        const combined = [...new Set([...prev, ...matched])];
        return combined;
      });

      setCameraState('done');
      setScanMessage(
        `Found ${aiIngredients.length} items — matched ${matched.length} to our nutrition database`
      );

    } catch (err) {
      console.error(err);
      setCameraState('error');
      setScanMessage('Could not read the image. Please try again or use manual selection.');
    }

    // Reset file input so same photo can be re-uploaded
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetCamera = () => {
    setCameraState('idle');
    setPhotoPreview(null);
    setDetectedIngredients([]);
    setScanMessage('');
  };

  // Search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ALL_INGREDIENTS.filter(({ item }) =>
      item.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const isSearching = searchQuery.trim().length > 0;
  const categoryKeys = Object.keys(CATEGORIES);

  const displayItems = isSearching
    ? searchResults
    : CATEGORIES[activeCategory].map(
        item => ({ item, category: activeCategory })
      );

  return (
    <div className="min-h-screen bg-fridge-light flex flex-col">

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1B4332 0%, #2D6A4F 100%)',
        padding: '3rem 1.5rem 1rem',
      }}>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-green-300
                     text-sm mb-3 press-effect"
        >
          ← Back
        </button>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'white',
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '0.5rem',
        }}>
          Scan Your Fridge
        </h1>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => { setMode('camera'); setSearchQuery(''); }}
            className="flex-1 py-2 rounded-xl text-sm font-bold
                       transition-all press-effect flex items-center
                       justify-center gap-2"
            style={{
              backgroundColor: mode === 'camera'
                ? 'white'
                : 'rgba(255,255,255,0.15)',
              color: mode === 'camera' ? '#1B4332' : 'white',
            }}
          >
            📷 Photo Scan
          </button>
          <button
            onClick={() => { setMode('manual'); resetCamera(); }}
            className="flex-1 py-2 rounded-xl text-sm font-bold
                       transition-all press-effect flex items-center
                       justify-center gap-2"
            style={{
              backgroundColor: mode === 'manual'
                ? 'white'
                : 'rgba(255,255,255,0.15)',
              color: mode === 'manual' ? '#1B4332' : 'white',
            }}
          >
            ✋ Manual
          </button>
        </div>

        {/* Search bar — only in manual mode */}
        {mode === 'manual' && (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2
                             text-lg pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl text-sm
                         font-medium text-gray-800 outline-none
                         placeholder-gray-400"
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            />
            {searchQuery.length > 0 && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-gray-400 text-lg press-effect"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {/* Selected count bar */}
      <div className={`px-5 py-3 flex items-center justify-between
                       transition-all ${selected.length > 0
          ? 'bg-fridge-gold'
          : 'bg-white border-b border-gray-100'
        }`}>
        <p className={`text-sm font-semibold ${selected.length > 0
          ? 'text-white' : 'text-gray-400'}`}>
          {selected.length === 0
            ? 'Nothing selected yet'
            : `✓ ${selected.length} ingredient${selected.length !== 1 ? 's' : ''} selected`
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

      {/* ==================== CAMERA MODE ==================== */}
      {mode === 'camera' && (
        <div className="flex-1 p-4 overflow-y-auto">

          {/* Idle state — upload prompt */}
          {cameraState === 'idle' && (
            <>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-3xl p-8
                           text-center cursor-pointer press-effect
                           transition-all mb-4"
                style={{
                  borderColor: '#2D6A4F',
                  backgroundColor: '#F0FDF4',
                }}
              >
                <div className="text-6xl mb-4">📷</div>
                <h3 className="font-bold text-fridge-green text-lg mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Photograph your fridge
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed
                               max-w-xs mx-auto">
                  Open your fridge door, take a photo, and NutriMo
                  will identify every ingredient automatically
                </p>
                <div className="mt-4 inline-flex items-center gap-2
                                px-6 py-3 rounded-2xl text-white
                                font-bold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
                  }}>
                  📷 Take Photo or Upload
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white rounded-3xl p-4 card-shadow">
                <p className="font-bold text-gray-700 text-sm mb-3">
                  📸 Tips for best results
                </p>
                <div className="space-y-2">
                  {[
                    'Open the fridge door fully before photographing',
                    'Make sure lighting is good — turn on kitchen lights',
                    'Include shelves, drawers and door compartments',
                    'Get close enough so labels and items are readable',
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-fridge-green font-bold
                                       text-sm flex-shrink-0">
                        {i + 1}.
                      </span>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-gray-400 text-xs mt-4">
                Or switch to Manual mode to select ingredients yourself
              </p>
            </>
          )}

          {/* Scanning state */}
          {cameraState === 'scanning' && (
            <div className="flex flex-col items-center py-8">
              {photoPreview && (
                <div className="w-full max-w-xs rounded-3xl overflow-hidden
                                card-shadow mb-6 relative">
                  <img
                    src={photoPreview}
                    alt="Fridge scan"
                    className="w-full object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  <div className="absolute inset-0 flex items-center
                                  justify-center"
                    style={{ backgroundColor: 'rgba(27,67,50,0.7)' }}>
                    <div className="text-center text-white">
                      <div className="text-4xl mb-2 animate-bounce">🔬</div>
                      <p className="font-semibold text-sm">Scanning...</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="flex gap-3 justify-center mb-4">
                  {['🌿', '🫚', '🧅', '🌶️'].map((emoji, i) => (
                    <span
                      key={i}
                      className="text-2xl"
                      style={{
                        animation: `float 1.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                        display: 'inline-block',
                      }}
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
                <p className="text-fridge-green font-bold text-base mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {scanMessage}
                </p>
                <p className="text-gray-400 text-xs">
                  GPT-4o Vision is reading your fridge
                </p>
              </div>
            </div>
          )}

          {/* Done state */}
          {cameraState === 'done' && (
            <>
              {/* Photo preview */}
              {photoPreview && (
                <div className="w-full rounded-3xl overflow-hidden
                                card-shadow mb-4">
                  <img
                    src={photoPreview}
                    alt="Scanned fridge"
                    className="w-full object-cover"
                    style={{ maxHeight: '180px' }}
                  />
                </div>
              )}

              {/* Success message */}
              <div className="bg-green-50 border border-green-200
                              rounded-3xl p-4 mb-4">
                <p className="text-green-800 font-bold text-sm mb-1">
                  ✅ Scan complete
                </p>
                <p className="text-green-600 text-xs">{scanMessage}</p>
              </div>

              {/* Detected ingredients */}
              {detectedIngredients.length > 0 && (
                <div className="bg-white rounded-3xl p-4 card-shadow mb-4">
                  <h3 className="font-bold text-gray-800 text-sm mb-3"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    🔍 Detected in your fridge
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detectedIngredients.map((item, i) => (
                      <button
                        key={i}
                        onClick={() => toggle(item)}
                        className="text-xs px-3 py-1.5 rounded-full
                                   font-semibold press-effect transition-all"
                        style={selected.includes(item) ? {
                          background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
                          color: 'white',
                        } : {
                          backgroundColor: '#F4ECD8',
                          color: '#555',
                        }}
                      >
                        {selected.includes(item) ? '✓ ' : ''}{item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={resetCamera}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold
                             border-2 press-effect"
                  style={{ borderColor: '#1B4332', color: '#1B4332' }}
                >
                  📷 Scan Again
                </button>
                <button
                  onClick={() => setMode('manual')}
                  className="flex-1 py-3 rounded-2xl text-sm font-bold
                             text-white press-effect"
                  style={{
                    background: 'linear-gradient(135deg, #E76F51, #F4A261)',
                  }}
                >
                  ✋ Add More
                </button>
              </div>
            </>
          )}

          {/* Error state */}
          {cameraState === 'error' && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">😕</div>
              <h3 className="font-bold text-gray-700 text-lg mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Scan failed
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed
                             max-w-xs mx-auto">
                {scanMessage}
              </p>
              <button
                onClick={resetCamera}
                className="px-8 py-3 rounded-2xl text-white font-bold
                           press-effect"
                style={{
                  background: 'linear-gradient(135deg, #1B4332, #2D6A4F)',
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <div className="h-28" />
        </div>
      )}

      {/* ==================== MANUAL MODE ==================== */}
      {mode === 'manual' && (
        <>
          {/* Category tabs */}
          {!isSearching && (
            <div className="bg-white border-b border-gray-100">
              <div className="flex overflow-x-auto gap-1 px-4 py-3">
                {categoryKeys.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full
                               text-xs font-semibold transition-all
                               press-effect"
                    style={{
                      backgroundColor: activeCategory === cat
                        ? '#1B4332' : '#F4ECD8',
                      color: activeCategory === cat ? 'white' : '#555',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search context */}
          {isSearching && (
            <div className="px-5 py-2 bg-blue-50 border-b
                            border-blue-100">
              <p className="text-xs text-blue-600 font-medium">
                🔍 {searchResults.length} results found
              </p>
            </div>
          )}

          {/* Selected pills */}
          {selected.length > 0 && (
            <div className="flex overflow-x-auto gap-2 px-4 py-2
                            bg-green-50 border-b border-green-100">
              {selected.map(item => (
                <span
                  key={item}
                  onClick={() => toggle(item)}
                  className="whitespace-nowrap text-xs px-3 py-1
                             rounded-full cursor-pointer font-medium
                             press-effect flex-shrink-0"
                  style={{ backgroundColor: '#1B4332', color: 'white' }}
                >
                  {item} ×
                </span>
              ))}
            </div>
          )}

          {/* Ingredients grid */}
          <div className="flex-1 p-4 overflow-y-auto">

            {isSearching && searchResults.length === 0 && (
              <div className="flex flex-col items-center justify-center
                              py-16 text-center">
                <div className="text-5xl mb-3">🤷</div>
                <p className="font-semibold text-gray-600 mb-1">
                  No results for "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-fridge-green text-sm
                             font-semibold underline"
                >
                  Clear search
                </button>
              </div>
            )}

            {!isSearching && (
              <p className="text-xs text-gray-400 mb-3 font-medium">
                {CATEGORIES[activeCategory].length} ingredients
                in {activeCategory}
              </p>
            )}

            {displayItems.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {displayItems.map(({ item, category }) => {
                  const isSelected = selected.includes(item);
                  const isPopping = poppedItem === item;
                  return (
                    <button
                      key={`${category}-${item}`}
                      onClick={() => toggle(item)}
                      className={`p-3 rounded-2xl text-sm font-medium
                                  text-left transition-all
                                  ${isPopping ? 'ingredient-pop' : ''}`}
                      style={isSelected ? {
                        background:
                          'linear-gradient(135deg, #1B4332, #2D6A4F)',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(27, 67, 50, 0.3)',
                      } : {
                        backgroundColor: 'white',
                        color: '#374151',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      {isSearching && (
                        <span className="block text-xs mb-1 opacity-50"
                          style={{
                            color: isSelected ? '#86EFAC' : '#9CA3AF',
                          }}>
                          {category}
                        </span>
                      )}
                      {isSelected ? '✓ ' : ''}{item}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="h-28" />
          </div>
        </>
      )}

      {/* Analyse button — always visible */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2
                      w-full max-w-sm px-4 pb-6 pt-3"
        style={{
          background:
            'linear-gradient(to top, #FFFBF5 70%, transparent)',
        }}>
        <button
          onClick={handleAnalyse}
          disabled={selected.length < 3}
          className="w-full py-4 rounded-2xl font-bold text-lg
                     transition-all press-effect"
          style={selected.length >= 3 ? {
            background: 'linear-gradient(135deg, #E76F51, #F4A261)',
            color: 'white',
            boxShadow: '0 8px 24px rgba(231, 111, 81, 0.4)',
          } : {
            backgroundColor: '#E5E7EB',
            color: '#9CA3AF',
          }}
        >
          {selected.length >= 3
            ? `Analyse My Fridge (${selected.length})`
            : `Select ${3 - selected.length} more to continue`
          }
        </button>
      </div>

    </div>
  );
}

export default Scan;