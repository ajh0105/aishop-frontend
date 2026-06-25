<script setup>
import { ref, onMounted } from 'vue'
import { fetchReviews, createReview, deleteReview } from '../api/reviewApi'

const props = defineProps({ productId: { type: [String, Number], required: true } })

const reviews = ref([])
const form = ref({ author: '', rating: 5, content: '' })
const loading = ref(false)
const error = ref(null)

async function load() {
  try {
    reviews.value = await fetchReviews(props.productId)
  } catch (e) {
    error.value = '리뷰를 불러오지 못했습니다.'
  }
}

async function onSubmit() {
  loading.value = true
  try {
    await createReview(props.productId, { ...form.value })
    form.value = { author: '', rating: 5, content: '' }
    await load()
  } finally {
    loading.value = false
  }
}

async function onDelete(id) {
  await deleteReview(id)
  await load()
}

onMounted(load)
</script>

<template>
  <section class="reviews">
    <h2>상품 리뷰</h2>
    <p v-if="error" style="color:red">{{ error }}</p>

    <ul>
      <li v-for="r in reviews" :key="r.id">
        <strong>{{ r.author }}</strong> ({{ r.rating }}/5)
        <span
          class="sentiment-badge"
          :class="r.sentiment === '긍정' ? 'positive' : r.sentiment === '부정' ? 'negative' : 'unknown'"
        >
          {{ r.sentiment ?? '분석중' }}
        </span>
        - {{ r.content }}
        <button @click="onDelete(r.id)">삭제</button>
      </li>
    </ul>

    <form @submit.prevent="onSubmit" class="review-form">
      <input v-model="form.author" placeholder="작성자" required>
      <input type="number" v-model.number="form.rating" min="1" max="5" required>
      <textarea v-model="form.content" placeholder="리뷰 내용" required></textarea>
      <button type="submit" :disabled="loading">
        {{ loading ? '등록 중...' : '리뷰 등록' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.reviews { margin-top: 32px; border-top: 1px solid var(--color-border); padding-top: 16px; }
.review-form { display: flex; flex-direction: column; gap: 8px; max-width: 360px; margin-top: 12px; }
.sentiment-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 6px;
}
.sentiment-badge.positive { background: #e8f5e9; color: #2e7d32; }
.sentiment-badge.negative { background: #ffebee; color: #c62828; }
.sentiment-badge.unknown  { background: #f5f5f5; color: #757575; }
</style>
