import { getTodoUrl } from './../../config/api.config'
import $api from '@/api/interceptors'
import { getAuthUrl } from '@/config/api.config'
import { IAuthResponse, ILogin, IPass, ITodo, ITodoReq } from '@/types'
import { AxiosResponse } from 'axios'

export const todoService = {
  async getTodos(): Promise<AxiosResponse<ITodo[]>> {
    const response = await $api.get(getTodoUrl(''))
    return response
  },
  async createTodo({
    date,
    description,
    time,
    title,
    checked = false,
  }: ITodoReq): Promise<AxiosResponse<ITodo>> {
    const response = await $api.post(getTodoUrl('create'), {
      date,
      description,
      time,
      title,
      checked,
    })
    return response
  },
  async getTodo({ id }: { id: number }): Promise<AxiosResponse<ITodo>> {
    const response = await $api.get(getTodoUrl(`${id}`))
    return response
  },
  async todoSearch({
    title,
  }: {
    title: string
  }): Promise<AxiosResponse<ITodo[]>> {
    const response = await $api.get(getTodoUrl(`search?title=${title}`))
    return response
  },
  async todoEdit({
    date,
    description,
    time,
    title,
    id,
    checked,
  }: ITodo): Promise<AxiosResponse<ITodo>> {
    const response = await $api.patch(getTodoUrl(`edit/${id}`), {
      date,
      description,
      time,
      title,
      checked,
    })
    return response
  },
  async deleteTodo({ id }: { id: number }) {
    const response = await $api.delete(getTodoUrl(`delete/${id}`))
    return response
  },
}
