import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'product-list', component: () => import('../views/ProductList.vue') },
  { path: '/products/:id', name: 'product-detail', component: () => import('../views/ProductDetail.vue'), props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
