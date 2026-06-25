<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchProductById, createProduct, updateProduct } from '../../api/productApi'

const props = defineProps({ id: { type: String, default: null } })
const router = useRouter()
const isEdit = !!props.id

const form = ref({
  name: '', category: '', price: 0, stock: 0,
  aiRecommendScore: 0, description: ''
})

onMounted(async () => {
  if (isEdit) {
    const data = await fetchProductById(props.id)
    form.value = { ...data }
  }
})

async function onSubmit() {
  if (isEdit) {
    await updateProduct(props.id, form.value)
  } else {
    await createProduct(form.value)
  }
  router.push('/admin')
}
</script>

<template>
  <div class="container">
    <h1>{{ isEdit ? '상품 수정' : '상품 등록' }}</h1>
    <form @submit.prevent="onSubmit" class="product-form">
      <label>상품명: <input v-model="form.name" required></label>
      <label>카테고리: <input v-model="form.category" required></label>
      <label>가격: <input type="number" v-model.number="form.price" required></label>
      <label>재고: <input type="number" v-model.number="form.stock" required></label>
      <label>AI 추천 점수: <input type="number" v-model.number="form.aiRecommendScore"></label>
      <label>설명:<br><textarea v-model="form.description" rows="4"></textarea></label>
      <div class="actions">
        <button type="submit">저장</button>
        <router-link to="/admin">취소</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.product-form { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
.product-form label { display: flex; flex-direction: column; gap: 4px; }
.actions { display: flex; gap: 12px; align-items: center; }
</style>
