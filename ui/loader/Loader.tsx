import { FC } from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return <div className={styles['lds-dual-ring']}></div>
}

export default Loader
