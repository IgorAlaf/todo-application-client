import { FC } from 'react'
import styles from './Review.module.scss'
import { formatDate } from '@/utils/format'
import { ITodo } from '@/types'
import Image from 'next/image'
import { title } from 'process'

interface IProps {
  setShowModal: Function
  todo: ITodo
}

const Review: FC<IProps> = ({ setShowModal, todo }) => {
  function close() {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    document.getElementsByTagName('body')[0].style.paddingRight = '0px'
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.helper}>
            <h1 className={styles.title}>{todo.title}</h1>
            <form className={styles.form}>
              <input type="text" placeholder={todo.title} readOnly />
              <textarea placeholder={todo.description} readOnly></textarea>
              <div className={styles.container}>
                <label>
                  <input type="text" placeholder={todo.date} readOnly />
                  <span className={styles['datepicker-toggle']}>
                    <span className={styles['datepicker-toggle-button']}></span>
                    <input
                      className={styles['datepicker-input']}
                      type="date"
                      min={formatDate(new Date())}
                      max={formatDate(
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date().getDate() + 6
                        )
                      )}
                      readOnly
                    />
                  </span>
                </label>
                <label>
                  <input type="text" placeholder={todo.time} readOnly />
                  <span className={styles['timepicker-toggle']}>
                    <span className={styles['timepicker-toggle-button']}></span>
                    <input
                      type="time"
                      min="06:00"
                      max="23:00"
                      className={styles['timepicker-input']}
                      readOnly
                    />
                  </span>
                </label>
              </div>

              <div className={styles.buttons}>
                <button
                  className={styles.button}
                  onClick={() => {
                    close()
                    setShowModal(false)
                  }}
                  type="button"
                >
                  Закрыть
                </button>
              </div>
            </form>
            <button
              className={styles.close}
              onClick={() => {
                close()
                setShowModal(false)
              }}
            >
              <Image src="image/close.svg" alt="close" width={25} height={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
