import { Header, NavLine } from '@/components'
import { useAppSelector } from '@/hooks/useAppSelector'
import Link from 'next/link'
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header isAuth={true} />
      {children}
    </>
  )
}

export default layout
