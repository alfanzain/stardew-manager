<template>
  <div
    v-if="layout === 'list'"
    @click="onToggle"
    :class="cn(
      'group flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all duration-200',
      isChecked
        ? 'bg-success/10 border-success/30'
        : 'bg-card border-border hover:border-primary/30 hover:shadow-soft'
    )"
  >
    <div :class="cn(
      'relative transition-transform duration-200',
      isChecked && 'opacity-60'
    )">
      <FoodIcon :name="food.name" size="sm" />
      <div v-if="isChecked" class="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
        <Check class="w-3 h-3 text-white" />
      </div>
    </div>
    
    <div class="flex-1 min-w-0">
      <h3 :class="cn(
        'font-medium text-sm transition-colors',
        isChecked ? 'text-muted-foreground line-through' : 'text-foreground'
      )">
        {{ food.name }}
      </h3>
      <p class="text-xs text-muted-foreground truncate">
        {{ food.ingredients.map(i => i.name).join(', ') }}
      </p>
    </div>

    <div :class="cn(
      'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
      isChecked 
        ? 'bg-success border-success' 
        : 'border-border group-hover:border-primary/50'
    )">
      <Check v-if="isChecked" class="w-4 h-4 text-white" />
    </div>
  </div>

  <div
    v-else
    @click="onToggle"
    :class="cn(
      'group relative flex flex-col items-center p-4 rounded-xl border cursor-pointer transition-all duration-200',
      isChecked
        ? 'bg-success/10 border-success/30'
        : 'bg-card border-border hover:border-primary/30 hover:shadow-soft hover:-translate-y-0.5'
    )"
  >
    <div :class="cn(
      'absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
      isChecked 
        ? 'bg-success border-success' 
        : 'border-border group-hover:border-primary/50'
    )">
      <Check v-if="isChecked" class="w-4 h-4 text-white" />
    </div>

    <div :class="cn(
      'transition-all duration-200',
      isChecked && 'opacity-60 scale-95'
    )">
      <FoodIcon :name="food.name" size="lg" />
    </div>
    
    <h3 :class="cn(
      'mt-3 font-medium text-sm text-center transition-colors',
      isChecked ? 'text-muted-foreground line-through' : 'text-foreground'
    )">
      {{ food.name }}
    </h3>
    
    <p class="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
      {{ food.ingredients.map(i => i.name).join(', ') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Food } from '@/data/foods'
import FoodIcon from './FoodIcon.vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  food: Food
  isChecked: boolean
  onToggle: () => void
  layout: 'grid' | 'list'
}

defineProps<Props>()
</script>
