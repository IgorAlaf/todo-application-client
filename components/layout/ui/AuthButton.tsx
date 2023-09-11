'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from '../Header.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
const AuthButton = () => {
	const pathname = usePathname()
	const [content, setContent] = useState<string>('')
	useEffect(() => {
		setContent(pathname === '/auth/login' ? 'Регистрация' : 'Войти')
	}, [pathname])
	return (
		<li className={styles.item}>
			<Link
				className={classNames(styles.link, styles.enter)}
				href={pathname === '/auth/login' ? '/auth/register' : '/auth/login'}
			>
				{content}
			</Link>
		</li>
	)
}

export default AuthButton
