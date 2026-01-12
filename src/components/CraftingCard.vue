<template>
  <div 
    :class="cn(
      'group bg-card border rounded-xl overflow-hidden transition-all',
      isCompleted 
        ? 'border-success/50 bg-success/5' 
        : isChecked 
          ? 'border-primary/50 bg-primary/5' 
          : 'border-border hover:border-primary/30',
      layout === 'list' && 'flex items-center'
    )"
  >
    <!-- Grid Layout -->
    <template v-if="layout === 'grid'">
      <div class="p-3">
        <!-- Icon and Name -->
        <div class="flex items-start gap-2 mb-2">
          <div 
            :class="cn(
              'flex items-center justify-center w-10 h-10 rounded-lg text-lg flex-shrink-0',
              isCompleted ? 'bg-success/20' : 'bg-muted'
            )"
          >
            {{ getCategoryIcon(item.category) }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 
              :class="cn(
                'font-medium text-sm leading-tight',
                isCompleted ? 'text-success line-through' : 'text-foreground'
              )"
            >
              {{ item.name }}
            </h3>
            <p class="text-xs text-muted-foreground truncate mt-0.5">
              {{ item.unlockCondition }}
            </p>
          </div>
        </div>

        <!-- Ingredients Preview -->
        <div class="text-xs text-muted-foreground mb-3">
          <span v-for="(ing, idx) in item.ingredients.slice(0, 2)" :key="ing.name">
            {{ ing.name }}×{{ ing.quantity }}<span v-if="idx < Math.min(item.ingredients.length, 2) - 1">, </span>
          </span>
          <span v-if="item.ingredients.length > 2">...</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Quantity (when checked) -->
          <div v-if="isChecked" class="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
            <button 
              @click.stop="onQuantityChange(Math.max(1, quantity - 1))"
              class="text-muted-foreground hover:text-foreground"
            >
              <Minus class="w-3 h-3" />
            </button>
            <span class="text-xs font-medium w-4 text-center">{{ quantity }}</span>
            <button 
              @click.stop="onQuantityChange(quantity + 1)"
              class="text-muted-foreground hover:text-foreground"
            >
              <Plus class="w-3 h-3" />
            </button>
          </div>

          <div class="flex-1" />

          <!-- Check for today -->
          <button
            @click="onToggle"
            :class="cn(
              'p-1.5 rounded-lg transition-colors',
              isChecked 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )"
            :title="isChecked ? 'Remove from today' : 'Add to today'"
          >
            <ShoppingCart class="w-4 h-4" />
          </button>

          <!-- Mark completed -->
          <button
            @click="onToggleCompleted"
            :class="cn(
              'p-1.5 rounded-lg transition-colors',
              isCompleted 
                ? 'bg-success text-success-foreground' 
                : 'bg-muted text-muted-foreground hover:text-success'
            )"
            :title="isCompleted ? 'Mark as not crafted' : 'Mark as crafted'"
          >
            <CheckCircle v-if="isCompleted" class="w-4 h-4" />
            <Circle v-else class="w-4 h-4" />
          </button>
        </div>
      </div>
    </template>

    <!-- List Layout -->
    <template v-else>
      <div 
        :class="cn(
          'flex items-center justify-center w-12 h-12 m-2 rounded-lg text-xl flex-shrink-0',
          isCompleted ? 'bg-success/20' : 'bg-muted'
        )"
      >
        {{ getCategoryIcon(item.category) }}
      </div>
      
      <div class="flex-1 py-2 min-w-0">
        <h3 
          :class="cn(
            'font-medium text-sm',
            isCompleted ? 'text-success line-through' : 'text-foreground'
          )"
        >
          {{ item.name }}
        </h3>
        <p class="text-xs text-muted-foreground">
          {{ item.ingredients.map(i => `${i.name}×${i.quantity}`).join(', ') }}
        </p>
      </div>

      <div class="flex items-center gap-2 pr-3">
        <div v-if="isChecked" class="flex items-center gap-1 bg-muted rounded-lg px-2 py-1">
          <button 
            @click.stop="onQuantityChange(Math.max(1, quantity - 1))"
            class="text-muted-foreground hover:text-foreground"
          >
            <Minus class="w-3 h-3" />
          </button>
          <span class="text-xs font-medium w-4 text-center">{{ quantity }}</span>
          <button 
            @click.stop="onQuantityChange(quantity + 1)"
            class="text-muted-foreground hover:text-foreground"
          >
            <Plus class="w-3 h-3" />
          </button>
        </div>

        <button
          @click="onToggle"
          :class="cn(
            'p-1.5 rounded-lg transition-colors',
            isChecked 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          )"
        >
          <ShoppingCart class="w-4 h-4" />
        </button>

        <button
          @click="onToggleCompleted"
          :class="cn(
            'p-1.5 rounded-lg transition-colors',
            isCompleted 
              ? 'bg-success text-success-foreground' 
              : 'bg-muted text-muted-foreground hover:text-success'
          )"
        >
          <CheckCircle v-if="isCompleted" class="w-4 h-4" />
          <Circle v-else class="w-4 h-4" />
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { CraftingItem } from '@/data/crafting'
import { CheckCircle, Circle, ShoppingCart, Minus, Plus } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

defineProps<{
  item: CraftingItem
  isChecked: boolean
  isCompleted: boolean
  quantity: number
  onToggle: () => void
  onToggleCompleted: () => void
  onQuantityChange: (qty: number) => void
  layout: 'grid' | 'list'
}>()

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    bomb: '💣',
    sprinkler: '💧',
    fertilizer: '🌱',
    artisan: '🏭',
    fence: '🚧',
    lighting: '💡',
    path: '🛤️',
    ring: '💍',
    misc: '📦',
    seed: '🌾',
    decor: '🎨',
    equipment: '⚔️'
  }
  return icons[category] || '📦'
}
</script>
