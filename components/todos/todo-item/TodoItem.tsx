'use client'
import { ITodo } from '@/types'
import { FC, useState } from 'react'
import styles from './TodoItem.module.scss'
import Image from 'next/image'
import EditTodo from '../edit-todo/EditTodo'
import Success from '@/components/notions/success/Success'
import Confirm from '@/components/notions/confirm/Confirm'
import { set } from 'react-hook-form'
import Review from '@/components/notions/review/Review'
import { useMutation } from 'react-query'
import { todoService } from '@/services/todo-service/todo.service'
import { queryClient } from '@/providers/MainProvider'
const month: any = {
  '01': 'января',
  '02': 'февраля',
  '03': 'марта',
  '04': 'апреля',
  '05': 'мая',
  '06': 'июня',
  '07': 'июля',
  '08': 'августа',
  '09': 'сентября',
  '10': 'октября',
  '11': 'ноября',
  '12': 'декабря',
}

const TodoItem: FC<ITodo> = ({
  id,
  time,
  description,
  title,
  date,
  checked,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [showReview, setShowReview] = useState<boolean>(false)
  const del = useMutation(todoService.deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })
  const edit = useMutation(todoService.todoEdit, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })
  if (showModal || showConfirm) {
    open()
  }
  function open() {
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    document.getElementsByTagName('body')[0].style.paddingRight = '15px'
  }
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>
        {Number.parseInt(date.substring(8))} {month[date.substring(5, 7)]}
      </h3>
      <div className={styles.wrapper}>
        <div className={styles.checked}>
          <div
            className={styles.container}
            onClick={() => {
              edit.mutate({
                id,
                time,
                description,
                title,
                date,
                checked: !checked,
              })
            }}
          >
            <input
              className={styles.checkbox}
              checked={checked}
              type="checkbox"
            />
            <span className={styles.checkmark}></span>
          </div>
          <span className={styles.time}>{time}</span>
        </div>
        <h4
          className={styles.content}
          onClick={() => {
            open()
            setShowReview(true)
          }}
        >
          {title}
        </h4>
        <div className={styles.edit}>
          <button onClick={() => setShowModal(true)}>
            <Image alt="edit" width={30} height={30} src="image/edit.svg" />
          </button>
          <button onClick={() => setShowConfirm(true)}>
            <Image alt="del" width={30} height={30} src="image/delete.svg" />
          </button>
        </div>
      </div>
      {showModal && (
        <EditTodo
          setShowModal={setShowModal}
          todo={{ id, time, description, title, date, checked }}
        />
      )}
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          setSuccess={setSuccess}
          content="Вы уверены что хотите удалить задачу"
          material={{ id }}
          func={del}
          title={title}
          buttonContent="Подтвердить"
        />
      )}
      {success && (
        <Success content="Задача успешно удалена" setShowConfirm={setSuccess} />
      )}
      {showReview && (
        <Review
          setShowModal={setShowReview}
          todo={{ id, time, description, title, date, checked }}
        />
      )}
    </li>
  )
}

export default TodoItem
