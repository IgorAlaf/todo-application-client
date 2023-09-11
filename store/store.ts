import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
