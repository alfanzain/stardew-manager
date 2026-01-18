<template>
  <!-- Sticky indicator on left side -->
  <div class="fixed left-0 top-1/2 -translate-y-1/2 z-40">
    <button
      @click="showModal = true"
      class="flex items-center gap-1.5 px-2 py-3 bg-primary text-primary-foreground rounded-r-lg shadow-lg hover:bg-primary/90 transition-all hover:px-3 group"
    >
      <Trophy class="w-4 h-4" />
      <span class="text-sm font-bold">{{ currentAchievement.percentage }}%</span>
    </button>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <div 
      v-if="showModal" 
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click.self="showModal = false"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showModal = false" />
      
      <!-- Modal Content -->
      <div class="relative bg-card border border-border rounded-xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        <!-- Header -->
        <div class="p-4 border-b border-border bg-muted/30">
          <div class="flex items-center justify-between">
            <h3 class="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
              <Trophy class="w-5 h-5 text-primary" />
              Cooking Achievements
            </h3>
            <button 
              @click="showModal = false"
              class="p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <X class="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4 space-y-4">
          <!-- Cook: 10 recipes -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">🍳</span>
                <span class="text-sm font-medium text-foreground">Cook</span>
              </div>
              <span :class="cn(
                'text-xs px-2 py-0.5 rounded-full',
                achievements.cook.completed >= achievements.cook.target 
                  ? 'bg-success/20 text-success' 
                  : 'text-muted-foreground'
              )">
                {{ achievements.cook.completed }}/{{ achievements.cook.target }}
              </span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                :class="cn(
                  'h-full rounded-full transition-all duration-500',
                  achievements.cook.completed >= achievements.cook.target ? 'bg-success' : 'bg-primary'
                )"
                :style="{ width: `${achievements.cook.percentage}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              Cook 10 different recipes
            </p>
          </div>

          <!-- Sous Chef: 25 recipes -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">👨‍🍳</span>
                <span class="text-sm font-medium text-foreground">Sous Chef</span>
              </div>
              <span :class="cn(
                'text-xs px-2 py-0.5 rounded-full',
                achievements.sousChef.completed >= achievements.sousChef.target 
                  ? 'bg-success/20 text-success' 
                  : 'text-muted-foreground'
              )">
                {{ achievements.sousChef.completed }}/{{ achievements.sousChef.target }}
              </span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                :class="cn(
                  'h-full rounded-full transition-all duration-500',
                  achievements.sousChef.completed >= achievements.sousChef.target ? 'bg-success' : 'bg-primary'
                )"
                :style="{ width: `${achievements.sousChef.percentage}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              Cook 25 different recipes
            </p>
          </div>

          <!-- Gourmet Chef: all recipes -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">⭐</span>
                <span class="text-sm font-medium text-foreground">Gourmet Chef</span>
              </div>
              <span :class="cn(
                'text-xs px-2 py-0.5 rounded-full',
                achievements.gourmetChef.completed >= achievements.gourmetChef.target 
                  ? 'bg-success/20 text-success' 
                  : 'text-muted-foreground'
              )">
                {{ achievements.gourmetChef.completed }}/{{ achievements.gourmetChef.target }}
              </span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                :class="cn(
                  'h-full rounded-full transition-all duration-500',
                  achievements.gourmetChef.completed >= achievements.gourmetChef.target ? 'bg-success' : 'bg-primary'
                )"
                :style="{ width: `${achievements.gourmetChef.percentage}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              Cook every recipe ({{ totalRecipes }} total)
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3 border-t border-border bg-muted/20">
          <p class="text-xs text-center text-muted-foreground">
            Mark recipes as completed to track progress
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy, X } from 'lucide-vue-next'
import { useCompletionCooking } from '@/composables/useCompletion'
import { foods } from '@/data/foods'
import { cn } from '@/lib/utils'

const showModal = ref(false)

const { progress: cookingProgressFn } = useCompletionCooking()

const totalRecipes = foods.length
const cookingProgress = computed(() => cookingProgressFn(totalRecipes))

const achievements = computed(() => {
  const completed = cookingProgress.value.completed

  return {
    cook: {
      target: 10,
      completed: Math.min(completed, 10),
      percentage: Math.min((completed / 10) * 100, 100)
    },
    sousChef: {
      target: 25,
      completed: Math.min(completed, 25),
      percentage: Math.min((completed / 25) * 100, 100)
    },
    gourmetChef: {
      target: totalRecipes,
      completed,
      percentage: cookingProgress.value.percentage
    }
  }
})

// Show the current/next achievement progress
const currentAchievement = computed(() => {
  const completed = cookingProgress.value.completed
  if (completed < 10) {
    return { name: 'Cook', percentage: Math.round((completed / 10) * 100) }
  } else if (completed < 25) {
    return { name: 'Sous Chef', percentage: Math.round((completed / 25) * 100) }
  } else {
    return { name: 'Gourmet Chef', percentage: cookingProgress.value.percentage }
  }
})
</script>
