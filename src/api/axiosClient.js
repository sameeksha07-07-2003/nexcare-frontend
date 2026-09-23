// src/api/axiosClient.js
import axios from 'axios'
import { getToken } from '../utils/tokenStorage'

const axiosClient = axios.create({
  baseURL: '/backend',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient