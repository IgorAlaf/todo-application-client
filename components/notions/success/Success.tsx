import { FC } from 'react'
import styles from './Success.module.scss'
import Image from 'next/image'
interface IProps {
  content: string
  setShowConfirm: Function

  setShowModal?: Function
}
const Success: FC<IProps> = ({ content, setShowConfirm, setShowModal }) => {
  function close() {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    document.getElementsByTagName('body')[0].style.paddingRight = '0px'
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{content}</h2>
          <button
            className={styles.ok}
            onClick={() => {
              close()
              setShowConfirm(false)
              setShowModal ? setShowModal(false) : ''
            }}
          >
            ОК
          </button>
          <button
            className={styles.close}
            onClick={() => {
              close()
              setShowConfirm(false)
            }}
          >
            <Image src="/image/close.svg" alt="close" width={25} height={25} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Success
