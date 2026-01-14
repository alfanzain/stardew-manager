<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div class="container max-w-5xl py-4">
        <div class="flex items-center gap-3">
          <router-link 
            to="/" 
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft class="w-5 h-5 text-muted-foreground" />
          </router-link>
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
            <span class="text-lg">🔨</span>
          </div>
          <div>
            <h1 class="font-heading text-xl font-bold text-foreground">
              Crafting Checklist
            </h1>
            <p class="text-xs text-muted-foreground">
              Check your materials and recipes to craft
            </p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-5xl py-6 space-y-6">
      <!-- Progress -->
      <ProgressBar :completed="completedProgressData.completed" :total="completedProgressData.total" :percentage="completedProgressData.percentage" />

      <!-- Ingredient Summary -->
      <CraftingIngredientSummary :selected-items="checkedItemIds" :quantities="quantitiesObject" />

      <!-- Controls -->
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex-1 w-full sm:max-w-md">
          <SearchBar :value="search" :on-change="setSearch" />
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted-foreground">
            {{ filteredItems.length }} items
          </span>
          <ViewToggle :layout="layout" :on-change="setLayout" />
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = selectedCategory === cat.id ? null : cat.id"
          :class="cn(
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
            selectedCategory === cat.id 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-card text-muted-foreground border-border hover:border-primary/50'
          )"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>

      <!-- Items List -->
      <div :class="cn(
        layout === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
          : 'flex flex-col gap-2'
      )">
        <CraftingCard
          v-for="item in filteredItems"
          :key="item.id"
          :item="item"
          :is-checked="isInTodo(item.id)"
          :is-completed="isCompleted(item.id)"
          :quantity="getQuantity(item.id)"
          :on-toggle="() => toggleTodo(item.id)"
          :on-toggle-completed="() => toggleCompleted(item.id)"
          :on-quantity-change="(qty) => setQuantity(item.id, qty)"
          :layout="layout"
        />
      </div>

      <div v-if="filteredItems.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">
          No items found matching "{{ search }}"
        </p>
      </div>

      <!-- Footer -->
      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { craftingItems } from '@/data/crafting'
import { useChecklistCrafting } from '@/composables/useChecklist'
import { useCompletionCrafting } from '@/composables/useCompletion'
import { useFoodQuantities } from '@/composables/useFoodQuantities'
import CraftingIngredientSummary from '@/components/CraftingIngredientSummary.vue'
import CraftingCard from '@/components/CraftingCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import SearchBar from '@/components/SearchBar.vue'    
import ViewToggle from '@/components/ViewToggle.vue'
import Footer from '@/components/Footer.vue'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'bomb', name: 'Bombs', icon: '💣' },
  { id: 'sprinkler', name: 'Sprinklers', icon: '💧' },
  { id: 'fertilizer', name: 'Fertilizers', icon: '🌱' },
  { id: 'artisan', name: 'Artisan', icon: '🏭' },
  { id: 'fence', name: 'Fences', icon: '🚧' },
  { id: 'lighting', name: 'Lighting', icon: '💡' },
  { id: 'path', name: 'Paths', icon: '🛤️' },
  { id: 'ring', name: 'Rings', icon: '💍' },
  { id: 'misc', name: 'Misc', icon: '📦' }
]

const search = ref('')
const layout = ref<'grid' | 'list'>('grid')
const selectedCategory = ref<string | null>(null)

const { toggleTodo, isInTodo } = useChecklistCrafting()
const { toggleCompleted, isCompleted, progress: completedProgress } = useCompletionCrafting()
const { setQuantity, getQuantity, quantities } = useFoodQuantities('stardew-crafting-quantities')

const filteredItems = computed(() => {
  let items = craftingItems

  if (selectedCategory.value) {
    items = items.filter(item => item.category === selectedCategory.value)
  }

  if (!search.value.trim()) return items
  
  const searchLower = search.value.toLowerCase()
  return items.filter(item => 
    item.name.toLowerCase().includes(searchLower) ||
    item.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
  )
})

const checkedItemIds = computed(() => 
  craftingItems.filter(i => isInTodo(i.id)).map(i => i.id)
)

const completedProgressData = computed(() => completedProgress(craftingItems.length))

const quantitiesObject = computed(() => quantities.value)

const setSearch = (value: string) => {
  search.value = value
}

const setLayout = (value: 'grid' | 'list') => {
  layout.value = value
}
</script>
