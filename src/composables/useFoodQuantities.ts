import { ref, watch } from 'vue'

export function useFoodQuantities(storageKey: string) {
  const saved = localStorage.getItem(storageKey)
  const quantities = ref<Record<string, number>>(saved ? JSON.parse(saved) : {})

  watch(quantities, (newQuantities) => {
    localStorage.setItem(storageKey, JSON.stringify(newQuantities))
  }, { deep: true, immediate: false })

  const setQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      const next = { ...quantities.value }
      delete next[id]
      quantities.value = next
    } else {
      quantities.value = {
        ...quantities.value,
        [id]: quantity
      }
    }
  }

  const getQuantity = (id: string) => quantities.value[id] || 1

  return { quantities, setQuantity, getQuantity }
}
