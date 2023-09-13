'use client'
import { FC, useEffect, useRef } from 'react'
import styles from './Personal.module.scss'
import Image from 'next/image'
import { useAppSelector } from '@/hooks/useAppSelector'
import Loader from '@/ui/loader/Loader'
import { IProfile } from '@/types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { profileService } from '@/services/profile-service/profile.service'
import { useQuery, useMutation } from 'react-query'
import { queryClient } from '@/providers/MainProvider'
import { formatDate } from '@/utils/format'
import classNames from 'classnames'
import InputMask from 'react-input-mask'
const Personal: FC = () => {
  const query =
    useQuery('get-profile', profileService.getProfile).data?.data ||
    ({} as IProfile)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IProfile>({
    defaultValues: {
      id: query.id,
      name: query.name,
      surname: query.surname,
      patronymic: query.patronymic,
      phone: query.phone,
      sex: query.sex,
      dateOfBirth: query.dateOfBirth,
    },
    values: query,
    mode: 'onChange',
  })
  const inputRef = useRef('')
  useEffect(() => {
    ;(document.getElementById('date-id') as HTMLInputElement).value =
      query.dateOfBirth
    ;(document.getElementById('tel-id') as HTMLInputElement).value = query.phone
      ? query.phone?.substring(1)
      : ''
  }, [query, getValues('phone'), getValues('dateOfBirth')])

  const mutate = useMutation(profileService.saveProfiel, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-profile')
    },
  })
  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    data.dateOfBirth = data.dateOfBirth.substring(0, 10)
    console.log(data.dateOfBirth)
    const response = await mutate.mutate({
      ...data,
      dateOfBirth: data.dateOfBirth.substring(0, 10),
    })
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.titles}>
        <div className={styles.avatar}>
          <img src="/image/base-icon.png" alt="avatar" />
        </div>
        <h2 className={styles.name}>
          {query.name ? query.name + ' ' + query.surname : ''}
        </h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h3>Личная информация</h3>
        <div className={styles.template}>
          <label>
            <h5>Фамилия </h5>
            <input
              {...register('surname', {
                required: 'Surname is required field',
                maxLength: 50,
                minLength: 2,
              })}
              className={classNames('pr-3', { [styles.red]: errors.surname })}
              type="text"
              placeholder={
                getValues('surname') ? getValues('surname') : 'Фамилия'
              }
            />
          </label>
          <label>
            <h5>Имя </h5>
            <input
              {...register('name', {
                required: 'Name is required field',
                maxLength: 50,
                minLength: 2,
              })}
              className={classNames({ [styles.red]: errors.name })}
              type="text"
              placeholder={getValues('name') ? getValues('name') : 'Имя'}
            />
          </label>
        </div>
        <div className={styles.template}>
          <label>
            <h5>Отчество </h5>
            <input
              {...register('patronymic', {
                required: 'Patronymic is required field',
                maxLength: 50,
                minLength: 2,
              })}
              className={classNames({ [styles.red]: errors.patronymic })}
              type="text"
              placeholder={
                getValues('patronymic') ? getValues('patronymic') : 'Отчество'
              }
            />
          </label>
          <label>
            <h5>Дата рождения </h5>
            <input
              id="date-id"
              className={classNames('pr-3', {
                [styles.red]: errors.dateOfBirth,
              })}
              {...register('dateOfBirth', {
                required: 'dateOfBirth is required field',
                maxLength: 50,
                minLength: 2,
              })}
              type="date"
              max={formatDate(new Date())}
              min={'1923' + formatDate(new Date()).substring(4)}
              placeholder={
                getValues('dateOfBirth')
                  ? getValues('dateOfBirth')
                  : 'Выберите дату'
              }
            />
          </label>
        </div>
        <div className={styles.template}>
          <label>
            <h5>Пол</h5>
            <div className={styles['custom-select']}>
              <input
                type="text"
                className={classNames({ [styles.red]: errors.sex })}
                placeholder={getValues('sex') ? getValues('sex') : 'Пол'}
                {...register('sex', {
                  required: 'Sex is required field',
                  maxLength: 1,
                  minLength: 1,
                  pattern: /[m | f]/,
                })}
                minLength={1}
                maxLength={1}
              />
            </div>
          </label>
          <label>
            <h5>Номер телефона </h5>
            {/* <input
              type="tel"
              id="tel-id"
              className={classNames({ [styles.red]: errors.phone })}
              placeholder={getValues('phone') ? getValues('phone') : 'Телефон'}
              {...register('phone', {
                required: 'Phone is required field',
                maxLength: 11,
                minLength: 11,
              })}
            /> */}
            <InputMask
              mask="+7 (999) 999-99-99"
              type="tel"
              id="tel-id"
              className={classNames({ [styles.red]: errors.phone })}
              placeholder={getValues('phone') ? getValues('phone') : 'Телефон'}
              {...register('phone', {
                required: 'Phone is required field',
                maxLength: 11,
                minLength: 11,
              })}
            />
          </label>
        </div>
        <div className={styles.button}>
          <div></div>
          <button type="submit">Сохранить</button>
        </div>
      </form>
    </div>
  )
}

export default Personal
