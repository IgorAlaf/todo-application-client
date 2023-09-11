import { IPass, IUser } from './../../types/index'
import { authService } from '@/services/auth-service/auth.service'
import { IAuthResponse, ILogin } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk<IAuthResponse, ILogin>(
  'auth/register',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await authService.register({ email, password })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<IAuthResponse, ILogin>(
  'auth/login',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await authService.login({ email, password })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const updateEmail = createAsyncThunk<IUser, ILogin>(
  'auth/update-email',
  async ({ email, password }, thunkApi) => {
    try {
      const response = await authService.updateEmail({ email, password })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
export const updatePasssword = createAsyncThunk<IUser, IPass>(
  'auth/update-password',
  async ({ newPassword, password }, thunkApi) => {
    try {
      const response = await authService.updatePassword({
        password,
        newPassword,
      })
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
export const refresh = createAsyncThunk<IAuthResponse>(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const response = await authService.refresh()
      if (response.data) {
        localStorage.setItem('accessToken', response.data.accessToken)
      }
      return response.data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
