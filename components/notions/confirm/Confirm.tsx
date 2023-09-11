'use state'
import { FC, useState } from 'react'
import styles from './Confirm.module.scss'
import Success from '../success/Success'
import cn from 'classnames'
import { UseMutationResult } from 'react-query'
interface IProps {
  content: string
  title: string
  buttonContent: string
  setShowConfirm: Function
  setSuccess: Function
  func: any
  material: any
}

const Confirm: FC<IProps> = ({
  content,
  buttonContent,
  title,
  setShowConfirm,
  setSuccess,
  func,
  material,
}) => {
  function close() {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    document.getElementsByTagName('body')[0].style.paddingRight = '0px'
  }
  return (
    <div className={cn(styles.overlay, { success: [styles.hidden] })}>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <p className={styles.content}>
            {content} : "<span className={styles.title}>{title}</span>"
          </p>
          <div className={styles.buttons}>
            <button
              onClick={() => {
                close()
                setShowConfirm(false)
              }}
            >
              Отмена
            </button>
            <button
              onClick={async () => {
                await func.mutate(material)
                setSuccess(true)
                setShowConfirm(false)
              }}
            >
              {buttonContent}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirm
