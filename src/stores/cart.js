import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalCount = computed(() =>
    items.value.reduce((sum, it) => sum + it.qty, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, it) => sum + it.price * it.qty, 0)
  )

  function addItem(product) {
    const found = items.value.find((it) => it.id === product.id)
    if (found) {
      found.qty += 1
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter((it) => it.id !== productId)
  }

  return { items, totalCount, totalPrice, addItem, removeItem }
})
