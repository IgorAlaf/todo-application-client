import { useAppSelector } from '@/hooks/useAppSelector'
import './globals.scss'
import MainProvider from '@/providers/MainProvider'
import Loader from '@/ui/loader/Loader'
export const metadata = {
  title: 'Todo-app',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  )
}
