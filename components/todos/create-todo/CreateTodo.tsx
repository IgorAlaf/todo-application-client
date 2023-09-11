'use client'
import { FC, useState } from 'react'
import styles from './CreateTodo.module.scss'
import { formatDate } from '@/utils/format'
import { useMutation } from 'react-query'
import { todoService } from '@/services/todo-service/todo.service'
import { queryClient } from '@/providers/MainProvider'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ITodoReq } from '@/types'
import classNames from 'classnames'
const CreateTodo: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ITodoReq>({
    mode: 'onSubmit',
  })
  const [dateF, setDateF] = useState<string>('')
  const [timeF, setTimeF] = useState<string>('')
  const [error, setError] = useState<string>('')
  const mutation = useMutation(todoService.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
      reset()
    },
  })
  const onSubmit: SubmitHandler<ITodoReq> = async (data) => {
    if (dateF && timeF) {
      mutation.mutate({
        date: dateF,
        time: timeF,
        title: data.title,
        description: data.description,
        checked: false,
      })
      setDateF('')
      setTimeF('')
      setError('')
    } else {
      setError('Empty field (datef or timeF or title)')
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.helper}>
        <h1 className={styles.title}>Добавить задачу</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={classNames({
              [styles.red]: getValues('title') === '' && error,
            })}
            type="text"
            placeholder="Заголовок"
            {...register('title', {
              // required: 'Title is required field',
              // maxLength: 50,
              // minLength: 1,
            })}
          />
          <textarea
            placeholder="Описание задачи"
            {...register('description', {
              required: false,
              maxLength: 200,
              minLength: 1,
            })}
            className={classNames({
              [styles.red]: errors.description,
            })}
          ></textarea>
          <div className={styles.container}>
            <label>
              <input
                type="text"
                placeholder="Дата"
                readOnly
                value={dateF}
                className={classNames({
                  [styles.red]: dateF === '' && error,
                })}
              />
              <span className={styles['datepicker-toggle']}>
                <span className={styles['datepicker-toggle-button']}></span>
                <input
                  className={styles['datepicker-input']}
                  type="date"
                  value={dateF}
                  onChange={(e) => setDateF(e.target.value)}
                  min={formatDate(new Date())}
                  max={formatDate(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate() + 6
                    )
                  )}
                />
              </span>
            </label>
            <label>
              <input
                type="text"
                placeholder="Время"
                value={timeF}
                readOnly
                className={classNames({
                  [styles.red]: timeF === '' && error,
                })}
              />
              <span className={styles['timepicker-toggle']}>
                <span className={styles['timepicker-toggle-button']}></span>
                <input
                  value={timeF}
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
            <button className={styles.button} type="reset">
              Отмена
            </button>
            <button className={styles.button} type="submit">
              Добавить
            </button>
          </div>
        </form>
        {error && (
          <span className="text-red-600 absolute text-sm mt-2">{error}</span>
        )}
      </div>
    </div>
  )
}

export default CreateTodo
