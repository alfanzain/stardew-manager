import { ref, watch } from 'vue'

export function useChecklist(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  const checked = ref<Set<string>>(saved ? new Set(JSON.parse(saved)) : new Set())

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
    checked.value = new Set()
  }

  return { checked, toggle, isChecked, progress, clearAll }
}
