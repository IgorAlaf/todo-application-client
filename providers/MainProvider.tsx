'use client'
import { Provider } from 'react-redux'
import store from '@/store/store'
import { QueryClient, QueryClientProvider } from 'react-query'
export const queryClient = new QueryClient()
const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}

export default MainProvider
