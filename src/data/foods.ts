export interface Ingredient {
  name: string;
  quantity: number;
  source?: string;
  subIngredients?: Ingredient[];
}

export interface BuffInfo {
  type: string;
  value?: number;
  duration?: string;
}

export interface RecipeSource {
  type: 'tv' | 'mail' | 'skill' | 'starter' | 'shop' | 'event';
  character?: string;
  hearts?: number;
  tvDate?: string;
  skillLevel?: number;
  skillType?: string;
  price?: number;
  eventName?: string;
}

export interface Food {
  id: string;
  name: string;
  ingredients: Ingredient[];
  source: string;
  recipeSource?: RecipeSource;
  sellPrice: number;
  buff?: BuffInfo;
}

export const buffCategories = [
  { id: 'speed', name: 'Speed', icon: '⚡' },
  { id: 'luck', name: 'Luck', icon: '🍀' },
  { id: 'farming', name: 'Farming', icon: '🌾' },
  { id: 'mining', name: 'Mining', icon: '⛏️' },
  { id: 'fishing', name: 'Fishing', icon: '🎣' },
  { id: 'foraging', name: 'Foraging', icon: '🌲' },
  { id: 'attack', name: 'Attack', icon: '⚔️' },
  { id: 'defense', name: 'Defense', icon: '🛡️' },
  { id: 'magnetism', name: 'Magnetism', icon: '🧲' },
  { id: 'max-energy', name: 'Max Energy', icon: '💪' },
  { id: 'none', name: 'No Buff', icon: '🍽️' }
];

