'use client'
import { FC, useEffect, useRef, useState } from 'react'
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
import $api from '@/api/interceptors'
import { getProfileUrl } from '@/config/api.config'
const Personal: FC = () => {
  const [showSelect, setShowSelect] = useState<boolean>(false)
  // const [selectValue, setSelectValue] = useState<string>('')
  const query =
    useQuery('get-profile', profileService.getProfile).data?.data ||
    ({} as IProfile)
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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
  const inputRef = useRef<any>()
  useEffect(() => {
    ;(document.getElementById('tel-id') as HTMLInputElement).value = query.phone
  }, [query])
  useEffect(() => {}, [query])
  useEffect(() => {}, [getValues('phone')])
  const mutate = useMutation(profileService.saveProfiel, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-profile')
    },
  })
  const image = useQuery('get-image', async () => {
    return $api.get(getProfileUrl('image'))
  }).data?.data
  useEffect(() => {
    async function sss() {
      const response = await $api.get(getProfileUrl('image'), {
        headers: { 'Content-Type': 'image/jpg' },
        responseType: 'blob',
      })
      setSelectFile(response.data)
      console.log(response)
    }
    sss()
  }, [])

  const [selectFile, setSelectFile] = useState<File>()
  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    data.dateOfBirth = data.dateOfBirth.substring(0, 10)
    console.log(data.dateOfBirth)
    const response = await mutate.mutate({
      ...data,
      dateOfBirth: data.dateOfBirth.substring(0, 10),
    })
    if (selectFile) {
      const formData = new FormData()
      formData.set('image', selectFile)
      const response = await $api.post('files/upload', formData, {
        headers: {
          'Content-Encoding': 'utf-8',
        },
        responseEncoding: 'utf-8',
      })
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.titles}>
        <div className={styles.avatar}>
          <input
            type="file"
            ref={inputRef}
            className="hidden opacity-0"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files)
              if ((e.target.files || [])[0]) {
                setSelectFile((e.target.files || [])[0])
              }
            }}
          />
          <img
            onClick={() => {
              inputRef.current.click()
            }}
            src={
              selectFile
                ? URL.createObjectURL(selectFile)
                : '/image/base-icon.png'
            }
            alt="avatar"
          />
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
              <button
                className={classNames(styles['select-button'], {
                  [styles['red']]: errors.sex,
                })}
                onClick={() => {
                  setShowSelect((prev) => !prev)
                }}
                {...register('sex', {
                  required: 'sex is required field',
                })}
              >
                <span className={styles['selected-value']}>
                  {getValues('sex')
                    ? getValues('sex') === 'm'
                      ? 'Мужской'
                      : 'Женский'
                    : 'Пол'}
                </span>
                <span className={styles['arrow']}></span>
              </button>
              {showSelect && (
                <ul role="listbox" className={styles['select-dropdown']}>
                  <li
                    role="option"
                    onClick={() => {
                      setShowSelect(false)
                      // setSelectValue('m')
                      setValue('sex', 'm')
                    }}
                  >
                    <input type="radio" id="github" name="social-account" />
                    <label htmlFor="github">Myжской</label>
                  </li>
                  <li
                    role="option"
                    onClick={() => {
                      setShowSelect(false)
                      // setSelectValue('f')
                      setValue('sex', 'f')
                    }}
                  >
                    <input type="radio" id="instagram" name="social-account" />
                    <label htmlFor="instagram">Женский</label>
                  </li>
                </ul>
              )}
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
              placeholder="Телефон"
              {...register('phone', {
                required: 'Phone is required field',
                maxLength: 18,
                minLength: 18,
                pattern: /^\+\d{1} \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
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
