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
            <span class="text-lg">🍳</span>
          </div>
          <div>
            <h1 class="font-heading text-xl font-bold text-foreground">
              Cooking Checklist
            </h1>
            <p class="text-xs text-muted-foreground">
              Check your ingredients and recipes to cook
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

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in buffCategories"
          :key="cat.id"
          @click="selectedBuff = selectedBuff === cat.id ? null : cat.id"
          :class="cn(
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-colors',
            selectedBuff === cat.id 
              ? 'bg-primary text-primary-foreground border-primary' 
              : 'bg-card text-muted-foreground border-border hover:border-primary/50'
          )"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>

      <!-- Toggle Options -->
      <div class="flex flex-wrap gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            v-model="showBuffInfo" 
            class="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <span class="text-sm text-foreground">Show Buff Info</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            v-model="showRecipeSource" 
            class="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <span class="text-sm text-foreground">Show Recipe Source</span>
        </label>
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
          :is-checked="isInTodo(food.id)"
          :is-completed="isCompleted(food.id)"
          :quantity="getQuantity(food.id)"
          :on-toggle="() => toggleTodo(food.id)"
          :on-toggle-completed="() => toggleCompleted(food.id)"
          :on-quantity-change="(qty) => setQuantity(food.id, qty)"
          :layout="layout"
          :show-buff-info="showBuffInfo"
          :show-recipe-source="showRecipeSource"
        />
      </div>

      <div v-if="filteredFoods.length === 0" class="text-center py-12">
        <p class="text-muted-foreground">
          No recipes found matching "{{ search }}"
        </p>
      </div>

      <!-- Footer -->
      <Footer />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { foods, buffCategories } from '@/data/foods'
import { useChecklistCooking } from '@/composables/useChecklist'
import { useCompletionCooking } from '@/composables/useCompletion'
import { useFoodQuantities } from '@/composables/useFoodQuantities'
import IngredientSummary from '@/components/IngredientSummary.vue'
import FoodCard from '@/components/FoodCard.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import ViewToggle from '@/components/ViewToggle.vue'
import Footer from '@/components/Footer.vue'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const search = ref('')
const layout = ref<'grid' | 'list'>('grid')
const selectedBuff = ref<string | null>(null)
const showBuffInfo = ref(false)
const showRecipeSource = ref(false)

const { toggleTodo, isInTodo } = useChecklistCooking()
const { toggleCompleted, isCompleted, progress: completedProgress } = useCompletionCooking()
const { setQuantity, getQuantity, quantities } = useFoodQuantities('stardew-food-quantities')

const filteredFoods = computed(() => {
  let result = foods

  // Filter by buff category
  if (selectedBuff.value) {
    if (selectedBuff.value === 'none') {
      result = result.filter(food => !food.buff)
    } else {
      result = result.filter(food => food.buff?.type === selectedBuff.value)
    }
  }

  // Filter by search
  if (search.value.trim()) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(food => 
      food.name.toLowerCase().includes(searchLower) ||
      food.ingredients.some(i => i.name.toLowerCase().includes(searchLower))
    )
  }

  return result
})

const checkedFoodIds = computed(() => 
  foods.filter(f => isInTodo(f.id)).map(f => f.id)
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
