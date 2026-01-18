import { ref, watch, computed } from 'vue'

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
  // Explicit counter ref that we update manually to ensure reactivity
  const completedCount = ref(parsedData.length)

  watch(completed, (newCompleted) => {
    localStorage.setItem(storageKey, JSON.stringify([...newCompleted]))
    // Update the counter when Set changes
    completedCount.value = newCompleted.size
  }, { deep: true, immediate: false })

  const toggleCompleted = (id: string) => {
    const next = new Set(completed.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    completed.value = next
    // Explicitly update the counter for immediate reactivity
    completedCount.value = next.size
  }

  const isCompleted = (id: string) => completed.value.has(id)
  
  // Progress function - must be called inside a computed to ensure reactivity
  // It uses completedCount which is a computed, ensuring Vue tracks the dependency
  const progress = (total: number) => {
    // Use completedCount.value to ensure Vue tracks the dependency
    const count = completedCount.value
    return {
      completed: count,
      total,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0
    }
  }

  return { completed, toggleCompleted, isCompleted, progress, completedCount }
}

// Singleton instances to ensure all components share the same reactive state
let cookingInstance: ReturnType<typeof useCompletion> | null = null
let craftingInstance: ReturnType<typeof useCompletion> | null = null

export function useCompletionCooking() {
  if (!cookingInstance) {
    cookingInstance = useCompletion('stardew-completion-cooking')
  }
  return cookingInstance
}

export function useCompletionCrafting() {
  if (!craftingInstance) {
    craftingInstance = useCompletion('stardew-completion-crafting')
  }
  return craftingInstance
}