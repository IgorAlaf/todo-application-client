'use client'
import { FC, useEffect, useState } from 'react'
import styles from './Register.module.scss'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IRegister } from '@/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect, useRouter } from 'next/navigation'
import { register as reg } from '@/store/user/user.actions'
import Loader from '@/ui/loader/Loader'
import Image from 'next/image'
const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ mode: 'onChange' })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [err, setErr] = useState<string>('')
  const { user, isLoading } = useAppSelector((store) => store.userReducer)
  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    const response = await dispatch(reg(data))
    if (!user) {
      setErr('Кандидат с такой почтой уже существует')
    }
  }
  useEffect(() => {
    if (user && !isLoading) {
      router.replace('/')
      console.log(user)
    }
  }, [user])
  if (isLoading && !user) {
    return <Loader />
  }
  return (
    <div className={styles.login}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.graduation}>
            <h1>Регистрация</h1>
            <p>зарегистрироваться чтобы управлять своей учетной записью</p>
          </div>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label className="relative block">
              <input
                type="email"
                placeholder="почта"
                {...register('email', {
                  required: 'Почта - обязательное поле',
                  maxLength: 50,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Введите правильную почту',
                  },
                })}
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
                id="register-pass"
              />
              <Image
                width={20}
                height={20}
                alt="s"
                src="/image/eye.png"
                className="absolute right-[10px] top-[12%] cursor-pointer"
                onClick={() => {
                  const item = document.getElementById(
                    'register-pass'
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
            <label className="relative block">
              <input
                type="password"
                placeholder="повторите пароль"
                {...register('repeat', {
                  required: 'Повторите пароль',
                  maxLength: 50,
                  minLength: 6,
                })}
                id="register-pass-two"
              />
              <Image
                width={20}
                height={20}
                alt="s"
                src="/image/eye.png"
                className="absolute right-[10px] top-[12%] cursor-pointer"
                onClick={() => {
                  const item = document.getElementById(
                    'register-pass-two'
                  ) as HTMLElement
                  if (item.getAttribute('type') === 'text') {
                    item.setAttribute('type', 'password')
                  } else {
                    item.setAttribute('type', 'text')
                  }
                }}
              />
              {errors.repeat?.type === 'required' && (
                <div className="text-red-500 text-sm tr:text-xs absolute bottom-0 left-0">
                  {errors.repeat?.message}
                </div>
              )}
              {errors.repeat?.type === 'minLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Минимум 6 символов
                </div>
              )}
              {errors.repeat?.type === 'maxLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Максимум 50 символов
                </div>
              )}
            </label>

            <div className={styles['form__buttons']}>
              <button type="reset">Отмена</button>
              <button type="submit">Зарегистрироваться</button>
            </div>
          </form>
          {err && (
            <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-[10px] left-[20%]">
              Кандидат с такой почтой уже существует
            </div>
          )}
        </div>

        <p className={styles.copy}>
          У вас есть учетная запись? <Link href="/auth/login">Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
