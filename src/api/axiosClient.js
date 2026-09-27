import axios from 'axios'
import {
  clearToken,
  getToken,
} from '../utils/tokenStorage'

const axiosClient = axios.create({
  baseURL: '/backend',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status
    const token = getToken()

    /*
     * Remove an expired or invalid saved token.
     *
     * We only clear it when a token was actually sent. A normal
     * incorrect-email/password response from /auth/login should not
     * affect the application session.
     */
    if (status === 401 && token) {
      clearToken()

      window.dispatchEvent(
        new CustomEvent('nexcare:unauthorized'),
      )
    }

    return Promise.reject(error)
  },
)

export default axiosClient