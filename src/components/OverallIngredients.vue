<template>
  <div v-if="!hasAnyItems" class="text-center py-8">
    <div class="text-4xl mb-3">🧺</div>
    <p class="text-muted-foreground text-sm">
      No items selected for today.
    </p>
    <p class="text-xs text-muted-foreground mt-1">
      Select recipes from your checklists to see them here.
    </p>
  </div>

  <div v-else class="space-y-6 max-h-[500px] overflow-y-auto">
    <!-- Cooking Section -->
    <div v-if="selectedCookingFoods.length > 0">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-lg">🍳</span>
          <h3 class="font-medium text-sm text-foreground">Cooking</h3>
          <span class="text-xs text-muted-foreground">({{ selectedCookingFoods.length }} recipes)</span>
        </div>
        <button 
          v-if="selectedCookingFoods.length > 0"
          @click="clearAllCooking"
          class="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear All
        </button>
      </div>

      <!-- Food Items -->
      <div class="space-y-2 mb-3">
        <div
          v-for="food in selectedCookingFoods"
          :key="'food-' + food.id"
          :class="cn(
            'flex items-center gap-3 p-2.5 rounded-lg border transition-all',
            isCookingDone(food.id)
              ? 'bg-success/10 border-success/30'
              : 'bg-muted/30 border-border'
          )"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="text-sm">🍽️</span>
            <span :class="cn(
              'text-sm truncate',
              isCookingDone(food.id) ? 'line-through text-muted-foreground' : 'text-foreground'
            )">
              {{ food.name }}
            </span>
            <span class="text-xs text-muted-foreground">×{{ cookingQuantities[food.id] || 1 }}</span>
          </div>
          <button
            @click="toggleCookingDone(food.id)"
            :class="cn(
              'px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1',
              isCookingDone(food.id)
                ? 'bg-success text-white hover:bg-success/90'
                : 'bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground'
            )"
          >
            <CheckCircle v-if="isCookingDone(food.id)" class="w-3 h-3" />
            <Circle v-else class="w-3 h-3" />
            {{ isCookingDone(food.id) ? 'Done' : 'Done?' }}
          </button>
        </div>
      </div>

      <!-- Cooking Ingredients -->
      <div v-if="cookingIngredients.length > 0" class="pl-4 border-l-2 border-primary/20">
        <p class="text-xs text-muted-foreground mb-2">Ingredients needed:</p>
        <div class="grid gap-1.5 sm:grid-cols-2">
          <div
            v-for="ing in cookingIngredients"
            :key="'cooking-ing-' + ing.name"
            :class="cn(
              'flex items-center gap-2 p-1.5 rounded-md text-xs',
              ing.isDone ? 'bg-success/10 text-muted-foreground line-through' : 'bg-muted/20'
            )"
          >
            <component :is="getCookingSourceIcon(ing.source)" class="w-3 h-3 text-primary flex-shrink-0" />
            <span class="truncate flex-1">{{ ing.name }}</span>
            <span class="font-semibold text-primary">×{{ ing.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Crafting Section -->
    <div v-if="selectedCraftingItems.length > 0">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-lg">🔨</span>
          <h3 class="font-medium text-sm text-foreground">Crafting</h3>
          <span class="text-xs text-muted-foreground">({{ selectedCraftingItems.length }} items)</span>
        </div>
        <button 
          v-if="selectedCraftingItems.length > 0"
          @click="clearAllCrafting"
          class="text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          Clear All
        </button>
      </div>

      <!-- Crafting Items -->
      <div class="space-y-2 mb-3">
        <div
          v-for="item in selectedCraftingItems"
          :key="'craft-' + item.id"
          :class="cn(
            'flex items-center gap-3 p-2.5 rounded-lg border transition-all',
            isCraftingDone(item.id)
              ? 'bg-success/10 border-success/30'
              : 'bg-muted/30 border-border'
          )"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <span class="text-sm">⚒️</span>
            <span :class="cn(
              'text-sm truncate',
              isCraftingDone(item.id) ? 'line-through text-muted-foreground' : 'text-foreground'
            )">
              {{ item.name }}
            </span>
            <span class="text-xs text-muted-foreground">×{{ craftingQuantities[item.id] || 1 }}</span>
          </div>
          <button
            @click="toggleCraftingDone(item.id)"
            :class="cn(
              'px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1',
              isCraftingDone(item.id)
                ? 'bg-success text-white hover:bg-success/90'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )"
          >
            <CheckCircle v-if="isCraftingDone(item.id)" class="w-3 h-3" />
            <Circle v-else class="w-3 h-3" />
            {{ isCraftingDone(item.id) ? 'Done' : 'Done?' }}
          </button>
        </div>
      </div>

      <!-- Crafting Ingredients -->
      <div v-if="craftingIngredients.length > 0" class="pl-4 border-l-2 border-accent/20">
        <p class="text-xs text-muted-foreground mb-2">Materials needed:</p>
        <div class="grid gap-1.5 sm:grid-cols-2">
          <div
            v-for="ing in craftingIngredients"
            :key="'crafting-ing-' + ing.name"
            :class="cn(
              'flex items-center gap-2 p-1.5 rounded-md text-xs',
              ing.isDone ? 'bg-success/10 text-muted-foreground line-through' : 'bg-muted/20'
            )"
          >
            <component :is="getCraftingSourceIcon(ing.source)" class="w-3 h-3 text-accent flex-shrink-0" />
            <span class="truncate flex-1">{{ ing.name }}</span>
            <span class="font-semibold text-accent">×{{ ing.quantity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { foods, Ingredient } from '@/data/foods'
import { craftingItems, CraftingIngredient } from '@/data/crafting'
import { useChecklistCooking, useChecklistCrafting } from '@/composables/useChecklist'
import { useFoodQuantities } from '@/composables/useFoodQuantities'
import { Leaf, Milk, Fish, Pickaxe, Store, FlaskConical, TreeDeciduous, Sword, CheckCircle, Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface AggregatedIngredient {
  name: string
  quantity: number
  source: string
  isDone: boolean
}

// Cooking checklist - use isDone for marking items done in the shopping list
const { isInTodo: isCookingInTodo, isDone: isCookingDone, toggleDone: toggleCookingDone, clearAll: clearAllCookingChecks } = useChecklistCooking()
const { quantities: cookingQuantitiesRef } = useFoodQuantities('stardew-food-quantities')

// Crafting checklist - use isDone for marking items done in the shopping list
const { isInTodo: isCraftingInTodo, isDone: isCraftingDone, toggleDone: toggleCraftingDone, clearAll: clearAllCraftingChecks } = useChecklistCrafting()
const { quantities: craftingQuantitiesRef } = useFoodQuantities('stardew-crafting-quantities')

const cookingQuantities = computed(() => cookingQuantitiesRef.value)
const craftingQuantities = computed(() => craftingQuantitiesRef.value)

const getCookingSourceIcon = (source: string) => {
  const s = source.toLowerCase()
  if (s.includes('farm') || s.includes('forag')) return Leaf
  if (s.includes('cow') || s.includes('chicken') || s.includes('milk') || s.includes('egg')) return Milk
  if (s.includes('fish') || s.includes('crab') || s.includes('ocean')) return Fish
  if (s.includes('mine') || s.includes('cave')) return Pickaxe
  if (s.includes('shop') || s.includes('oasis')) return Store
  if (s.includes('cook') || s.includes('press') || s.includes('maker') || s.includes('mill') || s.includes('keg')) return FlaskConical
  return Leaf
}

const getCraftingSourceIcon = (source: string) => {
  const s = source.toLowerCase()
  if (s.includes('mining') || s.includes('ore') || s.includes('cavern') || s.includes('stone')) return Pickaxe
  if (s.includes('chop') || s.includes('tree') || s.includes('wood') || s.includes('secret woods') || s.includes('tapper')) return TreeDeciduous
  if (s.includes('monster') || s.includes('slime') || s.includes('bug') || s.includes('bat')) return Sword
  if (s.includes('shop') || s.includes('oasis') || s.includes('trader')) return Store
  if (s.includes('smelt') || s.includes('maker') || s.includes('press') || s.includes('rod')) return FlaskConical
  return Leaf
}

const selectedCookingFoods = computed(() => 
  foods.filter(f => isCookingInTodo(f.id))
)

const selectedCraftingItems = computed(() => 
  craftingItems.filter(i => isCraftingInTodo(i.id))
)

const cookingIngredients = computed(() => {
  const aggregated = new Map<string, AggregatedIngredient>()

  const processIngredient = (ing: Ingredient, multiplier: number, foodId: string) => {
    const isDone = isCookingDone(foodId)
    const existing = aggregated.get(ing.name)
    if (existing) {
      existing.quantity += ing.quantity * multiplier
      if (!isDone) existing.isDone = false
    } else {
      aggregated.set(ing.name, {
        name: ing.name,
        quantity: ing.quantity * multiplier,
        source: ing.source || '',
        isDone
      })
    }

    if (ing.subIngredients) {
      ing.subIngredients.forEach(sub => {
        const existingSub = aggregated.get(sub.name)
        if (existingSub) {
          existingSub.quantity += sub.quantity * ing.quantity * multiplier
          if (!isDone) existingSub.isDone = false
        } else {
          aggregated.set(sub.name, {
            name: sub.name,
            quantity: sub.quantity * ing.quantity * multiplier,
            source: sub.source || '',
            isDone
          })
        }
      })
    }
  }

  foods.forEach(food => {
    if (isCookingInTodo(food.id)) {
      const quantity = cookingQuantities.value[food.id] || 1
      food.ingredients.forEach(ing => processIngredient(ing, quantity, food.id))
    }
  })

  return Array.from(aggregated.values()).sort((a, b) => {
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1
    return a.name.localeCompare(b.name)
  })
})

const craftingIngredients = computed(() => {
  const aggregated = new Map<string, AggregatedIngredient>()

  const processIngredient = (ing: CraftingIngredient, multiplier: number, itemId: string) => {
    const isDone = isCraftingDone(itemId)
    const existing = aggregated.get(ing.name)
    if (existing) {
      existing.quantity += ing.quantity * multiplier
      if (!isDone) existing.isDone = false
    } else {
      aggregated.set(ing.name, {
        name: ing.name,
        quantity: ing.quantity * multiplier,
        source: ing.source || '',
        isDone
      })
    }

    if (ing.subIngredients) {
      ing.subIngredients.forEach(sub => {
        const existingSub = aggregated.get(sub.name)
        if (existingSub) {
          existingSub.quantity += sub.quantity * ing.quantity * multiplier
          if (!isDone) existingSub.isDone = false
        } else {
          aggregated.set(sub.name, {
            name: sub.name,
            quantity: sub.quantity * ing.quantity * multiplier,
            source: sub.source || '',
            isDone
          })
        }
      })
    }
  }

  craftingItems.forEach(item => {
    if (isCraftingInTodo(item.id)) {
      const quantity = craftingQuantities.value[item.id] || 1
      item.ingredients.forEach(ing => processIngredient(ing, quantity, item.id))
    }
  })

  return Array.from(aggregated.values()).sort((a, b) => {
    if (a.isDone !== b.isDone) return a.isDone ? 1 : -1
    return a.name.localeCompare(b.name)
  })
})

const hasAnyItems = computed(() => 
  selectedCookingFoods.value.length > 0 || selectedCraftingItems.value.length > 0
)

const clearAllCooking = () => {
  clearAllCookingChecks()
}

const clearAllCrafting = () => {
  clearAllCraftingChecks()
}
</script>
