<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div class="container max-w-5xl py-4">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary">
            <Sprout class="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <h1 class="font-heading text-xl font-bold text-foreground">
              Stardew Manager
            </h1>
            <p class="text-xs text-muted-foreground">
              Helps you manage your Stardew Valley farm.
            </p>
          </div>
        </div>
      </div>
    </header>

    <main class="container max-w-5xl py-6 space-y-6">
      <!-- Progress Sidebar -->
      <ProgressBar :completed="completedProgressData.completed" :total="completedProgressData.total" :percentage="completedProgressData.percentage" />

      <!-- Ingredient Summary -->
      <IngredientSummary :selected-foods="checkedFoodIds" :quantities="quantitiesObject" />

      <!-- Controls -->
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex-1 w-full sm:max-w-md">
          <SearchBar :value="search" :on-change="setSearch" />
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-muted-foreground">
            {{ filteredFoods.length }} recipes
          </span>
          <ViewToggle :layout="layout" :on-change="setLayout" />
        </div>
      </div>

      <!-- Food List -->
      <div :class="cn(
        layout === 'grid' 
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
          : 'flex flex-col gap-2'
      )">
        <FoodCard
          v-for="food in filteredFoods"
          :key="food.id"
          :food="food"
          :is-checked="isChecked(food.id)"
          :is-completed="isCompleted(food.id)"
          :quantity="getQuantity(food.id)"
          :on-toggle="() => toggle(food.id)"
          :on-toggle-completed="() => toggleCompleted(food.id)"
          :on-quantity-change="(qty) => setQuantity(food.id, qty)"
          :layout="layout"
        />
      </div>

      <div v-if="filteredFoods.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">
          No recipes found matching "{{ search }}"
        </p>
      </div>

      <!-- Footer -->
      <footer class="text-center py-8 text-sm text-muted-foreground">
        <p>Made with 💚 for Stardew Valley farmers</p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { foods } from '@/data/foods'
import { useChecklist } from '@/composables/useChecklist'
import { useCompletedFoods } from '@/composables/useCompletedFoods'
import { useFoodQuantities } from '@/composables/useFoodQuantities'
import IngredientSummary from '@/components/IngredientSummary.vue'
import FoodCard from '@/components/FoodCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import ViewToggle from '@/components/ViewToggle.vue'
import { Sprout } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const search = ref('')
const layout = ref<'grid' | 'list'>('grid')
const { toggle, isChecked } = useChecklist('stardew-foods')
const { toggleCompleted, isCompleted, progress: completedProgress } = useCompletedFoods('stardew-completed-foods')
const { setQuantity, getQuantity, quantities } = useFoodQuantities('stardew-food-quantities')

const filteredFoods = computed(() => {
  if (!search.value.trim()) return foods
  const searchLower = search.value.toLowerCase()
  return foods.filter(food => 
    food.name.toLowerCase().includes(searchLower) ||
    food.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
  )
})

const checkedFoodIds = computed(() => 
  foods.filter(f => isChecked(f.id)).map(f => f.id)
)

const completedProgressData = computed(() => completedProgress(foods.length))

const quantitiesObject = computed(() => quantities.value)

const setSearch = (value: string) => {
  search.value = value
}

const setLayout = (value: 'grid' | 'list') => {
  layout.value = value
}
</script>
