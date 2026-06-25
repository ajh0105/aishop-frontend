<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts, deleteProduct } from '../../api/productApi'

const products = ref([])

async function load() {
  products.value = await fetchProducts()
}

async function onDelete(id) {
  if (!confirm('삭제하시겠습니까?')) return
  await deleteProduct(id)
  await load()
}

onMounted(load)
</script>

<template>
  <div class="container">
    <h1>상품 관리</h1>
    <router-link to="/admin/new">+ 새 상품 등록</router-link>

    <table>
      <thead>
        <tr><th>ID</th><th>상품명</th><th>가격</th><th>재고</th><th>관리</th></tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.name }}</td>
          <td>{{ p.price.toLocaleString('ko-KR') }}원</td>
          <td>{{ p.stock }}</td>
          <td>
            <router-link :to="`/admin/${p.id}/edit`">수정</router-link>
            <button @click="onDelete(p.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { border: 1px solid var(--color-border); padding: 8px 12px; text-align: left; }
th { background: #f5f5f5; }
button { margin-left: 8px; }
</style>
