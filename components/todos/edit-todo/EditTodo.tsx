'use client'
import { FC, useState } from 'react'
import styles from './EditTodo.module.scss'
import { formatDate } from '@/utils/format'
import { ITodo } from '@/types'
import Image from 'next/image'
import { todoService } from '@/services/todo-service/todo.service'
import { queryClient } from '@/providers/MainProvider'
import { useMutation } from 'react-query'
import Success from '@/components/notions/success/Success'
import Confirm from '@/components/notions/confirm/Confirm'

interface IProps {
  todo: ITodo
  setShowModal: Function
}

const EditTodo: FC<IProps> = ({ setShowModal, todo }) => {
  function close() {
    document.getElementsByTagName('body')[0].style.overflowY = 'auto'
    document.getElementsByTagName('body')[0].style.paddingRight = '0px'
  }
  const edit = useMutation(todoService.todoEdit, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })
  const [success, setSuccess] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description)
  const [dateF, setDateF] = useState(todo.date)
  const [time, setTimeF] = useState(todo.time)
  return (
    <div className={styles.overlay} id="edit-module">
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.helper}>
            <h1 className={styles.title}>Редактировать задачу</h1>
            <form
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault()
                setConfirm(true)
              }}
            >
              <input
                type="text"
                placeholder="Заголовок"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
              <textarea
                placeholder="Описание задачи"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              ></textarea>
              <div className={styles.container}>
                <label>
                  <input
                    type="date"
                    id="date-input-edit"
                    onChange={(e) => {
                      setDateF(e.target.value)
                    }}
                    placeholder="Дата"
                    min={formatDate(new Date())}
                    max={formatDate(
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        new Date().getDate() + 7
                      )
                    )}
                    value={dateF}
                  />
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
                          new Date().getDate() + 7
                        )
                      )}
                      value={dateF}
                      onChange={(e) => setDateF(e.target.value)}
                    />
                  </span>
                </label>
                <label>
                  <input
                    type="time"
                    id="time-input-edit"
                    placeholder="Время"
                    onChange={(e) => {
                      setTimeF(e.target.value)
                    }}
                    min="06:00"
                    max="23:00"
                    value={time}
                  />
                  <span className={styles['timepicker-toggle']}>
                    <span className={styles['timepicker-toggle-button']}></span>
                    <input
                      value={time}
                      onChange={(e) => setTimeF(e.target.value)}
                      type="time"
                      min="06:00"
                      max="23:00"
                      className={styles['timepicker-input']}
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
                  type="reset"
                >
                  Отмена
                </button>
                <button className={styles.button} type="submit">
                  Сохранить
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
      {confirm && (
        <Confirm
          buttonContent="Изменить"
          content="Вы уверены что хотите изменить задачу"
          title={title}
          setSuccess={setSuccess}
          setShowConfirm={setConfirm}
          func={edit}
          material={{
            date: dateF,
            description: description,
            id: todo.id,
            time,
            checked: todo.checked,
            title: title,
          }}
        />
      )}
      {success && (
        <Success
          content="Задача успешно изменена"
          setShowConfirm={setSuccess}
          setShowModal={setShowModal}
        />
      )}
    </div>
  )
}

export default EditTodo
