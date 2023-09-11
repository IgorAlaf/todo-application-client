'use client'
import { FC, useEffect } from 'react'
import styles from './Register.module.scss'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IRegister } from '@/types'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { redirect } from 'next/navigation'
import { register as reg } from '@/store/user/user.actions'
import Loader from '@/ui/loader/Loader'
const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({ mode: 'onChange' })
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector((store) => store.userReducer)
  useEffect(() => {
    if (user) {
      redirect('/')
    }
  }, [user])
  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    const response = await dispatch(reg(data))
  }
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
                  required: 'Email is required field',
                  maxLength: 50,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter valid email',
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
                  Max Email is 50 symbols
                </div>
              )}
            </label>
            <label className="relative block">
              <input
                type="password"
                placeholder="пароль"
                {...register('password', {
                  required: 'Password is required field',
                  maxLength: 50,
                  minLength: 6,
                })}
              />
              {errors.password?.type === 'required' && (
                <div className="text-red-500 text-sm tr:text-xs absolute bottom-0 left-0">
                  {errors.password?.message}
                </div>
              )}
              {errors.password?.type === 'minLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Min password is 6 symbols
                </div>
              )}
              {errors.password?.type === 'maxLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Max password is 50 symbols
                </div>
              )}
            </label>
            <label className="relative block">
              <input
                type="password"
                placeholder="повторите пароль"
                {...register('repeat', {
                  required: 'Repeat password',
                  maxLength: 50,
                  minLength: 6,
                })}
              />
              {errors.repeat?.type === 'required' && (
                <div className="text-red-500 text-sm tr:text-xs absolute bottom-0 left-0">
                  {errors.repeat?.message}
                </div>
              )}
              {errors.repeat?.type === 'minLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Min password is 6 symbols
                </div>
              )}
              {errors.repeat?.type === 'maxLength' && (
                <div className="text-red-500 text-sm text-bold tr:text-xs absolute bottom-0 left-0">
                  Max password is 50 symbols
                </div>
              )}
            </label>
            <div className={styles['form__buttons']}>
              <button type="reset">Отмена</button>
              <button type="submit">Зарегистрироваться</button>
            </div>
          </form>
        </div>
        <p className={styles.copy}>
          У вас есть учетная запись?
          <Link href="/auth/login">Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
