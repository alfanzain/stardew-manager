<template>
  <div class="bg-card border border-border rounded-xl p-4">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="text-xl">🏆</span>
        <span class="font-heading font-semibold text-foreground">
          Gourmet Chef Progress
        </span>
      </div>
      <span class="text-sm font-medium text-primary">
        {{ completed }}/{{ total }}
      </span>
    </div>
    
    <div class="relative h-3 bg-muted rounded-full overflow-hidden">
      <div
        :class="cn(
          'absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out',
          percentage === 100 
            ? 'bg-gradient-to-r from-success to-success-light' 
            : 'bg-gradient-to-r from-primary to-primary-light'
        )"
        :style="{ width: `${percentage}%` }"
      />
    </div>
    
    <p class="text-xs text-muted-foreground mt-2">
      {{ percentage === 100 
        ? "🎉 Achievement Unlocked! You're a master chef!" 
        : `${total - completed} recipes remaining` }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  completed: number
  total: number
  percentage: number
}

defineProps<Props>()
</script>
