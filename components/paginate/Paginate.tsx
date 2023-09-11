import { FC } from 'react'
import styles from './Paginate.module.scss'
interface IProps {
  tasksInPage: number
  tasksLength: number
  paginate: Function
}

const Paginate: FC<IProps> = ({ paginate, tasksInPage, tasksLength }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tasksLength / tasksInPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {pageNumbers.map((number) => (
          <li
            className={styles.item}
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
