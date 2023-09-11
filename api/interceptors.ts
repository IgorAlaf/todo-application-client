import { getAuthUrl } from '@/config/api.config'
import { IAuthResponse, ITokens } from '@/types'
import axios from 'axios'
export const axiosClassic = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

$api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`
    return config
  },
  async (error) => {
    console.log(error)
  }
)

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axiosClassic.get<ITokens>(getAuthUrl('refresh'))
        localStorage.setItem('accessToken', response.data.accessToken)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('Not log in')
      }
    }
  }
)

export default $api
