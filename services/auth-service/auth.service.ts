import $api, { axiosClassic } from '@/api/interceptors'
import { getAuthUrl } from '@/config/api.config'
import { IAuthResponse, ILogin, IPass } from '@/types'
import { AxiosResponse } from 'axios'

export const authService = {
  async register({
    email,
    password,
  }: ILogin): Promise<AxiosResponse<IAuthResponse>> {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('register'),
      { email, password }
    )
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken)
    }
    return response
  },
  async login({
    email,
    password,
  }: ILogin): Promise<AxiosResponse<IAuthResponse>> {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl('login'),
      { email, password }
    )
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken)
    }
    return response
  },
  async logout() {
    const response = await $api.get(getAuthUrl('logout'))
    localStorage.removeItem('accessToken')
    return response
  },
  async updateEmail({ email, password }: ILogin) {
    const response = await $api.patch(getAuthUrl('update-email'), {
      email,
      password,
    })
    return response
  },
  async updatePassword({ password, newPassword }: IPass) {
    const response = await $api.patch(getAuthUrl('update-pass'), {
      password,
      newPassword,
    })
    return response
  },
  async refresh() {
    const response = await axiosClassic.get(getAuthUrl('refresh'), {
      withCredentials: true,
    })
    return response
  },
}
