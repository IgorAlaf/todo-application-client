'use client'
import { FC } from 'react'
import styles from './Authorization.module.scss'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILogin, IPass, IRegister } from '@/types'
import { updateEmail } from '@/store/user/user.actions'
import classNames from 'classnames'
const Authorization: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
  })
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const response = await dispatch(updateEmail(data))
  }

  // const submit = async (e)=>{

  // }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Почта</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register('email', {
                required: 'Email is required field',
                maxLength: 50,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Enter valid email',
                },
              })}
              type="email"
              placeholder="Введите новую почту"
              className={classNames({ [styles.red]: errors.email })}
            />
            <input
              {...register('password', {
                required: 'Password is required field',
                maxLength: 50,
                minLength: 6,
              })}
              type="password"
              className={classNames({ [styles.red]: errors.password })}
              placeholder="Введите пароль"
            />
          </div>
          <div className={styles.buttons}>
            <button>Сохранить</button>
            <div></div>
          </div>
        </form>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Смена пароля</h2>
        <form className={styles.form}>
          <div>
            <input type="password" placeholder="Введите текущий пароль" />
            <div></div>
          </div>
          <div>
            <input type="password" placeholder="Введите новый пароль" />
            <input type="password" placeholder="Повторите новый пароль" />
          </div>
          <div className={styles.buttons}>
            <button>Сохранить</button>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authorization
