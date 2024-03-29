'use client'
import { FC, useEffect, useReducer, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import cn from 'classnames'
import { AuthButton } from '..'
import { usePathname, redirect, useRouter } from 'next/navigation'
import path from 'path'
import Image from 'next/image'
import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout, refresh } from '@/store/user/user.actions'
import { useQuery } from 'react-query'
import { todoService } from '@/services/todo-service/todo.service'
import userSlice from '@/store/user/userSlice'
import { authService } from '@/services/auth-service/auth.service'
import { INavItem } from '@/types'
interface IProps {
  isAuth: boolean
}
const Header: FC<IProps> = ({ isAuth }) => {
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((store) => store.userReducer)
  const [show, setShow] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  if (!user && isAuth) {
    return (
      <div
        role="status"
        className="w-[100%] flex items-center justify-center h-[72px]"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          <Link className={styles['title-link']} href="/">
            Logo
          </Link>
        </h1>
        {pathname == '/' && (
          <div className={styles.search}>
            <input
              value={title}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  dispatch(userSlice.actions.setSearch(title))
                }
              }}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Поиск задач"
              className={styles['search-input']}
            />
          </div>
        )}
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {isAuth ? <NavList /> : <AuthButton />}
          </ul>
          <button
            className={styles.burger}
            onClick={() => setShow((prev) => !prev)}
          >
            <Image src="image/burger.svg" alt="menu" width={20} height={8} />
          </button>
        </nav>
        {show && (
          <nav className={styles.menu}>
            {isAuth ? (
              <BurgerList
                items={[
                  { title: 'Главная', icon: 'home.svg', path: '/' },
                  { title: 'Профиль', icon: 'profile.svg', path: '/profile' },
                ]}
              />
            ) : (
              <BurgerList
                items={[
                  {
                    title: 'Вход и регистрация',
                    path: '/auth/login',
                    icon: 'login.svg',
                  },
                ]}
              />
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

const BurgerList: FC<{ items: INavItem[] }> = ({ items }) => {
  return (
    <ul className={styles['menu-burger']}>
      {items.map((item, key) => {
        return (
          <li className={styles['item-burger']}>
            <Link href={item.path}>
              <Image
                alt="icon"
                src={`/image/${item.icon}`}
                width={30}
                height={30}
              />
              <span>{item.title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const NavList = () => {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  return (
    <>
      <li className={styles.item}>
        <Link
          className={cn(styles.link, { [styles.active]: pathname === '/' })}
          href="/"
        >
          Главная
        </Link>
      </li>
      <li className={styles.item}>
        <Link
          className={cn(styles.link, {
            [styles.active]:
              pathname === '/profile' || pathname === '/profile/authorization',
          })}
          href="/profile"
        >
          Профиль
        </Link>
      </li>
      <li
        className={cn(styles.item, 'cursor-pointer')}
        onClick={async () => {
          await dispatch(logout())
          router.replace('/auth/login')
        }}
      >
        <span className={cn(styles.link, styles.logout)}>Выйти</span>
      </li>
    </>
  )
}

export default Header
