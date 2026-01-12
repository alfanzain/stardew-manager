<template>
  <div v-if="selectedItems.length === 0" class="bg-card border border-border rounded-xl p-6">
    <h2 class="font-heading text-lg font-semibold text-foreground mb-2">
      📦 Materials to Gather
    </h2>
    <p class="text-muted-foreground text-sm">
      Check the items you want to craft today to see the materials needed.
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
          Materials to Gather
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
          <div class="flex items-center gap-3 p-3">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-background text-primary">
              <component :is="getSourceIcon(ing.source)" class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium text-foreground text-sm truncate">
                  {{ ing.name }}
                </span>
                <span class="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  ×{{ ing.quantity }}
                </span>
              </div>
              <p class="text-xs text-muted-foreground truncate">
                {{ ing.source }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { craftingItems, CraftingIngredient } from '@/data/crafting'
import { ChevronDown, ChevronRight, Leaf, Pickaxe, Sword, Store, FlaskConical, TreeDeciduous } from 'lucide-vue-next'

interface Props {
  selectedItems: string[]
  quantities?: Record<string, number>
}

interface AggregatedIngredient {
  name: string
  quantity: number
  source: string
}

const props = defineProps<Props>()

const expanded = ref(true)

const getSourceIcon = (source: string) => {
  const s = source.toLowerCase()
  if (s.includes('mining') || s.includes('ore') || s.includes('cavern') || s.includes('stone')) return Pickaxe
  if (s.includes('chop') || s.includes('tree') || s.includes('wood') || s.includes('secret woods') || s.includes('tapper')) return TreeDeciduous
  if (s.includes('monster') || s.includes('slime') || s.includes('bug') || s.includes('bat')) return Sword
  if (s.includes('shop') || s.includes('oasis') || s.includes('trader')) return Store
  if (s.includes('smelt') || s.includes('maker') || s.includes('press') || s.includes('rod')) return FlaskConical
  return Leaf
}

const sortedIngredients = computed(() => {
  const aggregated = new Map<string, AggregatedIngredient>()

  const processIngredient = (ing: CraftingIngredient, multiplier: number) => {
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

  props.selectedItems.forEach(itemId => {
    const item = craftingItems.find(i => i.id === itemId)
    if (item) {
      const quantity = props.quantities?.[itemId] || 1
      item.ingredients.forEach(ing => processIngredient(ing, quantity))
    }
  })

  return Array.from(aggregated.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  )
})
</script>
