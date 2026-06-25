<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProductById } from '../api/productApi'
import { useCartStore } from '../stores/cart'
import ReviewList from '../components/ReviewList.vue'

const props = defineProps({ id: { type: String, required: true } })
const router = useRouter()
const cart = useCartStore()

const product = ref(null)
const notFound = ref(false)

async function load(id) {
  notFound.value = false
  product.value = null
  try {
    const result = await fetchProductById(id)
    product.value = result
  } catch (e) {
    notFound.value = true
  }
}

onMounted(() => load(props.id))
watch(() => props.id, (newId) => load(newId))

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="container">
    <button class="back" @click="goBack">← 목록으로</button>

    <p v-if="notFound">존재하지 않는 상품입니다.</p>

    <div v-else-if="product" class="detail">
      <h1>{{ product.name }}</h1>
      <p class="category">{{ product.category }}</p>
      <p class="price">{{ product.price.toLocaleString('ko-KR') }}원</p>
      <p class="desc">{{ product.description }}</p>
      <p>재고: {{ product.stock }}개 / AI 추천 점수: {{ product.aiRecommendScore }}점</p>
      <button @click="cart.addItem(product)">장바구니 담기</button>

      <ReviewList :product-id="product.id" />
    </div>
  </div>
</template>

<style scoped>
.back { margin-bottom: 16px; background: none; border: none; cursor: pointer; color: #555; }
.price { font-size: 1.4rem; font-weight: bold; color: var(--color-primary); }
.desc { line-height: 1.6; }
</style>
