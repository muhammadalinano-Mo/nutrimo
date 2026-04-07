// ============================================================
// NutriMo Nutrition Engine v3
// Based on Nordic Nutrition Recommendations 2023 (NNR2023)
// WHO Essential Nutrients framework
// Livsmedelsverket (Swedish Food Agency) guidelines
// ============================================================

export const NUTRIENTS = {
  vitaminD: {
    name: 'Vitamin D',
    emoji: '☀️',
    importance: 'critical',
    swedenNote: 'Near zero sunlight Oct–March. Most important nutrient in Sweden.',
    deficiencySymptoms: 'Fatigue, low mood, weak immunity, bone pain',
    goodSources: 'Fatty fish, eggs, fortified milk, chanterelles',
    dailyTarget: '10–20 mcg/day (NNR2023)',
  },
  omega3: {
    name: 'Omega-3',
    emoji: '🐟',
    importance: 'critical',
    swedenNote: 'Essential for brain and heart. Most Swedes eat too little fatty fish.',
    deficiencySymptoms: 'Brain fog, dry skin, inflammation, poor heart health',
    goodSources: 'Herring, mackerel, salmon, flaxseed, walnuts, kalonji',
    dailyTarget: '2–3g EPA+DHA per day',
  },
  iron: {
    name: 'Iron',
    emoji: '🩸',
    importance: 'critical',
    swedenNote: 'Most common deficiency globally. Affects 1 in 3 Swedish women.',
    deficiencySymptoms: 'Fatigue, pale skin, poor concentration, breathlessness',
    goodSources: 'Red meat, liver, lentils, saag, methi, zeera, daal',
    dailyTarget: '9mg/day men, 15mg/day women (NNR2023)',
  },
  vitaminC: {
    name: 'Vitamin C',
    emoji: '🍊',
    importance: 'high',
    swedenNote: 'Boosts iron absorption by 3x. Critical in dark Swedish winters.',
    deficiencySymptoms: 'Low immunity, slow healing, fatigue, bleeding gums',
    goodSources: 'Lingonberries, rosehip, kale, peppers, amla, green chilli',
    dailyTarget: '75–100mg/day (NNR2023)',
  },
  calcium: {
    name: 'Calcium',
    emoji: '🦴',
    importance: 'high',
    swedenNote: 'Sweden has high osteoporosis rates. Critical for all ages.',
    deficiencySymptoms: 'Weak bones, muscle cramps, tooth decay, brittle nails',
    goodSources: 'Filmjolk, milk, cheese, yoghurt, sesame seeds til, methi',
    dailyTarget: '800–900mg/day (NNR2023)',
  },
  protein: {
    name: 'Complete Protein',
    emoji: '💪',
    importance: 'high',
    swedenNote: 'Essential for muscle repair, satiety and immune function.',
    deficiencySymptoms: 'Muscle weakness, slow recovery, constant hunger, hair loss',
    goodSources: 'Eggs, fish, meat, legumes, dairy, paneer, daal combinations',
    dailyTarget: '0.8–1.2g per kg bodyweight (NNR2023)',
  },
  fibre: {
    name: 'Dietary Fibre',
    emoji: '🌾',
    importance: 'high',
    swedenNote: 'Most Swedes eat half the recommended amount. Gut health crisis.',
    deficiencySymptoms: 'Poor gut health, blood sugar spikes, high cholesterol',
    goodSources: 'Rye bread, oats, vegetables, legumes, atta flour, chickpeas',
    dailyTarget: '25–35g/day (NNR2023)',
  },
  probiotics: {
    name: 'Probiotics',
    emoji: '🦠',
    importance: 'high',
    swedenNote: 'Gut microbiome controls immunity. Fermented foods daily essential.',
    deficiencySymptoms: 'Poor immunity, digestive issues, inflammation, low mood',
    goodSources: 'Filmjolk, kefir, yoghurt, surströmming, lassi, achaar',
    dailyTarget: 'At least one fermented food daily',
  },
  zinc: {
    name: 'Zinc',
    emoji: '🛡️',
    importance: 'medium',
    swedenNote: 'Immunity and wound healing. Low in plant-heavy Swedish diets.',
    deficiencySymptoms: 'Frequent colds, slow healing, hair loss, loss of taste',
    goodSources: 'Meat, shellfish, pumpkin seeds, chickpeas, kalonji',
    dailyTarget: '7–10mg/day (NNR2023)',
  },
  vitaminB12: {
    name: 'Vitamin B12',
    emoji: '⚡',
    importance: 'high',
    swedenNote: 'Energy and nerve health. Entirely absent from plant foods.',
    deficiencySymptoms: 'Extreme fatigue, brain fog, nerve tingling, memory issues',
    goodSources: 'Eggs, fish, meat, dairy, fortified plant milks',
    dailyTarget: '2mcg/day (NNR2023)',
  },
  magnesium: {
    name: 'Magnesium',
    emoji: '😴',
    importance: 'medium',
    swedenNote: 'Sleep and stress management. Depleted by modern processed diet.',
    deficiencySymptoms: 'Poor sleep, muscle cramps, anxiety, fatigue, headaches',
    goodSources: 'Dark chocolate, pumpkin seeds, almonds, oats, sesame til',
    dailyTarget: '280–350mg/day (NNR2023)',
  },
  folate: {
    name: 'Folate (B9)',
    emoji: '🌿',
    importance: 'high',
    swedenNote: 'Cell repair and DNA. Critical for women especially.',
    deficiencySymptoms: 'Fatigue, mouth sores, poor cell repair, birth defect risk',
    goodSources: 'Beetroot, kale, saag, methi, lentils, asparagus, liver',
    dailyTarget: '300–400mcg/day (NNR2023)',
  },
  vitaminA: {
    name: 'Vitamin A',
    emoji: '👁️',
    importance: 'medium',
    swedenNote: 'Vision and skin health. Often overlooked in northern diets.',
    deficiencySymptoms: 'Night blindness, dry skin, frequent infections',
    goodSources: 'Liver, carrots, sweet potato, butter, ghee, eggs, moringa',
    dailyTarget: '700–900mcg RAE/day (NNR2023)',
  },
  potassium: {
    name: 'Potassium',
    emoji: '❤️',
    importance: 'medium',
    swedenNote: 'Heart health and blood pressure regulation.',
    deficiencySymptoms: 'Muscle weakness, cramps, high blood pressure, fatigue',
    goodSources: 'Potatoes, banana, salmon, yoghurt, beans, sweet potato',
    dailyTarget: '3500mg/day (NNR2023)',
  },
  antioxidants: {
    name: 'Antioxidants',
    emoji: '🫐',
    importance: 'medium',
    swedenNote: 'Nordic berries are world-class antioxidant sources. Use them.',
    deficiencySymptoms: 'Chronic inflammation, poor recovery, accelerated ageing',
    goodSources: 'Lingonberries, blueberries, rosehip, turmeric, ginger, amla',
    dailyTarget: 'Varied colourful foods every day',
  },
};

