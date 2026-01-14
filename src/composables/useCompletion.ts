import { ref, watch } from 'vue'

/* Completion is the term that refers to the list of items that have been completed (being cooked, crafted, etc.).
 * Completion items are stored in localStorage as a Set of strings.
 * This is not for achievements. To see the achievement progress, see useCompletion
 * 
 * Completion format:
 * {
 *   "cooking": ["fried-egg","omelet","salad","cheese-cauliflower"],
 *   "crafting": ["bomb","sprinkler","fertilizer","artisan","fence","lighting","path","ring","misc"],
 * }
 */

export function useCompletion(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  let parsedData: string[] = []
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // Ensure parsed data is an array
      parsedData = Array.isArray(parsed) ? parsed : []
    } catch {
      parsedData = []
    }
  }
  const completed = ref<Set<string>>(new Set(parsedData))

  watch(completed, (newCompleted) => {
    localStorage.setItem(storageKey, JSON.stringify([...newCompleted]))
  }, { deep: true, immediate: false })

  const toggleCompleted = (id: string) => {
    const next = new Set(completed.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    completed.value = next
  }

  const isCompleted = (id: string) => completed.value.has(id)
  
  const progress = (total: number) => ({
    completed: completed.value.size,
    total,
    percentage: total > 0 ? Math.round((completed.value.size / total) * 100) : 0
  })

  return { completed, toggleCompleted, isCompleted, progress }
}

export function useCompletionCooking() {
  return useCompletion('stardew-completion-cooking')
}

export function useCompletionCrafting() {
  return useCompletion('stardew-completion-crafting')
}