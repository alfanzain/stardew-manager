<template>
  <div class="inline-flex rounded-lg border border-border bg-card p-1">
    <button
      @click="onChange('grid')"
      :class="cn(
        'flex items-center justify-center w-9 h-9 rounded-md transition-all',
        layout === 'grid'
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )"
      aria-label="Grid view"
    >
      <Grid3X3 class="w-4 h-4" />
    </button>
    <button
      @click="onChange('list')"
      :class="cn(
        'flex items-center justify-center w-9 h-9 rounded-md transition-all',
        layout === 'list'
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )"
      aria-label="List view"
    >
      <List class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Grid3X3, List } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface Props {
  layout: 'grid' | 'list'
  onChange: (layout: 'grid' | 'list') => void
}

defineProps<Props>()
</script>
