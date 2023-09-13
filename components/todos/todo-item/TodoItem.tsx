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

export const TodoItemList: FC<{ items: ITodo[] }> = (props) => {
  return (
    <li className={styles.item}>
      <h3 className={styles.title}>
        {props.items[0] && Number.parseInt(props.items[0].date.substring(8))}{' '}
        {props.items[0] && month[props.items[0].date.substring(5, 7)]}
      </h3>
      <ul>
        {props.items.map((item, key) => {
          return <TodoItem key={key} {...item} />
        })}
      </ul>
    </li>
  )
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
  const [check, setCheck] = useState<boolean>(false)
  const [checkSuccess, setCheckSuccess] = useState<boolean>(false)
  const [content1, setContent1] = useState<Array<string>>([])
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
    // <li className={styles.item}>

    <div className={styles.wrapper}>
      <div className={styles.checked}>
        <div
          className={styles.container}
          onClick={() => {
            open()
            if (checked) {
              setContent1([
                'Вы уверены что хотите переоткрыть задачу',
                'Переоткрыть',
                'Задача успешно переоткрыта',
              ])
            } else {
              setContent1([
                'Вы уверены что хотите завершить задачу',
                'Завершить',
                'Задача успешно завершена',
              ])
            }

            setCheck(true)
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
      {check && (
        <Confirm
          setShowConfirm={setCheck}
          setSuccess={setCheckSuccess}
          content={content1[0]}
          material={{ id, time, description, title, date, checked: !checked }}
          func={edit}
          title={title}
          buttonContent={content1[1]}
        />
      )}
      {checkSuccess && (
        <Success content={content1[2]} setShowConfirm={setCheckSuccess} />
      )}
    </div>

    // </li>
  )
}

export default TodoItem
