import $api from '@/api/interceptors'
import { getProfileUrl } from '@/config/api.config'
import { IProfile, IProfileReq } from '@/types'
import { AxiosResponse } from 'axios'
export const profileService = {
  async getAvatar() {
    const response = $api.get(getProfileUrl('image'))
    return response
  },
  saveProfiel({
    dateOfBirth,
    name,
    phone,
    patronymic,
    sex,
    surname,
  }: IProfileReq): Promise<AxiosResponse<IProfile>> {
    const response = $api.post(getProfileUrl('save'), {
      dateOfBirth,
      name,
      phone,
      sex,
      patronymic,
      surname,
    })
    return response
  },
  getProfile(): Promise<AxiosResponse<IProfile>> {
    const response = $api.get(getProfileUrl('get'))
    return response
  },
}
