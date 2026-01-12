<template>
  <router-link
    :to="checklist.route"
    class="group block bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-medium transition-all"
  >
    <div class="flex items-start gap-3">
      <div class="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-2xl">
        {{ checklist.icon }}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
          {{ checklist.name }}
        </h3>
        <p class="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {{ checklist.description }}
        </p>
        
        <!-- Progress bar -->
        <div class="mt-3">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="text-muted-foreground">Progress</span>
            <span class="font-medium text-foreground">{{ progressPercentage }}%</span>
          </div>
          <div class="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              class="h-full bg-success rounded-full transition-all duration-300"
              :style="{ width: `${progressPercentage}%` }"
            />
          </div>
          <p class="text-xs text-muted-foreground mt-1">
            {{ displayProgress.completed }}/{{ displayProgress.total }} completed
          </p>
        </div>
      </div>
      <ChevronRight class="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useCompletedFoods } from '@/composables/useCompletedFoods'
import { foods } from '@/data/foods'
import { craftingItems } from '@/data/crafting'

interface Checklist {
  id: string
  name: string
  icon: string
  description: string
  route: string
  progress: { completed: number; total: number }
}

const props = defineProps<{
  checklist: Checklist
}>()

// Get real progress for checklists
const { progress: getCookingProgress } = useCompletedFoods('stardew-completed-foods')
const { progress: getCraftingProgress } = useCompletedFoods('stardew-completed-crafting')

const displayProgress = computed(() => {
  if (props.checklist.id === 'cooking') {
    return getCookingProgress(foods.length)
  }
  if (props.checklist.id === 'crafting') {
    return getCraftingProgress(craftingItems.length)
  }
  return props.checklist.progress
})

const progressPercentage = computed(() => {
  const { completed, total } = displayProgress.value
  return total > 0 ? Math.round((completed / total) * 100) : 0
})
</script>
