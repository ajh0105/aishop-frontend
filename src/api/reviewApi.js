import reviewHttp from './reviewHttp'

export async function fetchReviews(productId) {
  const res = await reviewHttp.get(`/products/${productId}/reviews`)
  return res.data
}

export async function createReview(productId, payload) {
  const res = await reviewHttp.post(`/products/${productId}/reviews`, payload)
  return res.data
}

export async function deleteReview(reviewId) {
  await reviewHttp.delete(`/reviews/${reviewId}`)
}
