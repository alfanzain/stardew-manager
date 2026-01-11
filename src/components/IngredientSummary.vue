<template>
  <div v-if="selectedFoods.length === 0" class="bg-card border border-border rounded-xl p-6">
    <h2 class="font-heading text-lg font-semibold text-foreground mb-2">
      📦 Ingredients to Prepare
    </h2>
    <p class="text-muted-foreground text-sm">
      Check the recipes you want to cook today to see the ingredients needed.
    </p>
  </div>

  <div v-else class="bg-card border border-border rounded-xl overflow-hidden">
    <button
      @click="expanded = !expanded"
      class="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
    >
      <div class="flex items-center gap-3">
        <span class="text-xl">📦</span>
        <h2 class="font-heading text-lg font-semibold text-foreground">
          Ingredients to Prepare
        </h2>
        <span class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
          {{ sortedIngredients.length }} items
        </span>
      </div>
      <ChevronDown v-if="expanded" class="w-5 h-5 text-muted-foreground" />
      <ChevronRight v-else class="w-5 h-5 text-muted-foreground" />
    </button>

    <div v-if="expanded" class="border-t border-border p-4">
      <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="ing in sortedIngredients"
          :key="ing.name"
          class="bg-muted/30 rounded-lg overflow-hidden"
        >
          <div 
            :class="cn(
              'flex items-center gap-3 p-3',
              hasSubIngredients(ing) && 'cursor-pointer hover:bg-muted/50'
            )"
            @click="hasSubIngredients(ing) && toggleIngredient(ing.name)"
          >
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-background text-primary">
              <component :is="getSourceIcon(ing.source)" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium text-foreground text-sm truncate">
                  {{ ing.name }}
                </span>
                <span class="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  ×{{ ing.quantity }}
                </span>
                <ChevronDown
                  v-if="hasSubIngredients(ing) && expandedIngredients.has(ing.name)"
                  class="w-4 h-4 text-muted-foreground ml-auto"
                />
                <ChevronRight
                  v-else-if="hasSubIngredients(ing)"
                  class="w-4 h-4 text-muted-foreground ml-auto"
                />
              </div>
              <p class="text-xs text-muted-foreground truncate">
                {{ ing.source }}
              </p>
            </div>
          </div>

          <div
            v-if="hasSubIngredients(ing) && expandedIngredients.has(ing.name)"
            class="border-t border-border/50 bg-background/50 px-3 py-2"
          >
            <p class="text-xs text-muted-foreground mb-1">Requires:</p>
            <div
              v-for="sub in ing.subIngredients"
              :key="sub.name"
              class="flex items-center gap-2 text-xs py-1"
            >
              <span class="text-foreground">{{ sub.name }}</span>
              <span class="text-primary">×{{ sub.quantity }}</span>
              <span class="text-muted-foreground">({{ sub.source }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { foods, Ingredient } from '@/data/foods'
import { ChevronDown, ChevronRight, Leaf, Milk, Fish, Pickaxe, Store, FlaskConical } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  selectedFoods: string[]
  quantities?: Record<string, number>
}

interface AggregatedIngredient {
  name: string
  quantity: number
  source: string
  subIngredients?: AggregatedIngredient[]
}

const props = defineProps<Props>()

const expanded = ref(true)
const expandedIngredients = ref<Set<string>>(new Set())

const toggleIngredient = (name: string) => {
  const next = new Set(expandedIngredients.value)
  if (next.has(name)) {
    next.delete(name)
  } else {
    next.add(name)
  }
  expandedIngredients.value = next
}

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

const hasSubIngredients = (ing: AggregatedIngredient) => {
  return ing.subIngredients && ing.subIngredients.length > 0
}

const sortedIngredients = computed(() => {
  // Aggregate all ingredients from selected foods
  const aggregated = new Map<string, AggregatedIngredient>()

  const processIngredient = (ing: Ingredient, multiplier: number) => {
    const existing = aggregated.get(ing.name)
    if (existing) {
      existing.quantity += ing.quantity * multiplier
    } else {
      aggregated.set(ing.name, {
        name: ing.name,
        quantity: ing.quantity * multiplier,
        source: ing.source || '',
        subIngredients: ing.subIngredients?.map(sub => ({
          name: sub.name,
          quantity: sub.quantity,
          source: sub.source || ''
        }))
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

  props.selectedFoods.forEach(foodId => {
    const food = foods.find(f => f.id === foodId)
    if (food) {
      const quantity = props.quantities?.[foodId] || 1
      food.ingredients.forEach(ing => processIngredient(ing, quantity))
    }
  })

  return Array.from(aggregated.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  )
})
</script>
