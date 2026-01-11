import { ref, watch } from 'vue'

export function useCompletedFoods(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  const completed = ref<Set<string>>(saved ? new Set(JSON.parse(saved)) : new Set())

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
