import { FC } from 'react'
import styles from './Paginate.module.scss'
import classNames from 'classnames'
interface IProps {
  tasksInPage: number
  tasksLength: number
  paginate: Function
  currentPage: number
}

const Paginate: FC<IProps> = ({
  paginate,
  tasksInPage,
  tasksLength,
  currentPage,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tasksLength / tasksInPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {pageNumbers.map((number) => (
          <li
            className={classNames(styles.item, {
              [styles.active]: number === currentPage,
            })}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Paginate
