<template>
  <div class="relative">
    <!-- Paper texture background -->
    <div class="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_27px,hsl(var(--border))_28px)] opacity-30 pointer-events-none" />
    
    <textarea
      v-model="notes"
      placeholder="✏️ Write your farm notes here...

• Things to do today
• Items to bring to the mines
• Villagers to visit
• Seeds to buy
• Goals for the week"
      class="w-full min-h-[300px] p-4 bg-transparent text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none font-body text-sm leading-7"
      @input="saveNotes"
    />
    
    <!-- Save indicator -->
    <div 
      v-if="showSaved"
      class="absolute bottom-3 right-3 text-xs text-success flex items-center gap-1 bg-card/90 px-2 py-1 rounded-md"
    >
      <Check class="w-3 h-3" />
      Saved
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Check } from 'lucide-vue-next'

const STORAGE_KEY = 'stardew-farm-notes'

const notes = ref('')
const showSaved = ref(false)

let saveTimeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    notes.value = saved
  }
})

const saveNotes = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  
  saveTimeout = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, notes.value)
    showSaved.value = true
    
    setTimeout(() => {
      showSaved.value = false
    }, 2000)
  }, 500)
}
</script>