export const INGREDIENT_NUTRIENTS = {
  'Filmjolk': ['calcium', 'probiotics', 'vitaminB12', 'protein'],
  'Herring': ['vitaminD', 'omega3', 'vitaminB12', 'protein', 'zinc'],
  'Salmon': ['vitaminD', 'omega3', 'vitaminB12', 'protein', 'potassium'],
  'Rye bread': ['fibre', 'magnesium', 'folate', 'zinc'],
  'Lingonberries': ['vitaminC', 'antioxidants', 'fibre'],
  'Beetroot': ['folate', 'potassium', 'antioxidants', 'fibre'],
  'Kale': ['vitaminC', 'vitaminA', 'calcium', 'iron', 'folate', 'antioxidants'],
  'Oats': ['fibre', 'magnesium', 'zinc', 'protein'],
  'Mackerel': ['vitaminD', 'omega3', 'vitaminB12', 'protein'],
  'Eggs': ['vitaminD', 'vitaminB12', 'protein', 'zinc', 'vitaminA'],
  'Cheese': ['calcium', 'protein', 'vitaminB12', 'vitaminA'],
  'Butter': ['vitaminA', 'vitaminD'],
  'Potatoes': ['potassium', 'vitaminC', 'fibre'],
  'Cabbage': ['vitaminC', 'fibre', 'folate', 'antioxidants'],
  'Pumpkin seeds': ['magnesium', 'zinc', 'omega3', 'protein'],
  'Gravlax': ['vitaminD', 'omega3', 'vitaminB12', 'protein'],
  'Crispbread': ['fibre', 'magnesium'],
  'Sour cream': ['calcium', 'vitaminA'],
  'Dill': ['vitaminC', 'antioxidants', 'folate'],
  'Horseradish': ['vitaminC', 'antioxidants'],
  'Cloudberries': ['vitaminC', 'antioxidants', 'fibre'],
  'Blueberries': ['vitaminC', 'antioxidants', 'fibre'],
  'Cod': ['vitaminB12', 'protein', 'zinc'],
  'Meatballs': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Liver paste': ['vitaminA', 'iron', 'vitaminB12', 'folate', 'zinc'],
  'Mustard': ['antioxidants'],
  'Pickled cucumber': ['probiotics'],
  'Chanterelles': ['vitaminD', 'fibre', 'potassium'],
  'Porcini mushrooms': ['vitaminD', 'fibre', 'potassium', 'zinc'],
  'Nyponsoppa rosehip': ['vitaminC', 'antioxidants'],
  'Pearl barley': ['fibre', 'magnesium', 'zinc'],
  'Rutabaga swede': ['vitaminC', 'fibre', 'potassium'],
  'Celeriac': ['vitaminC', 'fibre', 'potassium'],
  'Parsnip': ['fibre', 'folate', 'potassium'],
  'Sea buckthorn': ['vitaminC', 'vitaminA', 'antioxidants', 'omega3'],
  'Surströmming': ['vitaminD', 'omega3', 'probiotics', 'vitaminB12'],
  'Whitefish': ['vitaminD', 'protein', 'vitaminB12'],
  'Perch': ['protein', 'vitaminB12'],
  'Crayfish': ['protein', 'zinc', 'vitaminB12'],
  'Daal lentils': ['iron', 'folate', 'protein', 'fibre', 'zinc'],
  'Saag spinach': ['iron', 'folate', 'vitaminC', 'calcium', 'vitaminA', 'antioxidants'],
  'Methi fenugreek': ['iron', 'fibre', 'calcium', 'folate', 'antioxidants'],
  'Zeera cumin': ['iron', 'antioxidants', 'magnesium'],
  'Haldi turmeric': ['antioxidants', 'iron'],
  'Ginger': ['antioxidants', 'potassium'],
  'Garlic': ['antioxidants', 'zinc', 'potassium'],
  'Kalonji black seed': ['antioxidants', 'iron', 'zinc', 'omega3'],
  'Ghee': ['vitaminA', 'vitaminD'],
  'Yoghurt': ['calcium', 'probiotics', 'protein', 'vitaminB12', 'potassium'],
  'Chickpeas': ['protein', 'iron', 'fibre', 'zinc', 'folate'],
  'Basmati rice': ['fibre', 'magnesium'],
  'Karela bitter gourd': ['vitaminC', 'antioxidants', 'folate'],
  'Ajwain': ['antioxidants', 'fibre'],
  'Mustard seeds': ['antioxidants', 'magnesium', 'zinc'],
  'Coriander': ['vitaminC', 'vitaminA', 'antioxidants', 'folate'],
  'Green chilli': ['vitaminC', 'antioxidants', 'vitaminA'],
  'Atta flour': ['fibre', 'iron', 'magnesium', 'zinc'],
  'Moong dal': ['protein', 'folate', 'iron', 'fibre', 'potassium'],
  'Chana dal': ['protein', 'iron', 'fibre', 'zinc', 'folate'],
  'Masoor dal': ['protein', 'iron', 'folate', 'fibre'],
  'Urad dal': ['protein', 'iron', 'calcium', 'fibre'],
  'Paneer': ['calcium', 'protein', 'vitaminA'],
  'Tamarind': ['vitaminC', 'antioxidants', 'potassium'],
  'Cardamom': ['antioxidants', 'magnesium'],
  'Cloves': ['antioxidants', 'magnesium'],
  'Cinnamon': ['antioxidants', 'iron'],
  'Bay leaves': ['antioxidants', 'vitaminA'],
  'Saffron': ['antioxidants', 'vitaminA'],
  'Fennel seeds': ['antioxidants', 'calcium', 'fibre'],
  'Amchur mango powder': ['vitaminC', 'antioxidants'],
  'Kashmiri chilli': ['vitaminC', 'vitaminA', 'antioxidants'],
  'Garam masala': ['antioxidants', 'iron'],
  'Chaat masala': ['antioxidants', 'vitaminC'],
  'Curry leaves': ['vitaminA', 'calcium', 'antioxidants', 'iron'],
  'Coconut milk': ['potassium', 'magnesium'],
  'Jaggery': ['iron', 'potassium'],
  'Besan chickpea flour': ['protein', 'iron', 'fibre', 'folate'],
  'Semolina': ['fibre', 'iron', 'magnesium'],
  'Poha flattened rice': ['iron', 'fibre'],
  'Amaranth': ['protein', 'calcium', 'iron', 'magnesium'],
  'Moringa': ['vitaminA', 'vitaminC', 'calcium', 'iron', 'antioxidants'],
  'Tulsi holy basil': ['antioxidants', 'vitaminC', 'vitaminA'],
  'Amla gooseberry': ['vitaminC', 'antioxidants', 'iron'],
  'Broccoli': ['vitaminC', 'folate', 'fibre', 'calcium', 'antioxidants'],
  'Carrots': ['vitaminA', 'antioxidants', 'fibre', 'potassium'],
  'Onions': ['antioxidants', 'vitaminC', 'fibre'],
  'Leeks': ['folate', 'vitaminC', 'fibre'],
  'Cucumber': ['potassium', 'vitaminC'],
  'Bell peppers': ['vitaminC', 'vitaminA', 'antioxidants'],
  'Sweet potato': ['vitaminA', 'potassium', 'fibre', 'vitaminC'],
  'Mushrooms': ['vitaminD', 'zinc', 'potassium', 'fibre'],
  'Cauliflower': ['vitaminC', 'fibre', 'folate'],
  'Brussels sprouts': ['vitaminC', 'folate', 'fibre', 'antioxidants'],
  'Asparagus': ['folate', 'vitaminC', 'fibre'],
  'Spinach': ['iron', 'folate', 'vitaminC', 'calcium', 'vitaminA', 'magnesium'],
  'Rocket': ['folate', 'vitaminC', 'vitaminA', 'antioxidants'],
  'Radishes': ['vitaminC', 'antioxidants'],
  'Fennel': ['vitaminC', 'fibre', 'potassium', 'calcium'],
  'Courgette': ['vitaminC', 'potassium', 'fibre'],
  'Aubergine': ['fibre', 'antioxidants', 'potassium'],
  'Peas': ['protein', 'fibre', 'folate', 'vitaminC', 'zinc'],
  'Okra bhindi': ['vitaminC', 'folate', 'fibre', 'calcium'],
  'Bottle gourd lauki': ['vitaminC', 'fibre', 'potassium'],
  'Tomatoes': ['vitaminC', 'vitaminA', 'potassium', 'antioxidants'],
  'Chicken': ['protein', 'vitaminB12', 'zinc', 'iron'],
  'Beef': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Lamb': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Tofu': ['protein', 'calcium', 'iron', 'magnesium'],
  'Kidney beans': ['protein', 'iron', 'fibre', 'folate', 'potassium'],
  'Lentils': ['protein', 'iron', 'folate', 'fibre', 'zinc'],
  'Edamame': ['protein', 'folate', 'vitaminC', 'calcium', 'iron'],
  'Sardines': ['vitaminD', 'omega3', 'calcium', 'vitaminB12', 'protein'],
  'Tuna': ['vitaminD', 'omega3', 'protein', 'vitaminB12'],
  'Turkey': ['protein', 'zinc', 'vitaminB12', 'iron'],
  'Venison': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Offal liver': ['vitaminA', 'iron', 'vitaminB12', 'folate', 'zinc'],
  'Bone broth': ['calcium', 'magnesium', 'potassium', 'protein'],
  'Whole milk': ['calcium', 'vitaminD', 'vitaminB12', 'protein', 'potassium'],
  'Oat milk': ['calcium', 'vitaminD', 'fibre'],
  'Milk': ['calcium', 'vitaminD', 'vitaminB12', 'protein'],
  'Kefir': ['probiotics', 'calcium', 'vitaminB12', 'protein'],
  'Quark': ['protein', 'calcium', 'vitaminB12'],
  'Skyr': ['protein', 'calcium', 'probiotics'],
  'Lassi': ['probiotics', 'calcium', 'protein'],
  'Banana': ['potassium', 'fibre', 'magnesium'],
  'Apple': ['fibre', 'vitaminC', 'antioxidants'],
  'Orange': ['vitaminC', 'folate', 'potassium', 'antioxidants'],
  'Mango': ['vitaminA', 'vitaminC', 'antioxidants', 'fibre'],
  'Berries': ['vitaminC', 'antioxidants', 'fibre'],
  'Strawberries': ['vitaminC', 'folate', 'antioxidants'],
  'Raspberries': ['vitaminC', 'fibre', 'antioxidants'],
  'Lemon': ['vitaminC', 'antioxidants'],
  'Pomegranate': ['vitaminC', 'antioxidants', 'folate', 'potassium'],
  'Dates': ['iron', 'potassium', 'fibre', 'magnesium'],
  'Figs': ['calcium', 'fibre', 'potassium', 'iron'],
  'Apricots': ['vitaminA', 'iron', 'potassium'],
  'Kiwi': ['vitaminC', 'folate', 'antioxidants'],
  'Papaya': ['vitaminC', 'vitaminA', 'antioxidants', 'fibre'],
  'Blackcurrants': ['vitaminC', 'antioxidants', 'iron'],
  'Elderberries': ['vitaminC', 'antioxidants', 'iron'],
  'Rosehip': ['vitaminC', 'antioxidants', 'vitaminA'],
  'Sourdough': ['fibre', 'probiotics', 'iron', 'magnesium'],
  'Brown rice': ['fibre', 'magnesium', 'zinc'],
  'Quinoa': ['protein', 'iron', 'magnesium', 'zinc', 'fibre'],
  'Barley': ['fibre', 'magnesium', 'zinc', 'folate'],
  'Spelt': ['fibre', 'magnesium', 'zinc', 'protein'],
  'Buckwheat': ['magnesium', 'fibre', 'zinc', 'protein'],
  'Millet': ['iron', 'magnesium', 'fibre'],
  'Walnuts': ['omega3', 'magnesium', 'antioxidants'],
  'Almonds': ['magnesium', 'calcium', 'protein'],
  'Sunflower seeds': ['magnesium', 'zinc', 'antioxidants'],
  'Flaxseed': ['omega3', 'fibre', 'magnesium'],
  'Sesame seeds til': ['calcium', 'magnesium', 'zinc', 'iron'],
  'Chia seeds': ['omega3', 'calcium', 'fibre', 'magnesium'],
  'Hemp seeds': ['protein', 'omega3', 'magnesium', 'zinc'],
  'Cashews': ['magnesium', 'zinc', 'iron', 'protein'],
  'Pistachios': ['potassium', 'antioxidants', 'protein'],
  'Pine nuts': ['iron', 'zinc', 'magnesium'],
  'Linseed oil': ['omega3'],
  'Turmeric haldi': ['antioxidants', 'iron'],
  'Cumin zeera': ['iron', 'antioxidants', 'magnesium'],
  'Coriander dhania': ['vitaminC', 'vitaminA', 'antioxidants'],
  'Fenugreek methi': ['iron', 'calcium', 'fibre', 'antioxidants'],
  'Black seed kalonji': ['antioxidants', 'iron', 'zinc', 'omega3'],
  'Black pepper': ['antioxidants', 'iron'],
  'Paprika': ['vitaminC', 'vitaminA', 'antioxidants'],
  'Caraway seeds': ['antioxidants', 'fibre', 'calcium'],
  'Allspice': ['antioxidants', 'iron'],
  'Juniper berries': ['antioxidants', 'vitaminC'],


  // EVERYDAY FOODS — real world ingredients
  'Falukorv': ['protein', 'iron', 'vitaminB12', 'zinc'],
  'Sausages': ['protein', 'iron', 'vitaminB12', 'zinc'],
  'Hot dog': ['protein', 'vitaminB12', 'zinc'],
  'Bacon': ['protein', 'vitaminB12', 'zinc', 'iron'],
  'Ham': ['protein', 'vitaminB12', 'zinc'],
  'Salami': ['protein', 'vitaminB12', 'zinc', 'iron'],
  'Mince meat': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Burger patties': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Frozen meatballs': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Pasta': ['fibre', 'protein', 'magnesium'],
  'Spaghetti': ['fibre', 'protein', 'magnesium'],
  'Noodles': ['fibre', 'magnesium'],
  'Instant noodles': ['fibre'],
  'White bread': ['fibre', 'iron'],
  'Wraps': ['fibre', 'iron'],
  'Tortilla': ['fibre', 'iron'],
  'Naan': ['fibre', 'iron', 'magnesium'],
  'Chapati': ['fibre', 'iron', 'magnesium'],
  'Frozen paratha': ['fibre', 'iron', 'magnesium'],
  'Frozen pizza': ['protein', 'calcium', 'fibre'],
  'Pizza': ['protein', 'calcium', 'fibre'],
  'Burger': ['protein', 'iron', 'zinc'],
  'Canned tomatoes': ['vitaminC', 'antioxidants', 'potassium'],
  'Canned beans': ['protein', 'iron', 'fibre', 'folate'],
  'Canned tuna': ['omega3', 'protein', 'vitaminB12', 'vitaminD'],
  'Canned corn': ['fibre', 'potassium'],
  'Canned soup': ['potassium', 'fibre'],
  'Ketchup': ['antioxidants'],
  'Mayo': ['vitaminA'],
  'Soy sauce': ['zinc'],
  'Hot sauce': ['vitaminC', 'antioxidants'],
  'Olive oil': ['antioxidants', 'vitaminA'],
  'Hummus': ['protein', 'iron', 'fibre', 'zinc'],
  'Avocado': ['potassium', 'antioxidants', 'magnesium'],
  'Cream cheese': ['calcium', 'vitaminA', 'protein'],
  'Cottage cheese': ['protein', 'calcium', 'vitaminB12'],
  'Frozen peas': ['protein', 'fibre', 'folate', 'vitaminC'],
  'Frozen vegetables': ['vitaminC', 'fibre', 'folate'],
  'Fish fingers': ['protein', 'vitaminB12'],
  'Nuggets': ['protein', 'zinc'],
  'Kaviar tube': ['omega3', 'vitaminD', 'vitaminB12'],
  'Prinskorv': ['protein', 'vitaminB12', 'zinc'],
  'Blodpudding': ['iron', 'protein', 'vitaminB12'],
  'Messmor': ['calcium', 'protein', 'vitaminB12'],
  'Achaar': ['probiotics', 'antioxidants'],
  'Papad': ['fibre', 'protein'],
  'Chutney': ['vitaminC', 'antioxidants'],
  'Shami kebab': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Seekh kebab': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Haleem': ['protein', 'iron', 'fibre', 'zinc'],
  'Biryani': ['protein', 'iron', 'fibre', 'magnesium'],
  'Toast': ['fibre', 'iron'],
  'Cereal': ['fibre', 'iron', 'vitaminB12'],
  'Pancakes': ['protein', 'calcium', 'vitaminB12'],
  'Orange juice': ['vitaminC', 'potassium', 'folate'],
  'Avocado toast': ['potassium', 'fibre', 'antioxidants'],
  'Sandwich': ['protein', 'fibre', 'iron'],
  'Salad': ['vitaminC', 'folate', 'antioxidants', 'fibre'],
  'Soup': ['potassium', 'fibre'],
  'Stir fry': ['vitaminC', 'fibre', 'protein'],
  'Curry': ['antioxidants', 'iron', 'fibre'],
  'Kebab': ['protein', 'iron', 'zinc', 'vitaminB12'],
  'Takeaway': ['protein', 'iron'],
  'Leftovers': ['protein', 'fibre'],
  'Frozen meal': ['protein', 'fibre'],
};

