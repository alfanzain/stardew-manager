<template>
  <div :class="cn(
    'flex items-center justify-center rounded-lg bg-food-icon',
    sizeClasses[size],
    className
  )">
    <span role="img" :aria-label="name">
      {{ getFoodEmoji(name) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClasses = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-12 h-12 text-2xl',
  lg: 'w-16 h-16 text-3xl'
}

// Simple emoji mapping for food categories
const getFoodEmoji = (name: string): string => {
  const n = name.toLowerCase()
  if (n.includes('egg')) return '🍳'
  if (n.includes('salad')) return '🥗'
  if (n.includes('cheese')) return '🧀'
  if (n.includes('fish') || n.includes('salmon') || n.includes('bass') || n.includes('eel') || n.includes('carp') || n.includes('trout')) return '🐟'
  if (n.includes('soup') || n.includes('broth') || n.includes('chowder') || n.includes('bisque')) return '🍲'
  if (n.includes('cake') || n.includes('tart') || n.includes('pie') || n.includes('cobbler')) return '🍰'
  if (n.includes('cookie') || n.includes('muffin') || n.includes('bar')) return '🍪'
  if (n.includes('bread') || n.includes('bun') || n.includes('pancake') || n.includes('tortilla')) return '🍞'
  if (n.includes('pizza')) return '🍕'
  if (n.includes('spaghetti')) return '🍝'
  if (n.includes('breakfast') || n.includes('omelet')) return '🍳'
  if (n.includes('burger')) return '🍔'
  if (n.includes('coffee') || n.includes('espresso')) return '☕'
  if (n.includes('ice cream')) return '🍨'
  if (n.includes('candy')) return '🍬'
  if (n.includes('pudding')) return '🍮'
  if (n.includes('rice')) return '🍚'
  if (n.includes('sashimi') || n.includes('maki')) return '🍣'
  if (n.includes('taco')) return '🌮'
  if (n.includes('pepper') || n.includes('spicy')) return '🌶️'
  if (n.includes('mushroom')) return '🍄'
  if (n.includes('calamari') || n.includes('squid')) return '🦑'
  if (n.includes('crab') || n.includes('lobster')) return '🦀'
  if (n.includes('escargot') || n.includes('snail')) return '🐌'
  if (n.includes('stir fry') || n.includes('medley') || n.includes('plate')) return '🥘'
  if (n.includes('fruit')) return '🍇'
  if (n.includes('hazelnut') || n.includes('nut')) return '🌰'
  if (n.includes('pumpkin')) return '🎃'
  if (n.includes('algae') || n.includes('seaweed')) return '🌿'
  return '🍽️'
}
</script>
