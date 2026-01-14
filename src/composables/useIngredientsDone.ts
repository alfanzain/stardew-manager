import { ref, watch } from 'vue'

/**
 * Tracks which ingredients have been gathered/prepared for today.
 * This is separate from recipe completion - ingredients can be marked done
 * without the recipe being cooked/crafted yet.
 * 
 * Storage format: string[] of ingredient names
 */

export function useIngredientsDone(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  let parsedData: string[] = []
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      parsedData = Array.isArray(parsed) ? parsed : []
    } catch {
      parsedData = []
    }
  }

  const done = ref<Set<string>>(new Set(parsedData))

  watch(done, (newDone) => {
    localStorage.setItem(storageKey, JSON.stringify([...newDone]))
  }, { deep: true })

  const toggleDone = (ingredientName: string) => {
    const next = new Set(done.value)
    if (next.has(ingredientName)) {
      next.delete(ingredientName)
    } else {
      next.add(ingredientName)
    }
    done.value = next
  }

  const isDone = (ingredientName: string) => done.value.has(ingredientName)

  const clearAll = () => {
    done.value = new Set()
  }

  return { done, toggleDone, isDone, clearAll }
}

export function useCookingIngredientsDone() {
  return useIngredientsDone('stardew-cooking-ingredients-done')
}

export function useCraftingIngredientsDone() {
  return useIngredientsDone('stardew-crafting-ingredients-done')
}