// ============================================================
// FOOD GROUP DETECTION
// ============================================================

const FOOD_GROUPS = {
  vegetables: [
    'Kale', 'Beetroot', 'Cabbage', 'Broccoli', 'Carrots', 'Onions',
    'Leeks', 'Cucumber', 'Bell peppers', 'Sweet potato', 'Mushrooms',
    'Cauliflower', 'Brussels sprouts', 'Asparagus', 'Spinach', 'Rocket',
    'Radishes', 'Fennel', 'Courgette', 'Aubergine', 'Peas', 'Tomatoes',
    'Saag spinach', 'Methi fenugreek', 'Karela bitter gourd',
    'Okra bhindi', 'Bottle gourd lauki', 'Potatoes', 'Celeriac',
    'Parsnip', 'Rutabaga swede', 'Chanterelles', 'Porcini mushrooms',
    'Moringa', 'Curry leaves', 'Tulsi holy basil',
  ],
  fruits: [
    'Lingonberries', 'Cloudberries', 'Blueberries', 'Banana', 'Apple',
    'Orange', 'Mango', 'Berries', 'Strawberries', 'Raspberries',
    'Lemon', 'Pomegranate', 'Dates', 'Figs', 'Apricots', 'Kiwi',
    'Papaya', 'Blackcurrants', 'Elderberries', 'Rosehip',
    'Sea buckthorn', 'Amla gooseberry', 'Tamarind', 'Nyponsoppa rosehip',
  ],
  protein: [
    'Eggs', 'Chicken', 'Beef', 'Lamb', 'Turkey', 'Venison',
    'Herring', 'Salmon', 'Mackerel', 'Cod', 'Sardines', 'Tuna',
    'Gravlax', 'Whitefish', 'Perch', 'Crayfish', 'Surströmming',
    'Tofu', 'Paneer', 'Daal lentils', 'Chickpeas', 'Lentils',
    'Kidney beans', 'Moong dal', 'Chana dal', 'Masoor dal',
    'Urad dal', 'Edamame', 'Meatballs', 'Offal liver', 'Bone broth',
    'Quinoa', 'Hemp seeds', 'Amaranth', 'Oats',
  ],
  dairy: [
    'Filmjolk', 'Yoghurt', 'Milk', 'Whole milk', 'Oat milk', 'Cheese',
    'Kefir', 'Skyr', 'Lassi', 'Quark', 'Sour cream', 'Butter', 'Ghee',
  ],
  healthyFats: [
    'Salmon', 'Herring', 'Mackerel', 'Sardines', 'Tuna', 'Gravlax',
    'Walnuts', 'Flaxseed', 'Chia seeds', 'Hemp seeds', 'Linseed oil',
    'Pumpkin seeds', 'Kalonji black seed', 'Black seed kalonji',
    'Sea buckthorn', 'Almonds', 'Ghee', 'Butter',
  ],
  wholegrains: [
    'Rye bread', 'Oats', 'Crispbread', 'Pearl barley', 'Barley',
    'Brown rice', 'Quinoa', 'Spelt', 'Buckwheat', 'Millet',
    'Atta flour', 'Basmati rice', 'Sourdough', 'Semolina',
    'Poha flattened rice', 'Amaranth',
  ],
  fermented: [
    'Filmjolk', 'Kefir', 'Yoghurt', 'Lassi', 'Surströmming',
    'Pickled cucumber', 'Sourdough', 'Skyr',
  ],
};

