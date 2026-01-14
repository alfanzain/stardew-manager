import { ref, watch } from 'vue'

/* Checklist is the term that refers to the list of items that need to be prepared.
 * Checklist items are stored in localStorage as a Set of strings.
 * This is not for achievements. To see the achievement progress, see useCompletion
 * 
 * Checklist format:
 * {
 *   "cooking": {
 *     "todo": ["fried-egg","omelet","salad","cheese-cauliflower"],
 *     "done": ["fried-egg","omelet","salad","cheese-cauliflower"],
 *   },
 *   "crafting": {
 *     "todo": ["bomb","sprinkler","fertilizer","artisan","fence","lighting","path","ring","misc"],
 *     "done": [],
 *   },
 *   "date": 1736832000000, // timestamp in milliseconds
 * }
 */

export function useChecklist(storageKey: string) {
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
  const checked = ref<Set<string>>(new Set(parsedData))

  watch(checked, (newChecked) => {
    localStorage.setItem(storageKey, JSON.stringify([...newChecked]))
  }, { deep: true, immediate: false })

  const toggle = (id: string) => {
    const next = new Set(checked.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    checked.value = next
  }

  const isChecked = (id: string) => checked.value.has(id)
  
  const progress = (total: number) => ({
    completed: checked.value.size,
    total,
    percentage: total > 0 ? Math.round((checked.value.size / total) * 100) : 0
  })

  const clearAll = () => {
    console.log('Clearing all checklist items for', storageKey)
    checked.value = new Set()
  }

  return { checked, toggle, isChecked, progress, clearAll }
}

export function useChecklistCooking() {
  return useChecklist('stardew-checklist-cooking')
}

export function useChecklistCrafting() {
  return useChecklist('stardew-checklist-crafting')
}