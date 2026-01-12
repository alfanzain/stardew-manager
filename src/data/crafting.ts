export interface CraftingIngredient {
  name: string;
  quantity: number;
  source?: string;
  subIngredients?: CraftingIngredient[];
}

export interface CraftingItem {
  id: string;
  name: string;
  ingredients: CraftingIngredient[];
  unlockCondition: string;
  category: 'equipment' | 'bomb' | 'fertilizer' | 'seed' | 'decor' | 'lighting' | 'artisan' | 'ring' | 'path' | 'fence' | 'sprinkler' | 'misc';
}

export const craftingItems: CraftingItem[] = [
  // Equipment
  {
    id: "cherry-bomb",
    name: "Cherry Bomb",
    ingredients: [
      { name: "Copper Ore", quantity: 4, source: "Mining" },
      { name: "Coal", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Mining Level 1",
    category: "bomb"
  },
  {
    id: "bomb",
    name: "Bomb",
    ingredients: [
      { name: "Iron Ore", quantity: 4, source: "Mining" },
      { name: "Coal", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Mining Level 6",
    category: "bomb"
  },
  {
    id: "mega-bomb",
    name: "Mega Bomb",
    ingredients: [
      { name: "Gold Ore", quantity: 4, source: "Mining" },
      { name: "Solar Essence", quantity: 1, source: "Monsters" },
      { name: "Void Essence", quantity: 1, source: "Monsters" }
    ],
    unlockCondition: "Mining Level 8",
    category: "bomb"
  },
  // Sprinklers
  {
    id: "sprinkler",
    name: "Sprinkler",
    ingredients: [
      { name: "Copper Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 2",
    category: "sprinkler"
  },
  {
    id: "quality-sprinkler",
    name: "Quality Sprinkler",
    ingredients: [
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Gold Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] },
      { name: "Refined Quartz", quantity: 1, source: "Smelting", subIngredients: [{ name: "Quartz", quantity: 1, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 6",
    category: "sprinkler"
  },
  {
    id: "iridium-sprinkler",
    name: "Iridium Sprinkler",
    ingredients: [
      { name: "Gold Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] },
      { name: "Iridium Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iridium Ore", quantity: 5, source: "Skull Cavern" }] },
      { name: "Battery Pack", quantity: 1, source: "Lightning Rod" }
    ],
    unlockCondition: "Farming Level 9",
    category: "sprinkler"
  },
  // Fertilizers
  {
    id: "basic-fertilizer",
    name: "Basic Fertilizer",
    ingredients: [
      { name: "Sap", quantity: 2, source: "Chopping Trees" }
    ],
    unlockCondition: "Farming Level 1",
    category: "fertilizer"
  },
  {
    id: "quality-fertilizer",
    name: "Quality Fertilizer",
    ingredients: [
      { name: "Sap", quantity: 2, source: "Chopping Trees" },
      { name: "Any Fish", quantity: 1, source: "Fishing" }
    ],
    unlockCondition: "Farming Level 9",
    category: "fertilizer"
  },
  {
    id: "deluxe-fertilizer",
    name: "Deluxe Fertilizer",
    ingredients: [
      { name: "Iridium Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iridium Ore", quantity: 5, source: "Skull Cavern" }] },
      { name: "Sap", quantity: 40, source: "Chopping Trees" }
    ],
    unlockCondition: "Mr. Qi's Walnut Room",
    category: "fertilizer"
  },
  {
    id: "speed-gro",
    name: "Speed-Gro",
    ingredients: [
      { name: "Pine Tar", quantity: 1, source: "Tapper on Pine Tree" },
      { name: "Clam", quantity: 1, source: "Beach Foraging" }
    ],
    unlockCondition: "Farming Level 3",
    category: "fertilizer"
  },
  {
    id: "deluxe-speed-gro",
    name: "Deluxe Speed-Gro",
    ingredients: [
      { name: "Oak Resin", quantity: 1, source: "Tapper on Oak Tree" },
      { name: "Coral", quantity: 1, source: "Beach Foraging" }
    ],
    unlockCondition: "Farming Level 8",
    category: "fertilizer"
  },
  // Artisan Equipment
  {
    id: "bee-house",
    name: "Bee House",
    ingredients: [
      { name: "Wood", quantity: 40, source: "Chopping Trees" },
      { name: "Coal", quantity: 8, source: "Mining" },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Maple Syrup", quantity: 1, source: "Tapper on Maple Tree" }
    ],
    unlockCondition: "Farming Level 3",
    category: "artisan"
  },
  {
    id: "keg",
    name: "Keg",
    ingredients: [
      { name: "Wood", quantity: 30, source: "Chopping Trees" },
      { name: "Copper Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Oak Resin", quantity: 1, source: "Tapper on Oak Tree" }
    ],
    unlockCondition: "Farming Level 8",
    category: "artisan"
  },
  {
    id: "preserves-jar",
    name: "Preserves Jar",
    ingredients: [
      { name: "Wood", quantity: 50, source: "Chopping Trees" },
      { name: "Stone", quantity: 40, source: "Mining" },
      { name: "Coal", quantity: 8, source: "Mining" }
    ],
    unlockCondition: "Farming Level 4",
    category: "artisan"
  },
  {
    id: "cheese-press",
    name: "Cheese Press",
    ingredients: [
      { name: "Wood", quantity: 45, source: "Chopping Trees" },
      { name: "Stone", quantity: 45, source: "Mining" },
      { name: "Hardwood", quantity: 10, source: "Secret Woods" },
      { name: "Copper Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 6",
    category: "artisan"
  },
  {
    id: "mayonnaise-machine",
    name: "Mayonnaise Machine",
    ingredients: [
      { name: "Wood", quantity: 15, source: "Chopping Trees" },
      { name: "Stone", quantity: 15, source: "Mining" },
      { name: "Earth Crystal", quantity: 1, source: "Mining (Floors 1-39)" },
      { name: "Copper Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 2",
    category: "artisan"
  },
  {
    id: "loom",
    name: "Loom",
    ingredients: [
      { name: "Wood", quantity: 60, source: "Chopping Trees" },
      { name: "Fiber", quantity: 30, source: "Cutting Weeds" },
      { name: "Pine Tar", quantity: 1, source: "Tapper on Pine Tree" }
    ],
    unlockCondition: "Farming Level 7",
    category: "artisan"
  },
  {
    id: "oil-maker",
    name: "Oil Maker",
    ingredients: [
      { name: "Slime", quantity: 50, source: "Slimes" },
      { name: "Hardwood", quantity: 20, source: "Secret Woods" },
      { name: "Gold Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 8",
    category: "artisan"
  },
  {
    id: "recycling-machine",
    name: "Recycling Machine",
    ingredients: [
      { name: "Wood", quantity: 25, source: "Chopping Trees" },
      { name: "Stone", quantity: 25, source: "Mining" },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Fishing Level 4",
    category: "artisan"
  },
  {
    id: "seed-maker",
    name: "Seed Maker",
    ingredients: [
      { name: "Wood", quantity: 25, source: "Chopping Trees" },
      { name: "Coal", quantity: 10, source: "Mining" },
      { name: "Gold Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 9",
    category: "artisan"
  },
  // Fences
  {
    id: "gate",
    name: "Gate",
    ingredients: [
      { name: "Wood", quantity: 10, source: "Chopping Trees" }
    ],
    unlockCondition: "Starter",
    category: "fence"
  },
  {
    id: "wood-fence",
    name: "Wood Fence",
    ingredients: [
      { name: "Wood", quantity: 2, source: "Chopping Trees" }
    ],
    unlockCondition: "Starter",
    category: "fence"
  },
  {
    id: "stone-fence",
    name: "Stone Fence",
    ingredients: [
      { name: "Stone", quantity: 2, source: "Mining" }
    ],
    unlockCondition: "Farming Level 2",
    category: "fence"
  },
  {
    id: "iron-fence",
    name: "Iron Fence",
    ingredients: [
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Farming Level 4",
    category: "fence"
  },
  {
    id: "hardwood-fence",
    name: "Hardwood Fence",
    ingredients: [
      { name: "Hardwood", quantity: 1, source: "Secret Woods" }
    ],
    unlockCondition: "Farming Level 6",
    category: "fence"
  },
  // Lighting
  {
    id: "torch",
    name: "Torch",
    ingredients: [
      { name: "Wood", quantity: 1, source: "Chopping Trees" },
      { name: "Sap", quantity: 2, source: "Chopping Trees" }
    ],
    unlockCondition: "Starter",
    category: "lighting"
  },
  {
    id: "campfire",
    name: "Campfire",
    ingredients: [
      { name: "Stone", quantity: 10, source: "Mining" },
      { name: "Wood", quantity: 10, source: "Chopping Trees" },
      { name: "Fiber", quantity: 10, source: "Cutting Weeds" }
    ],
    unlockCondition: "Starter",
    category: "lighting"
  },
  {
    id: "wooden-brazier",
    name: "Wooden Brazier",
    ingredients: [
      { name: "Wood", quantity: 10, source: "Chopping Trees" },
      { name: "Coal", quantity: 1, source: "Mining" },
      { name: "Fiber", quantity: 5, source: "Cutting Weeds" }
    ],
    unlockCondition: "Starter",
    category: "lighting"
  },
  {
    id: "stone-brazier",
    name: "Stone Brazier",
    ingredients: [
      { name: "Stone", quantity: 10, source: "Mining" },
      { name: "Coal", quantity: 1, source: "Mining" },
      { name: "Fiber", quantity: 5, source: "Cutting Weeds" }
    ],
    unlockCondition: "Starter",
    category: "lighting"
  },
  {
    id: "jack-o-lantern",
    name: "Jack-O-Lantern",
    ingredients: [
      { name: "Pumpkin", quantity: 1, source: "Farming (Fall)" },
      { name: "Torch", quantity: 1, source: "Crafting" }
    ],
    unlockCondition: "Spirit's Eve Festival",
    category: "lighting"
  },
  // Paths
  {
    id: "wood-path",
    name: "Wood Path",
    ingredients: [
      { name: "Wood", quantity: 1, source: "Chopping Trees" }
    ],
    unlockCondition: "Starter",
    category: "path"
  },
  {
    id: "gravel-path",
    name: "Gravel Path",
    ingredients: [
      { name: "Stone", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Starter",
    category: "path"
  },
  {
    id: "cobblestone-path",
    name: "Cobblestone Path",
    ingredients: [
      { name: "Stone", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Starter",
    category: "path"
  },
  {
    id: "stepping-stone-path",
    name: "Stepping Stone Path",
    ingredients: [
      { name: "Stone", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Starter",
    category: "path"
  },
  {
    id: "crystal-path",
    name: "Crystal Path",
    ingredients: [
      { name: "Refined Quartz", quantity: 1, source: "Smelting", subIngredients: [{ name: "Quartz", quantity: 1, source: "Mining" }] }
    ],
    unlockCondition: "Starter",
    category: "path"
  },
  // Rings
  {
    id: "sturdy-ring",
    name: "Sturdy Ring",
    ingredients: [
      { name: "Copper Bar", quantity: 2, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] },
      { name: "Bug Meat", quantity: 25, source: "Bugs in Mines" },
      { name: "Slime", quantity: 25, source: "Slimes" }
    ],
    unlockCondition: "Combat Level 1",
    category: "ring"
  },
  {
    id: "warriors-ring",
    name: "Warrior's Ring",
    ingredients: [
      { name: "Iron Bar", quantity: 10, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Coal", quantity: 25, source: "Mining" },
      { name: "Frozen Tear", quantity: 10, source: "Mining (Floors 40-79)" }
    ],
    unlockCondition: "Combat Level 4",
    category: "ring"
  },
  {
    id: "ring-of-yoba",
    name: "Ring of Yoba",
    ingredients: [
      { name: "Gold Bar", quantity: 5, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] },
      { name: "Iron Bar", quantity: 5, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Diamond", quantity: 1, source: "Mining" }
    ],
    unlockCondition: "Combat Level 7",
    category: "ring"
  },
  // Misc
  {
    id: "chest",
    name: "Chest",
    ingredients: [
      { name: "Wood", quantity: 50, source: "Chopping Trees" }
    ],
    unlockCondition: "Starter",
    category: "misc"
  },
  {
    id: "scarecrow",
    name: "Scarecrow",
    ingredients: [
      { name: "Wood", quantity: 50, source: "Chopping Trees" },
      { name: "Coal", quantity: 1, source: "Mining" },
      { name: "Fiber", quantity: 20, source: "Cutting Weeds" }
    ],
    unlockCondition: "Farming Level 1",
    category: "misc"
  },
  {
    id: "deluxe-scarecrow",
    name: "Deluxe Scarecrow",
    ingredients: [
      { name: "Wood", quantity: 50, source: "Chopping Trees" },
      { name: "Fiber", quantity: 40, source: "Cutting Weeds" },
      { name: "Iridium Ore", quantity: 1, source: "Skull Cavern" }
    ],
    unlockCondition: "Collect all Rarecrows",
    category: "misc"
  },
  {
    id: "furnace",
    name: "Furnace",
    ingredients: [
      { name: "Copper Ore", quantity: 20, source: "Mining" },
      { name: "Stone", quantity: 25, source: "Mining" }
    ],
    unlockCondition: "Clint Event",
    category: "misc"
  },
  {
    id: "charcoal-kiln",
    name: "Charcoal Kiln",
    ingredients: [
      { name: "Wood", quantity: 20, source: "Chopping Trees" },
      { name: "Copper Bar", quantity: 2, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Foraging Level 4",
    category: "misc"
  },
  {
    id: "lightning-rod",
    name: "Lightning Rod",
    ingredients: [
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Refined Quartz", quantity: 1, source: "Smelting", subIngredients: [{ name: "Quartz", quantity: 1, source: "Mining" }] },
      { name: "Bat Wing", quantity: 5, source: "Bats in Mines" }
    ],
    unlockCondition: "Foraging Level 6",
    category: "misc"
  },
  {
    id: "crystalarium",
    name: "Crystalarium",
    ingredients: [
      { name: "Stone", quantity: 99, source: "Mining" },
      { name: "Gold Bar", quantity: 5, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] },
      { name: "Iridium Bar", quantity: 2, source: "Smelting", subIngredients: [{ name: "Iridium Ore", quantity: 5, source: "Skull Cavern" }] },
      { name: "Battery Pack", quantity: 1, source: "Lightning Rod" }
    ],
    unlockCondition: "Mining Level 9",
    category: "misc"
  },
  {
    id: "worm-bin",
    name: "Worm Bin",
    ingredients: [
      { name: "Hardwood", quantity: 25, source: "Secret Woods" },
      { name: "Gold Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Gold Ore", quantity: 5, source: "Mining" }] },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Fiber", quantity: 50, source: "Cutting Weeds" }
    ],
    unlockCondition: "Fishing Level 8",
    category: "misc"
  },
  {
    id: "tapper",
    name: "Tapper",
    ingredients: [
      { name: "Wood", quantity: 40, source: "Chopping Trees" },
      { name: "Copper Bar", quantity: 2, source: "Smelting", subIngredients: [{ name: "Copper Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Foraging Level 3",
    category: "misc"
  },
  {
    id: "heavy-tapper",
    name: "Heavy Tapper",
    ingredients: [
      { name: "Hardwood", quantity: 30, source: "Secret Woods" },
      { name: "Radioactive Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Radioactive Ore", quantity: 5, source: "Mines (Dangerous)" }] }
    ],
    unlockCondition: "Mr. Qi's Walnut Room",
    category: "misc"
  },
  {
    id: "crab-pot",
    name: "Crab Pot",
    ingredients: [
      { name: "Wood", quantity: 40, source: "Chopping Trees" },
      { name: "Iron Bar", quantity: 3, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] }
    ],
    unlockCondition: "Fishing Level 3",
    category: "misc"
  },
  {
    id: "garden-pot",
    name: "Garden Pot",
    ingredients: [
      { name: "Clay", quantity: 1, source: "Digging" },
      { name: "Stone", quantity: 10, source: "Mining" },
      { name: "Refined Quartz", quantity: 1, source: "Smelting", subIngredients: [{ name: "Quartz", quantity: 1, source: "Mining" }] }
    ],
    unlockCondition: "Greenhouse Completion",
    category: "misc"
  },
  {
    id: "rain-totem",
    name: "Rain Totem",
    ingredients: [
      { name: "Hardwood", quantity: 1, source: "Secret Woods" },
      { name: "Truffle Oil", quantity: 1, source: "Oil Maker", subIngredients: [{ name: "Truffle", quantity: 1, source: "Pig" }] },
      { name: "Pine Tar", quantity: 5, source: "Tapper on Pine Tree" }
    ],
    unlockCondition: "Foraging Level 9",
    category: "misc"
  },
  {
    id: "warp-totem-farm",
    name: "Warp Totem: Farm",
    ingredients: [
      { name: "Hardwood", quantity: 1, source: "Secret Woods" },
      { name: "Honey", quantity: 1, source: "Bee House" },
      { name: "Fiber", quantity: 20, source: "Cutting Weeds" }
    ],
    unlockCondition: "Foraging Level 8",
    category: "misc"
  },
  {
    id: "warp-totem-mountains",
    name: "Warp Totem: Mountains",
    ingredients: [
      { name: "Hardwood", quantity: 1, source: "Secret Woods" },
      { name: "Iron Bar", quantity: 1, source: "Smelting", subIngredients: [{ name: "Iron Ore", quantity: 5, source: "Mining" }] },
      { name: "Stone", quantity: 25, source: "Mining" }
    ],
    unlockCondition: "Foraging Level 7",
    category: "misc"
  },
  {
    id: "warp-totem-beach",
    name: "Warp Totem: Beach",
    ingredients: [
      { name: "Hardwood", quantity: 1, source: "Secret Woods" },
      { name: "Coral", quantity: 2, source: "Beach Foraging" },
      { name: "Fiber", quantity: 10, source: "Cutting Weeds" }
    ],
    unlockCondition: "Foraging Level 6",
    category: "misc"
  },
  {
    id: "warp-totem-desert",
    name: "Warp Totem: Desert",
    ingredients: [
      { name: "Hardwood", quantity: 2, source: "Secret Woods" },
      { name: "Coconut", quantity: 1, source: "Oasis Shop" },
      { name: "Iridium Ore", quantity: 4, source: "Skull Cavern" }
    ],
    unlockCondition: "Desert Trader",
    category: "misc"
  }
];