export const foods: Food[] = [
  {
    id: "fried-egg",
    name: "Fried Egg",
    ingredients: [{ name: "Egg", quantity: 1, source: "Chicken" }],
    source: "Starter",
    recipeSource: { type: 'starter' },
    sellPrice: 35
  },
  {
    id: "omelet",
    name: "Omelet",
    ingredients: [
      { name: "Egg", quantity: 1, source: "Chicken" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "The Queen of Sauce (Year 1, Spring 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Spring 28' },
    sellPrice: 125
  },
  {
    id: "salad",
    name: "Salad",
    ingredients: [
      { name: "Leek", quantity: 1, source: "Foraging (Spring)" },
      { name: "Dandelion", quantity: 1, source: "Foraging (Spring)" }
    ],
    source: "Emily (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Emily', hearts: 3 },
    sellPrice: 110
  },
  {
    id: "cheese-cauliflower",
    name: "Cheese Cauliflower",
    ingredients: [
      { name: "Cauliflower", quantity: 1, source: "Farming (Spring)" },
      { name: "Cheese", quantity: 1, source: "Cheese Press", subIngredients: [{ name: "Milk", quantity: 1, source: "Cow" }] }
    ],
    source: "The Queen of Sauce (Year 1, Spring 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Spring 14' },
    sellPrice: 300
  },
  {
    id: "baked-fish",
    name: "Baked Fish",
    ingredients: [
      { name: "Sunfish", quantity: 1, source: "Fishing (Spring/Summer)" },
      { name: "Bream", quantity: 1, source: "Fishing (All Seasons)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Summer 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Summer 7' },
    sellPrice: 100
  },
  {
    id: "parsnip-soup",
    name: "Parsnip Soup",
    ingredients: [
      { name: "Parsnip", quantity: 1, source: "Farming (Spring)" },
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Vinegar", quantity: 1, source: "Pierre's Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 7' },
    sellPrice: 120
  },
  {
    id: "vegetable-medley",
    name: "Vegetable Medley",
    ingredients: [
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" },
      { name: "Beet", quantity: 1, source: "Farming (Fall)" }
    ],
    source: "Caroline (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Caroline', hearts: 7 },
    sellPrice: 120
  },
  {
    id: "complete-breakfast",
    name: "Complete Breakfast",
    ingredients: [
      { name: "Fried Egg", quantity: 1, source: "Cooking", subIngredients: [{ name: "Egg", quantity: 1, source: "Chicken" }] },
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Hashbrowns", quantity: 1, source: "Cooking", subIngredients: [{ name: "Potato", quantity: 1, source: "Farming (Spring)" }, { name: "Oil", quantity: 1, source: "Oil Maker" }] },
      { name: "Pancakes", quantity: 1, source: "Cooking", subIngredients: [{ name: "Wheat Flour", quantity: 1, source: "Mill" }, { name: "Egg", quantity: 1, source: "Chicken" }] }
    ],
    source: "The Queen of Sauce (Year 2, Spring 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Spring 21' },
    sellPrice: 350,
    buff: { type: 'farming', value: 2, duration: '7m 41s' }
  },
  {
    id: "fried-calamari",
    name: "Fried Calamari",
    ingredients: [
      { name: "Squid", quantity: 1, source: "Fishing (Winter, Night)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "Jodi (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Jodi', hearts: 3 },
    sellPrice: 150
  },
  {
    id: "strange-bun",
    name: "Strange Bun",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Periwinkle", quantity: 1, source: "Crab Pot" },
      { name: "Void Mayonnaise", quantity: 1, source: "Mayonnaise Machine", subIngredients: [{ name: "Void Egg", quantity: 1, source: "Void Chicken" }] }
    ],
    source: "Shane (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Shane', hearts: 7 },
    sellPrice: 225
  },
  {
    id: "lucky-lunch",
    name: "Lucky Lunch",
    ingredients: [
      { name: "Sea Cucumber", quantity: 1, source: "Fishing (Fall/Winter)" },
      { name: "Tortilla", quantity: 1, source: "Cooking", subIngredients: [{ name: "Corn", quantity: 1, source: "Farming (Summer/Fall)" }] },
      { name: "Blue Jazz", quantity: 1, source: "Farming (Spring)" }
    ],
    source: "The Queen of Sauce (Year 2, Spring 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Spring 28' },
    sellPrice: 250,
    buff: { type: 'luck', value: 3, duration: '11m 11s' }
  },
  {
    id: "fried-mushroom",
    name: "Fried Mushroom",
    ingredients: [
      { name: "Common Mushroom", quantity: 1, source: "Foraging (Fall)" },
      { name: "Morel", quantity: 1, source: "Foraging (Spring, Secret Woods)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 14' },
    sellPrice: 135,
    buff: { type: 'attack', value: 2, duration: '5m 35s' }
  },
  {
    id: "pizza",
    name: "Pizza",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" },
      { name: "Cheese", quantity: 1, source: "Cheese Press", subIngredients: [{ name: "Milk", quantity: 1, source: "Cow" }] }
    ],
    source: "The Queen of Sauce (Year 2, Spring 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Spring 7' },
    sellPrice: 300
  },
  {
    id: "bean-hotpot",
    name: "Bean Hotpot",
    ingredients: [
      { name: "Green Bean", quantity: 2, source: "Farming (Spring)" }
    ],
    source: "The Queen of Sauce (Year 1, Summer 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Summer 21' },
    sellPrice: 100,
    buff: { type: 'magnetism', value: 32, duration: '5m 35s' }
  },
  {
    id: "glazed-yams",
    name: "Glazed Yams",
    ingredients: [
      { name: "Yam", quantity: 1, source: "Farming (Fall)" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 21' },
    sellPrice: 200
  },
  {
    id: "carp-surprise",
    name: "Carp Surprise",
    ingredients: [
      { name: "Carp", quantity: 4, source: "Fishing (All Seasons)" }
    ],
    source: "The Queen of Sauce (Year 2, Summer 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Summer 7' },
    sellPrice: 150
  },
  {
    id: "hashbrowns",
    name: "Hashbrowns",
    ingredients: [
      { name: "Potato", quantity: 1, source: "Farming (Spring)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "The Queen of Sauce (Year 2, Spring 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Spring 14' },
    sellPrice: 120,
    buff: { type: 'farming', value: 1, duration: '5m 35s' }
  },
  {
    id: "pancakes",
    name: "Pancakes",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" }
    ],
    source: "The Queen of Sauce (Year 1, Summer 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Summer 14' },
    sellPrice: 80,
    buff: { type: 'foraging', value: 2, duration: '11m 11s' }
  },
  {
    id: "salmon-dinner",
    name: "Salmon Dinner",
    ingredients: [
      { name: "Salmon", quantity: 1, source: "Fishing (Fall)" },
      { name: "Amaranth", quantity: 1, source: "Farming (Fall)" },
      { name: "Kale", quantity: 1, source: "Farming (Fall)" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 28' },
    sellPrice: 300,
    buff: { type: 'defense', value: 3, duration: '5m 35s' }
  },
  {
    id: "fish-taco",
    name: "Fish Taco",
    ingredients: [
      { name: "Tuna", quantity: 1, source: "Fishing (Summer/Winter)" },
      { name: "Tortilla", quantity: 1, source: "Cooking", subIngredients: [{ name: "Corn", quantity: 1, source: "Farming (Summer/Fall)" }] },
      { name: "Red Cabbage", quantity: 1, source: "Farming (Summer)" },
      { name: "Mayonnaise", quantity: 1, source: "Mayonnaise Machine" }
    ],
    source: "Linus (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Linus', hearts: 7 },
    sellPrice: 500,
    buff: { type: 'fishing', value: 2, duration: '5m 35s' }
  },
  {
    id: "crispy-bass",
    name: "Crispy Bass",
    ingredients: [
      { name: "Largemouth Bass", quantity: 1, source: "Fishing (All Seasons)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 7' },
    sellPrice: 150
  },
  {
    id: "pepper-poppers",
    name: "Pepper Poppers",
    ingredients: [
      { name: "Hot Pepper", quantity: 1, source: "Farming (Summer)" },
      { name: "Cheese", quantity: 1, source: "Cheese Press", subIngredients: [{ name: "Milk", quantity: 1, source: "Cow" }] }
    ],
    source: "Shane (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Shane', hearts: 3 },
    sellPrice: 200,
    buff: { type: 'speed', value: 1, duration: '7m' }
  },
  {
    id: "bread",
    name: "Bread",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Summer 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Summer 28' },
    sellPrice: 60
  },
  {
    id: "tom-kha-soup",
    name: "Tom Kha Soup",
    ingredients: [
      { name: "Coconut", quantity: 1, source: "Oasis Shop" },
      { name: "Shrimp", quantity: 1, source: "Crab Pot" },
      { name: "Common Mushroom", quantity: 1, source: "Foraging (Fall)" }
    ],
    source: "Sandy (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Sandy', hearts: 7 },
    sellPrice: 250,
    buff: { type: 'max-energy', value: 30, duration: '7m' }
  },
  {
    id: "trout-soup",
    name: "Trout Soup",
    ingredients: [
      { name: "Rainbow Trout", quantity: 1, source: "Fishing (Summer)" },
      { name: "Green Algae", quantity: 1, source: "Fishing" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 14' },
    sellPrice: 100,
    buff: { type: 'fishing', value: 1, duration: '4m 39s' }
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" }
    ],
    source: "The Queen of Sauce (Year 1, Winter 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Winter 14' },
    sellPrice: 200
  },
  {
    id: "pink-cake",
    name: "Pink Cake",
    ingredients: [
      { name: "Melon", quantity: 1, source: "Farming (Summer)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" }
    ],
    source: "The Queen of Sauce (Year 2, Summer 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Summer 21' },
    sellPrice: 480
  },
  {
    id: "rhubarb-pie",
    name: "Rhubarb Pie",
    ingredients: [
      { name: "Rhubarb", quantity: 1, source: "Oasis Shop" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "Marnie (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Marnie', hearts: 7 },
    sellPrice: 400
  },
  {
    id: "cookie",
    name: "Cookie",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" }
    ],
    source: "Evelyn (Mail, 4+ Hearts)",
    recipeSource: { type: 'mail', character: 'Evelyn', hearts: 4 },
    sellPrice: 140
  },
  {
    id: "spaghetti",
    name: "Spaghetti",
    ingredients: [
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Lewis (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Lewis', hearts: 3 },
    sellPrice: 120
  },
  {
    id: "fried-eel",
    name: "Fried Eel",
    ingredients: [
      { name: "Eel", quantity: 1, source: "Fishing (Fall/Spring, Rain)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "George (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'George', hearts: 3 },
    sellPrice: 120,
    buff: { type: 'luck', value: 1, duration: '5m 35s' }
  },
  {
    id: "spicy-eel",
    name: "Spicy Eel",
    ingredients: [
      { name: "Eel", quantity: 1, source: "Fishing (Fall/Spring, Rain)" },
      { name: "Hot Pepper", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "George (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'George', hearts: 7 },
    sellPrice: 175,
    buff: { type: 'luck', value: 1, duration: '5m 35s' }
  },
  {
    id: "sashimi",
    name: "Sashimi",
    ingredients: [
      { name: "Any Fish", quantity: 1, source: "Fishing" }
    ],
    source: "Linus (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Linus', hearts: 3 },
    sellPrice: 75
  },
  {
    id: "maki-roll",
    name: "Maki Roll",
    ingredients: [
      { name: "Any Fish", quantity: 1, source: "Fishing" },
      { name: "Seaweed", quantity: 1, source: "Fishing (Ocean)" },
      { name: "Rice", quantity: 1, source: "Mill", subIngredients: [{ name: "Unmilled Rice", quantity: 1, source: "Farming (Spring)" }] }
    ],
    source: "The Queen of Sauce (Year 1, Summer 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Summer 21' },
    sellPrice: 220
  },
  {
    id: "tortilla",
    name: "Tortilla",
    ingredients: [
      { name: "Corn", quantity: 1, source: "Farming (Summer/Fall)" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 7' },
    sellPrice: 50
  },
  {
    id: "red-plate",
    name: "Red Plate",
    ingredients: [
      { name: "Red Cabbage", quantity: 1, source: "Farming (Summer)" },
      { name: "Radish", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Emily (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Emily', hearts: 7 },
    sellPrice: 400,
    buff: { type: 'max-energy', value: 50, duration: '3m 30s' }
  },
  {
    id: "eggplant-parmesan",
    name: "Eggplant Parmesan",
    ingredients: [
      { name: "Eggplant", quantity: 1, source: "Farming (Fall)" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Lewis (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Lewis', hearts: 7 },
    sellPrice: 200,
    buff: { type: 'mining', value: 1, duration: '4m 39s' }
  },
  {
    id: "rice-pudding",
    name: "Rice Pudding",
    ingredients: [
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Rice", quantity: 1, source: "Mill", subIngredients: [{ name: "Unmilled Rice", quantity: 1, source: "Farming (Spring)" }] }
    ],
    source: "Evelyn (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Evelyn', hearts: 7 },
    sellPrice: 260
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    ingredients: [
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "Jodi (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Jodi', hearts: 7 },
    sellPrice: 120
  },
  {
    id: "blueberry-tart",
    name: "Blueberry Tart",
    ingredients: [
      { name: "Blueberry", quantity: 1, source: "Farming (Summer)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" }
    ],
    source: "Pierre (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Pierre', hearts: 3 },
    sellPrice: 150
  },
  {
    id: "autumn-bounty",
    name: "Autumn's Bounty",
    ingredients: [
      { name: "Yam", quantity: 1, source: "Farming (Fall)" },
      { name: "Pumpkin", quantity: 1, source: "Farming (Fall)" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 28' },
    sellPrice: 350,
    buff: { type: 'foraging', value: 2, duration: '7m 41s' }
  },
  {
    id: "pumpkin-soup",
    name: "Pumpkin Soup",
    ingredients: [
      { name: "Pumpkin", quantity: 1, source: "Farming (Fall)" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "Robin (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Robin', hearts: 7 },
    sellPrice: 300,
    buff: { type: 'luck', value: 2, duration: '7m 41s' }
  },
  {
    id: "super-meal",
    name: "Super Meal",
    ingredients: [
      { name: "Bok Choy", quantity: 1, source: "Farming (Fall)" },
      { name: "Cranberries", quantity: 1, source: "Farming (Fall)" },
      { name: "Artichoke", quantity: 1, source: "Farming (Fall)" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 21' },
    sellPrice: 220,
    buff: { type: 'speed', value: 1, duration: '3m 30s' }
  },
  {
    id: "cranberry-sauce",
    name: "Cranberry Sauce",
    ingredients: [
      { name: "Cranberries", quantity: 1, source: "Farming (Fall)" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "Gus (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Gus', hearts: 7 },
    sellPrice: 120
  },
  {
    id: "stuffing",
    name: "Stuffing",
    ingredients: [
      { name: "Bread", quantity: 1, source: "Cooking", subIngredients: [{ name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }] },
      { name: "Cranberries", quantity: 1, source: "Farming (Fall)" },
      { name: "Hazelnut", quantity: 1, source: "Foraging (Fall)" }
    ],
    source: "Pam (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Pam', hearts: 7 },
    sellPrice: 165
  },
  {
    id: "farmers-lunch",
    name: "Farmer's Lunch",
    ingredients: [
      { name: "Omelet", quantity: 1, source: "Cooking", subIngredients: [{ name: "Egg", quantity: 1, source: "Chicken" }, { name: "Milk", quantity: 1, source: "Cow" }] },
      { name: "Parsnip", quantity: 1, source: "Farming (Spring)" }
    ],
    source: "Farming Level 3",
    recipeSource: { type: 'skill', skillType: 'Farming', skillLevel: 3 },
    sellPrice: 150,
    buff: { type: 'farming', value: 3, duration: '5m 35s' }
  },
  {
    id: "survival-burger",
    name: "Survival Burger",
    ingredients: [
      { name: "Bread", quantity: 1, source: "Cooking", subIngredients: [{ name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }] },
      { name: "Cave Carrot", quantity: 1, source: "Mines" },
      { name: "Eggplant", quantity: 1, source: "Farming (Fall)" }
    ],
    source: "Foraging Level 2",
    recipeSource: { type: 'skill', skillType: 'Foraging', skillLevel: 2 },
    sellPrice: 180,
    buff: { type: 'foraging', value: 3, duration: '5m 35s' }
  },
  {
    id: "dish-o-the-sea",
    name: "Dish O' The Sea",
    ingredients: [
      { name: "Sardine", quantity: 2, source: "Fishing (Spring/Fall/Winter)" },
      { name: "Hashbrowns", quantity: 1, source: "Cooking", subIngredients: [{ name: "Potato", quantity: 1, source: "Farming (Spring)" }, { name: "Oil", quantity: 1, source: "Oil Maker" }] }
    ],
    source: "Fishing Level 3",
    recipeSource: { type: 'skill', skillType: 'Fishing', skillLevel: 3 },
    sellPrice: 220,
    buff: { type: 'fishing', value: 3, duration: '5m 35s' }
  },
  {
    id: "miners-treat",
    name: "Miner's Treat",
    ingredients: [
      { name: "Cave Carrot", quantity: 2, source: "Mines" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "Mining Level 3",
    recipeSource: { type: 'skill', skillType: 'Mining', skillLevel: 3 },
    sellPrice: 200,
    buff: { type: 'mining', value: 3, duration: '5m 35s' }
  },
  {
    id: "roots-platter",
    name: "Roots Platter",
    ingredients: [
      { name: "Cave Carrot", quantity: 1, source: "Mines" },
      { name: "Winter Root", quantity: 1, source: "Foraging (Winter)" }
    ],
    source: "Combat Level 3",
    recipeSource: { type: 'skill', skillType: 'Combat', skillLevel: 3 },
    sellPrice: 100,
    buff: { type: 'attack', value: 3, duration: '5m 35s' }
  },
  {
    id: "triple-shot-espresso",
    name: "Triple Shot Espresso",
    ingredients: [
      { name: "Coffee", quantity: 3, source: "Keg", subIngredients: [{ name: "Coffee Bean", quantity: 5, source: "Farming (Spring/Summer)" }] }
    ],
    source: "The Queen of Sauce (Year 2, Winter 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Winter 21' },
    sellPrice: 450,
    buff: { type: 'speed', value: 1, duration: '4m 12s' }
  },
  {
    id: "seafoam-pudding",
    name: "Seafoam Pudding",
    ingredients: [
      { name: "Flounder", quantity: 1, source: "Fishing (Spring/Summer)" },
      { name: "Midnight Carp", quantity: 1, source: "Fishing (Fall/Winter, Night)" }
    ],
    source: "Fishing Level 9",
    recipeSource: { type: 'skill', skillType: 'Fishing', skillLevel: 9 },
    sellPrice: 300,
    buff: { type: 'fishing', value: 4, duration: '10m' }
  },
  {
    id: "algae-soup",
    name: "Algae Soup",
    ingredients: [
      { name: "Green Algae", quantity: 4, source: "Fishing" }
    ],
    source: "Fishing Level 3",
    recipeSource: { type: 'skill', skillType: 'Fishing', skillLevel: 3 },
    sellPrice: 100
  },
  {
    id: "pale-broth",
    name: "Pale Broth",
    ingredients: [
      { name: "White Algae", quantity: 2, source: "Fishing (Sewers/Mines)" }
    ],
    source: "Fishing Level 3",
    recipeSource: { type: 'skill', skillType: 'Fishing', skillLevel: 3 },
    sellPrice: 150
  },
  {
    id: "plum-pudding",
    name: "Plum Pudding",
    ingredients: [
      { name: "Wild Plum", quantity: 2, source: "Foraging (Fall)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Winter 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Winter 7' },
    sellPrice: 260
  },
  {
    id: "artichoke-dip",
    name: "Artichoke Dip",
    ingredients: [
      { name: "Artichoke", quantity: 1, source: "Farming (Fall)" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "The Queen of Sauce (Year 1, Fall 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Fall 28' },
    sellPrice: 210
  },
  {
    id: "stir-fry",
    name: "Stir Fry",
    ingredients: [
      { name: "Cave Carrot", quantity: 1, source: "Mines" },
      { name: "Common Mushroom", quantity: 1, source: "Foraging (Fall)" },
      { name: "Kale", quantity: 1, source: "Farming (Fall)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "The Queen of Sauce (Year 1, Spring 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Spring 7' },
    sellPrice: 335
  },
  {
    id: "roasted-hazelnuts",
    name: "Roasted Hazelnuts",
    ingredients: [
      { name: "Hazelnut", quantity: 3, source: "Foraging (Fall)" }
    ],
    source: "The Queen of Sauce (Year 2, Summer 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Summer 28' },
    sellPrice: 270
  },
  {
    id: "pumpkin-pie",
    name: "Pumpkin Pie",
    ingredients: [
      { name: "Pumpkin", quantity: 1, source: "Farming (Fall)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Winter 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Winter 21' },
    sellPrice: 385
  },
  {
    id: "radish-salad",
    name: "Radish Salad",
    ingredients: [
      { name: "Radish", quantity: 1, source: "Farming (Summer)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" },
      { name: "Vinegar", quantity: 1, source: "Pierre's Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Spring 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Spring 21' },
    sellPrice: 300
  },
  {
    id: "fruit-salad",
    name: "Fruit Salad",
    ingredients: [
      { name: "Blueberry", quantity: 1, source: "Farming (Summer)" },
      { name: "Melon", quantity: 1, source: "Farming (Summer)" },
      { name: "Apricot", quantity: 1, source: "Fruit Tree" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 7' },
    sellPrice: 450
  },
  {
    id: "blackberry-cobbler",
    name: "Blackberry Cobbler",
    ingredients: [
      { name: "Blackberry", quantity: 2, source: "Foraging (Fall)" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 14' },
    sellPrice: 260
  },
  {
    id: "cranberry-candy",
    name: "Cranberry Candy",
    ingredients: [
      { name: "Cranberries", quantity: 1, source: "Farming (Fall)" },
      { name: "Apple", quantity: 1, source: "Fruit Tree" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 1, Winter 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 1, Winter 28' },
    sellPrice: 175
  },
  {
    id: "bruschetta",
    name: "Bruschetta",
    ingredients: [
      { name: "Bread", quantity: 1, source: "Cooking", subIngredients: [{ name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }] },
      { name: "Oil", quantity: 1, source: "Oil Maker" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "The Queen of Sauce (Year 2, Winter 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Winter 14' },
    sellPrice: 210
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    ingredients: [
      { name: "Red Cabbage", quantity: 1, source: "Farming (Summer)" },
      { name: "Vinegar", quantity: 1, source: "Pierre's Shop" },
      { name: "Mayonnaise", quantity: 1, source: "Mayonnaise Machine" }
    ],
    source: "The Queen of Sauce (Year 2, Spring 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Spring 14' },
    sellPrice: 345
  },
  {
    id: "fiddlehead-risotto",
    name: "Fiddlehead Risotto",
    ingredients: [
      { name: "Fiddlehead Fern", quantity: 1, source: "Foraging (Summer, Secret Woods)" },
      { name: "Oil", quantity: 1, source: "Oil Maker" },
      { name: "Garlic", quantity: 1, source: "Farming (Spring)" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 28' },
    sellPrice: 350
  },
  {
    id: "poppy-seed-muffin",
    name: "Poppyseed Muffin",
    ingredients: [
      { name: "Poppy", quantity: 1, source: "Farming (Summer)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 2, Winter 7)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Winter 7' },
    sellPrice: 250
  },
  {
    id: "chowder",
    name: "Chowder",
    ingredients: [
      { name: "Clam", quantity: 1, source: "Beach Foraging" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "Willy (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Willy', hearts: 3 },
    sellPrice: 135
  },
  {
    id: "fish-stew",
    name: "Fish Stew",
    ingredients: [
      { name: "Crayfish", quantity: 1, source: "Crab Pot" },
      { name: "Mussel", quantity: 1, source: "Beach Foraging" },
      { name: "Periwinkle", quantity: 1, source: "Crab Pot" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Willy (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Willy', hearts: 7 },
    sellPrice: 175,
    buff: { type: 'fishing', value: 3, duration: '16m 47s' }
  },
  {
    id: "escargot",
    name: "Escargot",
    ingredients: [
      { name: "Snail", quantity: 1, source: "Crab Pot" },
      { name: "Garlic", quantity: 1, source: "Farming (Spring)" }
    ],
    source: "Willy (Mail, 5+ Hearts)",
    recipeSource: { type: 'mail', character: 'Willy', hearts: 5 },
    sellPrice: 125,
    buff: { type: 'fishing', value: 2, duration: '16m 47s' }
  },
  {
    id: "lobster-bisque",
    name: "Lobster Bisque",
    ingredients: [
      { name: "Lobster", quantity: 1, source: "Crab Pot" },
      { name: "Milk", quantity: 1, source: "Cow" }
    ],
    source: "The Queen of Sauce (Year 2, Winter 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Winter 14' },
    sellPrice: 205,
    buff: { type: 'fishing', value: 3, duration: '16m 47s' }
  },
  {
    id: "maple-bar",
    name: "Maple Bar",
    ingredients: [
      { name: "Maple Syrup", quantity: 1, source: "Tapper on Maple Tree" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" }
    ],
    source: "The Queen of Sauce (Year 2, Summer 14)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Summer 14' },
    sellPrice: 300,
    buff: { type: 'farming', value: 1, duration: '16m 47s' }
  },
  {
    id: "crab-cakes",
    name: "Crab Cakes",
    ingredients: [
      { name: "Crab", quantity: 1, source: "Crab Pot or Beach (Ginger Island)" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Egg", quantity: 1, source: "Chicken" },
      { name: "Oil", quantity: 1, source: "Oil Maker" }
    ],
    source: "The Queen of Sauce (Year 2, Fall 21)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Fall 21' },
    sellPrice: 275
  },
  {
    id: "shrimp-cocktail",
    name: "Shrimp Cocktail",
    ingredients: [
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" },
      { name: "Shrimp", quantity: 1, source: "Crab Pot" },
      { name: "Wild Horseradish", quantity: 1, source: "Foraging (Spring)" }
    ],
    source: "The Queen of Sauce (Year 2, Winter 28)",
    recipeSource: { type: 'tv', tvDate: 'Year 2, Winter 28' },
    sellPrice: 160
  },
  {
    id: "ginger-ale",
    name: "Ginger Ale",
    ingredients: [
      { name: "Ginger", quantity: 3, source: "Foraging (Ginger Island)" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "Dwarf Shop (Volcano Dungeon, 1000g)",
    recipeSource: { type: 'shop', price: 1000 },
    sellPrice: 200,
    buff: { type: 'luck', value: 1, duration: '5m 35s' }
  },
  {
    id: "banana-pudding",
    name: "Banana Pudding",
    ingredients: [
      { name: "Banana", quantity: 1, source: "Farming (Ginger Island)" },
      { name: "Milk", quantity: 1, source: "Cow" },
      { name: "Sugar", quantity: 1, source: "Mill or Shop" }
    ],
    source: "Island Trader (30 Bone Fragments)",
    recipeSource: { type: 'shop' },
    sellPrice: 260
  },
  {
    id: "mango-sticky-rice",
    name: "Mango Sticky Rice",
    ingredients: [
      { name: "Mango", quantity: 1, source: "Farming (Ginger Island)" },
      { name: "Coconut", quantity: 1, source: "Oasis Shop or Ginger Island" },
      { name: "Rice", quantity: 1, source: "Mill", subIngredients: [{ name: "Unmilled Rice", quantity: 1, source: "Farming (Spring)" }] }
    ],
    source: "Leo (Mail, 7+ Hearts)",
    recipeSource: { type: 'mail', character: 'Leo', hearts: 7 },
    sellPrice: 250
  },
  {
    id: "poi",
    name: "Poi",
    ingredients: [
      { name: "Taro Root", quantity: 4, source: "Farming (Ginger Island)" }
    ],
    source: "Leo (Mail, 3+ Hearts)",
    recipeSource: { type: 'mail', character: 'Leo', hearts: 3 },
    sellPrice: 400
  },
  {
    id: "tropical-curry",
    name: "Tropical Curry",
    ingredients: [
      { name: "Coconut", quantity: 1, source: "Oasis Shop or Ginger Island" },
      { name: "Pineapple", quantity: 1, source: "Farming (Ginger Island)" },
      { name: "Hot Pepper", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Ginger Island Resort (2000g)",
    recipeSource: { type: 'shop', price: 2000 },
    sellPrice: 500,
    buff: { type: 'foraging', value: 4, duration: '5m 35s' }
  },
  {
    id: "squid-ink-ravioli",
    name: "Squid Ink Ravioli",
    ingredients: [
      { name: "Squid Ink", quantity: 1, source: "Squid or Midnight Squid" },
      { name: "Wheat Flour", quantity: 1, source: "Mill or Shop" },
      { name: "Tomato", quantity: 1, source: "Farming (Summer)" }
    ],
    source: "Combat Level 9",
    recipeSource: { type: 'skill', skillType: 'Combat', skillLevel: 9 },
    sellPrice: 150,
    buff: { type: 'mining', value: 1, duration: '4m 39s' }
  },
  {
    id: "moss-soup",
    name: "Moss Soup",
    ingredients: [
      { name: "Moss", quantity: 20, source: "Trees (Foraging)" }
    ],
    source: "Foraging Level 3",
    recipeSource: { type: 'skill', skillType: 'Foraging', skillLevel: 3 },
    sellPrice: 80
  }
];
