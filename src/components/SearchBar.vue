<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      type="text"
      placeholder="Search recipes..."
      :model-value="value"
      @update:model-value="onChange"
      class="pl-10 pr-10 bg-card border-border"
    />
    <button
      v-if="value"
      @click="onChange('')"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
    >
      <X class="w-4 h-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'
import Input from '@/components/ui/input.vue'

interface Props {
  value: string
  onChange: (value: string) => void
}

defineProps<Props>()
</script>
