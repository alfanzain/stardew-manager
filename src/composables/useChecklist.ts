import { ref, watch, computed } from 'vue'

/* Checklist is the term that refers to the list of items that need to be prepared TODAY.
 * This tracks two states:
 * - "todo": items added to today's list
 * - "done": items marked as done for today (ingredients collected/prepared)
 * 
 * This is separate from "completion" which tracks permanent achievement progress (items cooked/crafted).
 * 
 * Storage format:
 * {
 *   "todo": ["fried-egg", "omelet", "salad"],
 *   "done": ["fried-egg"],
 * }
 */

interface ChecklistData {
  todo: string[]
  done: string[]
}

export function useChecklist(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  let parsedData: ChecklistData = { todo: [], done: [] }
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // Handle migration from old format (array) to new format (object with todo/done)
      if (Array.isArray(parsed)) {
        parsedData = { todo: parsed, done: [] }
      } else if (typeof parsed === 'object' && parsed !== null) {
        parsedData = {
          todo: Array.isArray(parsed.todo) ? parsed.todo : [],
          done: Array.isArray(parsed.done) ? parsed.done : []
        }
      }
    } catch {
      parsedData = { todo: [], done: [] }
    }
  }

  const todo = ref<Set<string>>(new Set(parsedData.todo))
  const done = ref<Set<string>>(new Set(parsedData.done))

  // Persist to localStorage whenever todo or done changes
  const saveToStorage = () => {
    const data: ChecklistData = {
      todo: [...todo.value],
      done: [...done.value]
    }
    localStorage.setItem(storageKey, JSON.stringify(data))
  }

  watch(todo, saveToStorage, { deep: true })
  watch(done, saveToStorage, { deep: true })

  // Toggle an item in the "todo" list (add to today's shopping list)
  const toggleTodo = (id: string) => {
    const next = new Set(todo.value)
    if (next.has(id)) {
      next.delete(id)
      // Also remove from done if removing from todo
      const nextDone = new Set(done.value)
      nextDone.delete(id)
      done.value = nextDone
    } else {
      next.add(id)
    }
    todo.value = next
  }

  // Toggle an item in the "done" list (mark as prepared/done for today)
  const toggleDone = (id: string) => {
    const next = new Set(done.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    done.value = next
  }

  // Check if item is in todo list
  const isInTodo = (id: string) => todo.value.has(id)
  
  // Check if item is marked done for today
  const isDone = (id: string) => done.value.has(id)

  // Get all todo items
  const todoItems = computed(() => [...todo.value])
  
  // Get all done items
  const doneItems = computed(() => [...done.value])

  // Progress for the checklist (todo items)
  const progress = (total: number) => ({
    completed: todo.value.size,
    total,
    percentage: total > 0 ? Math.round((todo.value.size / total) * 100) : 0
  })

  // Clear all items from both todo and done
  const clearAll = () => {
    console.log('Clearing all checklist items for', storageKey)
    todo.value = new Set()
    done.value = new Set()
  }

  // Clear only done states (for New Day reset)
  const clearDoneOnly = () => {
    done.value = new Set()
  }

  return { 
    todo, 
    done,
    toggleTodo, 
    toggleDone,
    isInTodo, 
    isDone,
    todoItems,
    doneItems,
    progress, 
    clearAll,
    clearDoneOnly,
    // Legacy aliases for backward compatibility
    checked: todo,
    toggle: toggleTodo,
    isChecked: isInTodo
  }
}

export function useChecklistCooking() {
  return useChecklist('stardew-checklist-cooking')
}

export function useChecklistCrafting() {
  return useChecklist('stardew-checklist-crafting')
}
