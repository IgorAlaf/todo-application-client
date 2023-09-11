'use client'
import { Personal } from '@/components'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { refresh } from '@/store/user/user.actions'
import Loader from '@/ui/loader/Loader'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const page: FC = () => {
  return (
    <>
      <Personal />
    </>
  )
}

export default page
