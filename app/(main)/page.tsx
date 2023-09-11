'use client'
import { Todos } from '@/components'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { refresh } from '@/store/user/user.actions'
import Loader from '@/ui/loader/Loader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isLoading } = useAppSelector((store) => store.userReducer)
  useEffect(() => {
    async function check() {
      if (!localStorage.getItem('accessToken')) {
        router.replace('/auth/login')
      } else {
        const response = await dispatch(refresh())
        if (!response.payload) {
          router.replace('/auth/login')
        }
      }
    }
    check()
  }, [])
  if (!user || isLoading) {
    return <Loader />
  }
  return <Todos />
}
