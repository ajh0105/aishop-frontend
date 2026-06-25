import axios from 'axios'

const reviewHttp = axios.create({
  baseURL: import.meta.env.VITE_REVIEW_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

export default reviewHttp
