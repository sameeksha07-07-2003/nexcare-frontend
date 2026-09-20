import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/backend',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export default axiosClient