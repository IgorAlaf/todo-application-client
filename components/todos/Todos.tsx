'use client'
import { FC, useEffect } from 'react'
import { CreateTodo, TodoList } from '..'
import styles from './Todos.module.scss'
import Success from '../notions/success/Success'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect } from 'next/navigation'
import { refresh } from '@/store/user/user.actions'
import { useRouter } from 'next/navigation'
const Todos: FC = () => {
  return (
    <div className={styles.wrapper}>
      <CreateTodo />
      <TodoList />
    </div>
  )
}

export default Todos
