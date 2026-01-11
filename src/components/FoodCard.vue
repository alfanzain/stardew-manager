<template>
  <div
    v-if="layout === 'list'"
    :class="cn(
      'group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
      isChecked
        ? 'bg-primary/5 border-primary/40 shadow-sm'
        : 'bg-card border-border hover:border-primary/30 hover:shadow-soft',
      isCompleted && 'ring-2 ring-success/30 bg-success/5'
    )"
  >
    <div :class="cn(
      'relative transition-transform duration-200 flex-shrink-0',
      isCompleted && 'opacity-70'
    )">
      <FoodIcon :name="food.name" size="sm" />
    </div>
    
    <div class="flex-1 min-w-0">
      <h3 :class="cn(
        'font-semibold text-sm mb-1 transition-colors',
        isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
      )">
        {{ food.name }}
      </h3>
      <p class="text-xs text-muted-foreground truncate mb-2">
        {{ food.ingredients.map(i => i.name).join(', ') }}
      </p>
      
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 bg-muted/50 rounded-lg px-2 py-1">
          <input
            type="number"
            :value="quantity"
            @input="handleQuantityChange"
            @click.stop
            min="1"
            class="w-12 h-6 px-1.5 text-xs font-semibold rounded border-0 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        
        <button
          @click.stop="onToggle"
          :class="cn(
            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm',
            isChecked
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          )"
        >
          <Check v-if="isChecked" class="w-3.5 h-3.5" />
          <ShoppingCart v-else class="w-3.5 h-3.5" />
        </button>

        <button
          @click.stop="onToggleCompleted"
          :class="cn(
            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm',
            isCompleted
              ? 'bg-success text-white hover:bg-success/90 shadow-success/20'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          )"
        >
          <CheckCircle v-if="isCompleted" class="w-3.5 h-3.5" />
          <Circle v-else class="w-3.5 h-3.5" />
          <span>{{ isCompleted ? 'Cooked!' : 'Cooked?' }}</span>
        </button>
      </div>
    </div>
  </div>

  <div
    v-else
    :class="cn(
      'group relative flex flex-col p-4 rounded-xl border transition-all duration-200',
      isChecked
        ? 'bg-primary/5 border-primary/40 shadow-sm'
        : 'bg-card border-border hover:border-primary/30 hover:shadow-soft hover:-translate-y-0.5',
      isCompleted && 'ring-2 ring-success/30 bg-success/5'
    )"
  >
    <!-- Food Icon -->
    <div class="flex justify-center mb-3">
      <div :class="cn(
        'transition-all duration-200',
        isCompleted && 'opacity-70 scale-95'
      )">
        <FoodIcon :name="food.name" size="lg" />
      </div>
    </div>
    
    <!-- Food Name -->
    <h3 :class="cn(
      'font-semibold text-sm text-center mb-1 transition-colors',
      isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'
    )">
      {{ food.name }}
    </h3>
    
    <!-- Ingredients Preview -->
    <p class="text-xs text-muted-foreground text-center mb-3 line-clamp-2 min-h-[2.5rem]">
      {{ food.ingredients.map(i => i.name).join(', ') }}
    </p>

    <!-- Controls -->
    <div class="space-y-2.5">
      <!-- Quantity Input -->
      <div class="flex items-center justify-center gap-1.5 bg-muted/30 rounded-lg px-2.5 py-2">
        <button
          @click.stop="handleDecrement"
          class="w-6 h-6 rounded-md bg-background border border-input hover:bg-muted flex items-center justify-center text-xs font-semibold transition-colors"
        >
          −
        </button>
        <input
          type="number"
          :value="quantity"
          @input="handleQuantityChange"
          @click.stop
          min="1"
          class="w-12 h-7 px-1 text-sm font-semibold text-center rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        />
        <button
          @click.stop="handleIncrement"
          class="w-6 h-6 rounded-md bg-background border border-input hover:bg-muted flex items-center justify-center text-xs font-semibold transition-colors"
        >
          +
        </button>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button
          @click.stop="onToggle"
          :class="cn(
            'flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm',
            isChecked
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          )"
        >
          <Check v-if="isChecked" class="w-3.5 h-3.5" />
          <ShoppingCart v-else class="w-3.5 h-3.5" />
        </button>

        <button
          @click.stop="onToggleCompleted"
          :class="cn(
            'flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm',
            isCompleted
              ? 'bg-success text-white hover:bg-success/90 shadow-success/20'
              : 'bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground'
          )"
        >
          <CheckCircle v-if="isCompleted" class="w-3.5 h-3.5" />
          <Circle v-else class="w-3.5 h-3.5" />
          <span>{{ isCompleted ? 'Cooked!' : 'Cooked?' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Food } from '@/data/foods'
import FoodIcon from './FoodIcon.vue'
import { Check, CheckCircle, Circle, ShoppingCart } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  food: Food
  isChecked: boolean
  isCompleted: boolean
  quantity: number
  onToggle: () => void
  onToggleCompleted: () => void
  onQuantityChange: (quantity: number) => void
  layout: 'grid' | 'list'
}

const props = defineProps<Props>()

const handleQuantityChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = parseInt(target.value, 10)
  if (!isNaN(value) && value > 0) {
    props.onQuantityChange(value)
  } else if (target.value === '') {
    props.onQuantityChange(1)
  }
}

const handleIncrement = () => {
  props.onQuantityChange(props.quantity + 1)
}

const handleDecrement = () => {
  if (props.quantity > 1) {
    props.onQuantityChange(props.quantity - 1)
  }
}
</script>
