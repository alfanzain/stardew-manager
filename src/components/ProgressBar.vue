<template>
  <div 
    class="fixed right-2 sm:right-4 top-20 sm:top-24 z-40 transition-all duration-300 ease-in-out overflow-hidden"
    :class="isExpanded ? 'w-[300px] sm:w-80' : 'w-16 sm:w-20'"
  >
    <div 
      class="bg-card border border-border rounded-xl shadow-lg cursor-pointer transition-all backdrop-blur-sm bg-card/95 group overflow-hidden"
      :class="cn(
        'hover:shadow-xl hover:border-primary/50',
        percentage === 100 && 'ring-2 ring-success/50',
        isExpanded && 'shadow-2xl'
      )"
      @click="toggleExpanded"
      @keydown.enter="toggleExpanded"
      @keydown.space.prevent="toggleExpanded"
      role="button"
      tabindex="0"
      :aria-label="isExpanded ? 'Collapse achievement progress' : 'Expand achievement progress'"
      :aria-expanded="isExpanded"
    >
      <!-- Collapsed View -->
      <div v-if="!isExpanded" class="p-3 space-y-2.5">
        <div class="flex flex-col items-center gap-2">
          <div 
            class="relative transition-transform duration-300 group-hover:scale-110"
            :class="percentage === 100 && 'animate-pulse'"
          >
            <span class="text-2xl block">🏆</span>
            <div 
              v-if="percentage === 100"
              class="absolute inset-0 rounded-full bg-success/20 blur-md -z-10 animate-ping"
            />
          </div>
          <div class="w-full">
            <div class="relative h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                :class="cn(
                  'absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out',
                  percentage === 100 
                    ? 'bg-gradient-to-r from-success via-success-light to-success' 
                    : 'bg-gradient-to-r from-primary to-primary-light'
                )"
                :style="{ width: `${percentage}%` }"
              />
              <div
                v-if="percentage === 100"
                class="absolute inset-0 bg-success/30 rounded-full animate-pulse"
              />
            </div>
          </div>
          <div class="flex flex-col items-center gap-0.5">
            <span class="text-xs font-semibold text-primary text-center leading-tight">
              {{ total - completed }} left
            </span>
            <ChevronLeft 
              class="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </div>
        </div>
      </div>

      <!-- Expanded View -->
      <div v-else class="p-4 space-y-3 w-full">
        <div class="flex items-center justify-between gap-2 w-full">
          <div class="flex items-center gap-2 flex-1 overflow-hidden">
            <div 
              class="relative flex-shrink-0"
              :class="percentage === 100 && 'animate-pulse'"
            >
              <span class="text-xl block">🏆</span>
              <div 
                v-if="percentage === 100"
                class="absolute inset-0 rounded-full bg-success/20 blur-md -z-10 animate-ping"
              />
            </div>
            <span class="font-heading font-semibold text-foreground text-sm whitespace-nowrap">
              Gourmet Chef Progress
            </span>
          </div>
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <span class="text-sm font-semibold text-primary whitespace-nowrap">
              {{ completed }}/{{ total }}
            </span>
            <ChevronRight 
              class="w-4 h-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 flex-shrink-0"
            />
          </div>
        </div>
        
        <div class="relative h-3.5 bg-muted rounded-full overflow-hidden">
          <div
            :class="cn(
              'absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out',
              percentage === 100 
                ? 'bg-gradient-to-r from-success via-success-light to-success' 
                : 'bg-gradient-to-r from-primary to-primary-light'
            )"
            :style="{ width: `${percentage}%` }"
          />
          <div
            v-if="percentage === 100"
            class="absolute inset-0 bg-success/30 rounded-full animate-pulse"
          />
          <!-- Progress percentage text overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span 
              class="text-[10px] font-bold text-foreground/80 drop-shadow-sm"
              :class="percentage > 50 ? 'text-white' : 'text-foreground'"
            >
              {{ percentage }}%
            </span>
          </div>
        </div>
        
        <p 
          class="text-xs text-muted-foreground leading-relaxed"
          :class="percentage === 100 && 'text-success font-medium'"
        >
          {{ percentage === 100 
            ? "🎉 Achievement Unlocked! You're a master chef!" 
            : `${total - completed} recipe${total - completed !== 1 ? 's' : ''} remaining` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  completed: number
  total: number
  percentage: number
}

defineProps<Props>()

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>
