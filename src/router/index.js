import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'product-list',
    component: () => import('../views/ProductList.vue')
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetail.vue'),
    props: true
  },
  {
    path: '/admin',
    name: 'admin-list',
    component: () => import('../views/admin/AdminProductList.vue')
  },
  {
    path: '/admin/new',
    name: 'admin-new',
    component: () => import('../views/admin/AdminProductForm.vue')
  },
  {
    path: '/admin/:id/edit',
    name: 'admin-edit',
    component: () => import('../views/admin/AdminProductForm.vue'),
    props: true
  },
  {
    path: '/ai-demo',
    name: 'ai-demo',
    component: () => import('../views/ReviewAiDemo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
