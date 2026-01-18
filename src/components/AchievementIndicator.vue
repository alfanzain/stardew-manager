<template>
  <!-- Sticky indicator on left side -->
  <div class="fixed left-0 top-1/2 -translate-y-1/2 z-40">
    <button
      @click="showModal = true"
      class="flex items-center gap-1.5 px-2 py-3 bg-primary text-primary-foreground rounded-r-lg shadow-lg hover:bg-primary/90 transition-all hover:px-3 group"
    >
      <Trophy class="w-4 h-4" />
      <span class="text-sm font-bold">{{ cookingProgress.percentage }}%</span>
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
              Achievement Progress
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
          <!-- Gourmet Chef -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">🍳</span>
                <span class="text-sm font-medium text-foreground">Gourmet Chef</span>
              </div>
              <span class="text-xs text-muted-foreground">
                {{ cookingProgress.completed }}/{{ cookingProgress.total }}
              </span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary rounded-full transition-all duration-500"
                :style="{ width: `${cookingProgress.percentage}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              Cook all {{ cookingProgress.total }} recipes
            </p>
          </div>

          <!-- Craft Master -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-lg">🔨</span>
                <span class="text-sm font-medium text-foreground">Craft Master</span>
              </div>
              <span class="text-xs text-muted-foreground">
                {{ craftingProgress.completed }}/{{ craftingProgress.total }}
              </span>
            </div>
            <div class="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-accent rounded-full transition-all duration-500"
                :style="{ width: `${craftingProgress.percentage}%` }"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              Craft all {{ craftingProgress.total }} items
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-3 border-t border-border bg-muted/20">
          <p class="text-xs text-center text-muted-foreground">
            Track your progress in the checklists
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy, X } from 'lucide-vue-next'
import { useCompletionCooking, useCompletionCrafting } from '@/composables/useCompletion'
import { foods } from '@/data/foods'
import { craftingItems } from '@/data/crafting'

const showModal = ref(false)

const { progress: cookingProgressFn } = useCompletionCooking()
const { progress: craftingProgressFn } = useCompletionCrafting()

const cookingProgress = computed(() => cookingProgressFn(foods.length))
const craftingProgress = computed(() => craftingProgressFn(craftingItems.length))
</script>
