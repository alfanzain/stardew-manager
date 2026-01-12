<template>
  <div v-if="sortedIngredients.length === 0" class="text-center py-8">
    <div class="text-4xl mb-3">🧺</div>
    <p class="text-muted-foreground text-sm">
      No ingredients needed yet.
    </p>
    <p class="text-xs text-muted-foreground mt-1">
      Select recipes from your checklists to see ingredients here.
    </p>
  </div>

  <div v-else class="space-y-3">
    <!-- Cooking Checklist Ingredients -->
    <div v-if="cookingIngredients.length > 0">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-lg">🍳</span>
        <h3 class="font-medium text-sm text-foreground">Gourmet Chef</h3>
        <span class="text-xs text-muted-foreground">({{ cookingIngredients.length }} items)</span>
      </div>
      <div class="grid gap-2 sm:grid-cols-2">
        <div
          v-for="ing in cookingIngredients"
          :key="ing.name"
          class="flex items-center gap-2 p-2 bg-muted/30 rounded-lg"
        >
          <component :is="getSourceIcon(ing.source)" class="w-4 h-4 text-primary flex-shrink-0" />
          <span class="text-sm text-foreground truncate flex-1">{{ ing.name }}</span>
          <span class="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
            ×{{ ing.quantity }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { foods, Ingredient } from '@/data/foods'
import { useChecklist } from '@/composables/useChecklist'
import { useFoodQuantities } from '@/composables/useFoodQuantities'
import { Leaf, Milk, Fish, Pickaxe, Store, FlaskConical } from 'lucide-vue-next'

interface AggregatedIngredient {
  name: string
  quantity: number
  source: string
}

const { isChecked } = useChecklist('stardew-foods')
const { quantities } = useFoodQuantities('stardew-food-quantities')

const getSourceIcon = (source: string) => {
  const s = source.toLowerCase()
  if (s.includes('farm') || s.includes('forag')) return Leaf
  if (s.includes('cow') || s.includes('chicken') || s.includes('milk') || s.includes('egg')) return Milk
  if (s.includes('fish') || s.includes('crab') || s.includes('ocean')) return Fish
  if (s.includes('mine') || s.includes('cave')) return Pickaxe
  if (s.includes('shop') || s.includes('oasis')) return Store
  if (s.includes('cook') || s.includes('press') || s.includes('maker') || s.includes('mill') || s.includes('keg')) return FlaskConical
  return Leaf
}

const cookingIngredients = computed(() => {
  const aggregated = new Map<string, AggregatedIngredient>()

  const processIngredient = (ing: Ingredient, multiplier: number) => {
    const existing = aggregated.get(ing.name)
    if (existing) {
      existing.quantity += ing.quantity * multiplier
    } else {
      aggregated.set(ing.name, {
        name: ing.name,
        quantity: ing.quantity * multiplier,
        source: ing.source || ''
      })
    }

    // Also aggregate sub-ingredients
    if (ing.subIngredients) {
      ing.subIngredients.forEach(sub => {
        const existingSub = aggregated.get(sub.name)
        if (existingSub) {
          existingSub.quantity += sub.quantity * ing.quantity * multiplier
        } else {
          aggregated.set(sub.name, {
            name: sub.name,
            quantity: sub.quantity * ing.quantity * multiplier,
            source: sub.source || ''
          })
        }
      })
    }
  }

  foods.forEach(food => {
    if (isChecked(food.id)) {
      const quantity = quantities.value[food.id] || 1
      food.ingredients.forEach(ing => processIngredient(ing, quantity))
    }
  })

  return Array.from(aggregated.values()).sort((a, b) => a.name.localeCompare(b.name))
})

const sortedIngredients = computed(() => cookingIngredients.value)
</script>
