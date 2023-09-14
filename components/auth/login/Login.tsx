'use client'
import { FC, useEffect, useState } from 'react'
import styles from './Login.module.scss'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ILogin } from '@/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { login } from '@/store/user/user.actions'
import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect, useRouter } from 'next/navigation'
import Loader from '@/ui/loader/Loader'
import Image from 'next/image'
const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
  })
  const router = useRouter()
  const [err, setErr] = useState<string>('')
  const { user, isLoading } = useAppSelector((store) => store.userReducer)
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const response = await dispatch(login(data))
    if (!user) {
      setErr('Неверная почта или пароль')
    }
  }
  useEffect(() => {
    if (user && !isLoading) {
      router.replace('/')
    }
  }, [user])
  if (isLoading) {
    return <Loader />
  }
  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.graduation}>
            <h1>Авторизация</h1>
            <p>войдите в систему,чтобы усправлять своей учетной записью</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className="relative block">
              <input
                type="email"
                {...register('email', {
                  required: 'Почта - обязательное поле',
                  maxLength: 50,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Введите правильную почту',
                  },
                })}
                placeholder="почта"
              />
              {errors.email?.type === 'required' && (
                <div className="text-red-500 text-sm absolute bottom-0 left-0">
                  {errors.email?.message}
                </div>
              )}
              {errors.email?.type === 'pattern' && (
                <div className="text-red-500 text-sm absolute bottom-0 left-0">
                  {errors.email?.message}
                </div>
              )}
              {errors.email?.type === 'maxLength' && (
                <div className="text-red-500 text-sm absolute bottom-0 left-0">
                  Максимум 50 символов
                </div>
              )}
            </label>
            <label className="relative block">
              <input
                type="password"
                placeholder="пароль"
                {...register('password', {
                  required: 'Пароль - обязательное поле',
                  maxLength: 50,
                  minLength: 6,
                })}
                id="login-pass"
              />
              <Image
                width={20}
                height={20}
                alt="s"
                src="/image/eye.png"
                className="absolute right-[10px] top-[12%] cursor-pointer"
                onClick={() => {
                  const item = document.getElementById(
                    'login-pass'
                  ) as HTMLElement
                  if (item.getAttribute('type') === 'text') {
                    item.setAttribute('type', 'password')
                  } else {
                    item.setAttribute('type', 'text')
                  }
                }}
              />
              {errors.password?.type === 'required' && (
                <div className="text-red-500 text-sm tr:text-xs absolute bottom-0 left-0">
                  {errors.password?.message}
                </div>
              )}
              {errors.password?.type === 'minLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Минимум 6 символов
                </div>
              )}
              {errors.password?.type === 'maxLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Максимум 50 символов
                </div>
              )}
            </label>

            <div className={styles['form__buttons']}>
              <button type="reset">Отмена</button>
              <button type="submit">Войти</button>
            </div>
          </form>
          {err && (
            <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-[10px] left-[20%]">
              Неверная почта или пароль
            </div>
          )}
        </div>
        <p className={styles.copy}>
          У вас нет учетной записи?{' '}
          <Link href="/auth/register">Регистрация</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