// ============================================================
// SCORING ENGINE v3 — Fair, Scientific, Nutritionist-Grade
// ============================================================

export function calculateNutritionScore(ingredients) {

  const nutrientKeys = Object.keys(NUTRIENTS);

  // Step 1 — Find covered nutrients
  const covered = new Set();
  const coveredBy = {};

  ingredients.forEach(ingredient => {
    const nutrients = INGREDIENT_NUTRIENTS[ingredient] || [];
    nutrients.forEach(nutrient => {
      covered.add(nutrient);
      if (!coveredBy[nutrient]) coveredBy[nutrient] = [];
      coveredBy[nutrient].push(ingredient);
    });
  });

  // Step 2 — Weighted nutrient score
  // Each nutrient has a weight based on importance
  // This is the foundation of the score
  const weights = {
    vitaminD:    10,  // Sweden critical
    iron:         9,  // Most common deficiency
    omega3:       9,  // Brain and heart
    vitaminB12:   8,  // Energy and nerves
    protein:      8,  // Muscle and repair
    calcium:      7,  // Bones
    vitaminC:     7,  // Immunity
    fibre:        7,  // Gut health
    folate:       6,  // Cell repair
    probiotics:   6,  // Microbiome
    zinc:         5,  // Immunity
    magnesium:    5,  // Sleep and stress
    vitaminA:     5,  // Vision
    potassium:    4,  // Heart
    antioxidants: 4,  // Inflammation
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  // totalWeight = 100 — convenient

  let earnedWeight = 0;
  covered.forEach(nutrient => {
    earnedWeight += weights[nutrient] || 0;
  });

  // Base score = percentage of weighted nutrients covered
  // Eggs + Butter + Rye covers vitaminD(10) + vitaminB12(8) +
  // protein(8) + fibre(7) + zinc(5) + magnesium(5) +
  // folate(6) + vitaminA(5) = 54 points out of 100
  // That gives a raw base of 54 — which is honest
 let score = Math.round((earnedWeight / totalWeight) * 100);

  // Step 3 — Food group detection
  const hasVegetables = ingredients.some(i => FOOD_GROUPS.vegetables.includes(i));
  const hasFruits = ingredients.some(i => FOOD_GROUPS.fruits.includes(i));
  const hasProtein = ingredients.some(i => FOOD_GROUPS.protein.includes(i));
  const hasDairy = ingredients.some(i => FOOD_GROUPS.dairy.includes(i));
  const hasHealthyFats = ingredients.some(i => FOOD_GROUPS.healthyFats.includes(i));
  const hasWholegrains = ingredients.some(i => FOOD_GROUPS.wholegrains.includes(i));
  const hasFermented = ingredients.some(i => FOOD_GROUPS.fermented.includes(i));

  const foodGroupsPresent = [
    hasVegetables, hasFruits, hasProtein,
    hasDairy, hasHealthyFats, hasWholegrains, hasFermented,
  ].filter(Boolean).length;

  // Step 4 — Hard cap by food group diversity
  const foodGroupCap =
    foodGroupsPresent >= 7 ? 98 :
    foodGroupsPresent >= 6 ? 88 :
    foodGroupsPresent >= 5 ? 78 :
    foodGroupsPresent >= 4 ? 68 :
    foodGroupsPresent >= 3 ? 55 :
    foodGroupsPresent >= 2 ? 42 : 30;

  // Step 5 — Hard cap by ingredient count
  const ingredientCap =
    ingredients.length >= 15 ? 98 :
    ingredients.length >= 12 ? 92 :
    ingredients.length >= 9  ? 84 :
    ingredients.length >= 7  ? 76 :
    ingredients.length >= 5  ? 66 :
    ingredients.length >= 4  ? 54 :
    ingredients.length >= 3  ? 42 : 25;

  // Apply both caps
  score = Math.min(score, foodGroupCap, ingredientCap);

  // Step 6 — Food group penalties
  const missingGroupPenalty =
    (!hasVegetables ? 8 : 0) +
    (!hasFruits ? 4 : 0) +
    (!hasProtein ? 8 : 0) +
    (!hasHealthyFats ? 4 : 0);

  score = score - missingGroupPenalty;

  // Step 7 — Bonuses
  const antiInflammatorySpices = [
    'Haldi turmeric', 'Turmeric haldi', 'Ginger', 'Garlic',
    'Kalonji black seed', 'Black seed kalonji', 'Cinnamon',
    'Zeera cumin', 'Cumin zeera', 'Coriander', 'Coriander dhania',
    'Methi fenugreek', 'Fenugreek methi', 'Ajwain', 'Black pepper',
  ];
  const spiceCount = ingredients.filter(
    i => antiInflammatorySpices.includes(i)
  ).length;
  const spiceBonus =
    spiceCount >= 4 ? 5 :
    spiceCount >= 2 ? 3 :
    spiceCount >= 1 ? 1 : 0;

  const nordicSuperfoods = [
    'Herring', 'Mackerel', 'Salmon', 'Gravlax', 'Surströmming',
    'Lingonberries', 'Cloudberries', 'Sea buckthorn', 'Rosehip',
    'Nyponsoppa rosehip', 'Filmjolk', 'Kefir', 'Chanterelles',
  ];
  const nordicCount = ingredients.filter(
    i => nordicSuperfoods.includes(i)
  ).length;
  const nordicBonus =
    nordicCount >= 3 ? 4 :
    nordicCount >= 2 ? 2 :
    nordicCount >= 1 ? 1 : 0;

  const diversityBonus =
    ingredients.length >= 12 ? 5 :
    ingredients.length >= 9  ? 3 :
    ingredients.length >= 6  ? 1 : 0;

  score = score + spiceBonus + nordicBonus + diversityBonus;

  // Floor at 10, ceiling at 98
  score = Math.max(10, Math.min(98, score));

  // Step 6 — Build nutrient breakdown
  const breakdown = nutrientKeys.map(key => {
    const nutrient = NUTRIENTS[key];
    const isCovered = covered.has(key);
    const sources = coveredBy[key] || [];

    return {
      key,
      name: nutrient.name,
      emoji: nutrient.emoji,
      importance: nutrient.importance,
      covered: isCovered,
      sources,
      deficiencySymptoms: nutrient.deficiencySymptoms,
      goodSources: nutrient.goodSources,
      dailyTarget: nutrient.dailyTarget,
      swedenNote: nutrient.swedenNote,
    };
  });

  // Sort: critical missing first, then high, then covered
  breakdown.sort((a, b) => {
    if (!a.covered && !b.covered) {
      const importanceOrder = { critical: 0, high: 1, medium: 2 };
      return importanceOrder[a.importance] - importanceOrder[b.importance];
    }
    if (!a.covered) return -1;
    if (!b.covered) return 1;
    return 0;
  });

  

  const scoreMessage =
    score >= 85
      ? 'Excellent. Your fridge covers almost all nutritional bases. Fine-tune with the gaps below.'
    : score >= 70
      ? 'Good foundations. A few targeted additions this week would make this excellent.'
    : score >= 55
      ? 'Decent base but missing some key food groups. Your body is likely noticing the gaps.'
    : score >= 40
      ? `Only ${foodGroupsPresent} of 7 food groups present. Focus on the critical missing nutrients below.`
    : score >= 25
      ? 'Very limited nutritional variety. Add one item from each missing food group this week.'
      : 'Your fridge needs urgent attention. Start with protein, vegetables and a source of Vitamin D.';

  return {
    score,
    scoreMessage,
    breakdown,
    coveredCount: covered.size,
    totalNutrients: nutrientKeys.length,
    foodGroups: {
      hasVegetables,
      hasFruits,
      hasProtein,
      hasDairy,
      hasHealthyFats,
      hasWholegrains,
      hasFermented,
      presentCount: foodGroupsPresent,
    },
    bonuses: {
      diversity: diversityBonus,
      spice: spiceBonus,
      nordic: nordicBonus,
    },
  };
}