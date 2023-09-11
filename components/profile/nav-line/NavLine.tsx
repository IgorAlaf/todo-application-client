'use client'
import { FC } from 'react'
import styles from './NavLine.module.scss'
import Link from 'next/link'
import cn from 'classnames'
import { items } from './navLine.items'
import { usePathname } from 'next/navigation'
const NavLine: FC = () => {
	const pathname = usePathname()
	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>
				{items.map((item, key) => {
					return (
						<li className={styles.item} key={key}>
							<Link
								href={item.path}
								className={pathname === item.path ? styles.active : ''}
							>
								{item.title}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default NavLine
