<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../api/productApi'
import { useCartStore } from '../stores/cart'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const cart = useCartStore()

onMounted(async () => {
  try {
    products.value = await fetchProducts()
  } catch (e) {
    error.value = '상품을 불러오지 못했습니다. 백엔드 서버가 실행 중인지 확인하세요.'
    console.error(e)
  } finally {
    loading.value = false
  }
})

function formatPrice(value) {
  return value.toLocaleString('ko-KR') + '원'
}
</script>

<template>
  <div class="container">
    <h1>AI Shop 상품 목록</h1>
    <p v-if="loading">상품을 불러오는 중입니다...</p>
    <p v-else-if="error" style="color: red;">{{ error }}</p>

    <div v-else class="product-grid">
      <div v-for="p in products" :key="p.id" class="product-card">
        <router-link :to="`/products/${p.id}`" class="product-link">
          <h3>{{ p.name }}</h3>
          <p class="category">{{ p.category }}</p>
          <p class="price">{{ formatPrice(p.price) }}</p>
          <span class="badge">AI 추천 {{ p.aiRecommendScore }}점</span>
        </router-link>
        <button @click="cart.addItem(p)">장바구니 담기</button>
      </div>
    </div>

    <p class="cart-summary">장바구니 수량: {{ cart.totalCount }}개 / 합계 {{ formatPrice(cart.totalPrice) }}</p>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 16px;
  background: #fff;
}
.product-link { text-decoration: none; color: inherit; display: block; }
.category { color: #888; font-size: 0.85rem; }
.price { font-weight: bold; color: var(--color-primary); }
.badge {
  display: inline-block;
  background: #fff3e0;
  color: #e65100;
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: 12px;
}
.cart-summary { margin-top: 24px; font-weight: bold; }
</style>
