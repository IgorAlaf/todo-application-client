import { IState } from '@/types'
import { createSlice } from '@reduxjs/toolkit'
import {
  login,
  logout,
  refresh,
  register,
  updateEmail,
  updatePasssword,
} from './user.actions'
const initialState: IState = {
  user: null,
  isLoading: false,
  errors: '',
  search: '',
}

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.errors = action.error?.message || ''
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.errors = action.error?.message || ''
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error?.message || ''
      })
      .addCase(updateEmail.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEmail.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error?.message || ''
      })
      .addCase(updatePasssword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePasssword.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload
      })
      .addCase(updatePasssword.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error?.message || ''
      })
      .addCase(refresh.pending, (state) => {
        state.isLoading = true
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.user = payload.user
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isLoading = false
        state.errors = action.error?.message || ''
      })
  },
})

export default userSlice
