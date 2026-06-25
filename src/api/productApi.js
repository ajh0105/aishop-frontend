import http from './http'

export async function fetchProducts() {
  const res = await http.get('/products')
  return res.data
}

export async function fetchProductById(id) {
  const res = await http.get(`/products/${id}`)
  return res.data
}

export async function createProduct(form) {
  const res = await http.post('/products', form)
  return res.data
}

export async function updateProduct(id, form) {
  const res = await http.put(`/products/${id}`, form)
  return res.data
}

export async function deleteProduct(id) {
  await http.delete(`/products/${id}`)
}
