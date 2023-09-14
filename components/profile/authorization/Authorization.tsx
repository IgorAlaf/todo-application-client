'use client'
import { FC, useState } from 'react'
import styles from './Authorization.module.scss'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ILogin, IPass, IRegister } from '@/types'
import { updateEmail, updatePasssword } from '@/store/user/user.actions'
import classNames from 'classnames'
import Image from 'next/image'
const Authorization: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    mode: 'onChange',
  })
  const [err1, setErr1] = useState<string>('')
  const [notion, setNotion] = useState<string>('')
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const response = await dispatch(updateEmail(data))
    // if (response.meta.requestStatus == 'rejected') {
    //   console.log('hello')
    // }
    setNotion('Почта успешно изменена ,залогинтесь снова')
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
            <label className="w-[100%] relative flex flex-auto">
              <input
                {...register('password', {
                  required: 'Password is required field',
                  maxLength: 50,
                  minLength: 6,
                })}
                id="pass-id-email"
                type="password"
                className={classNames({ [styles.red]: errors.password })}
                placeholder="Введите пароль"
              />
              <Image
                width={20}
                height={20}
                alt="s"
                src="/image/eye.png"
                className="absolute right-[10px] top-[28%] cursor-pointer"
                onClick={() => {
                  const item = document.getElementById(
                    'pass-id-email'
                  ) as HTMLElement
                  if (item.getAttribute('type') === 'text') {
                    item.setAttribute('type', 'password')
                  } else {
                    item.setAttribute('type', 'text')
                  }
                }}
              />
            </label>
          </div>
          <div className={styles.buttons}>
            <button>Сохранить</button>
            <div></div>
          </div>
        </form>
        {/* {err1 && <div className="text-red-400">{err1}</div>} */}
      </div>
      <ChangePass />
    </div>
  )
}

export default Authorization

interface IPassChange {
  password: string
  newpass: string
  checkNewPass: string
}

const ChangePass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassChange>({
    mode: 'onChange',
  })
  const [err1, setErr1] = useState<string>('')
  const [notion, setNotion] = useState<string>('')
  const dispatch = useAppDispatch()
  const onSubmit: SubmitHandler<IPassChange> = async (data) => {
    if (data.checkNewPass !== data.newpass) {
      setErr1('Новый пароль не совпадает')
    } else {
      const dat: IPass = { password: data.password, newPassword: data.newpass }
      const response = await dispatch(updatePasssword(dat))
      if (response.meta.requestStatus == 'rejected') {
        res('Не правильный пароль')
      }
      setNotion('Пароль успешно изменен,залогинтесь снова')
    }
  }
  const res = async (text: string) => {
    setErr1('Не правильный пароль')
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Смена пароля</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="w-[100%] relative flex flex-auto">
            <input
              type="password"
              {...register('password', {
                required: 'Password is required field',
                maxLength: 50,
                minLength: 6,
              })}
              id="asdf"
              className={classNames({ [styles.red]: errors.password })}
              placeholder="Введите текущий пароль"
            />
            <Image
              width={20}
              height={20}
              alt="s"
              src="/image/eye.png"
              className="absolute right-[10px] top-[28%] cursor-pointer"
              onClick={() => {
                const item = document.getElementById('asdf') as HTMLElement
                if (item.getAttribute('type') === 'text') {
                  item.setAttribute('type', 'password')
                } else {
                  item.setAttribute('type', 'text')
                }
              }}
            />
          </label>
          <label className="w-[100%] relative flex flex-auto"></label>
        </div>
        <div>
          <label className="w-[100%] relative flex flex-auto">
            <input
              type="password"
              {...register('newpass', {
                required: 'Password is required field',
                maxLength: 50,
                minLength: 6,
              })}
              id="1asdf1234"
              className={classNames({ [styles.red]: errors.newpass })}
              placeholder="Введите новый пароль"
            />
            <Image
              width={20}
              height={20}
              alt="s"
              src="/image/eye.png"
              className="absolute right-[10px] top-[28%] cursor-pointer"
              onClick={() => {
                const item = document.getElementById('1asdf1234') as HTMLElement
                if (item.getAttribute('type') === 'text') {
                  item.setAttribute('type', 'password')
                } else {
                  item.setAttribute('type', 'text')
                }
              }}
            />
          </label>
          <label className="w-[100%] relative flex flex-auto">
            <input
              type="password"
              {...register('checkNewPass', {
                required: 'Password is required field',
                maxLength: 50,
                minLength: 6,
              })}
              id="asdflkjwq"
              className={classNames({ [styles.red]: errors.checkNewPass })}
              placeholder="Повторите новый пароль"
            />
            <Image
              width={20}
              height={20}
              alt="s"
              src="/image/eye.png"
              className="absolute right-[10px] top-[28%] cursor-pointer"
              onClick={() => {
                const item = document.getElementById('asdflkjwq') as HTMLElement
                if (item.getAttribute('type') === 'text') {
                  item.setAttribute('type', 'password')
                } else {
                  item.setAttribute('type', 'text')
                }
              }}
            />
          </label>
        </div>
        <div className={styles.buttons}>
          <button>Сохранить</button>
          <div></div>
        </div>
      </form>
      {err1 && (
        <div className="text-red-400 absolute bottom-[30%] leading-none">
          {err1}
        </div>
      )}
    </div>
  )
}
