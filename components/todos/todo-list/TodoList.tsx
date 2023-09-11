'use client'
import { ITodo } from '@/types'
import { FC, useState, useEffect } from 'react'
import TodoItem from '../todo-item/TodoItem'
import Paginate from '@/components/paginate/Paginate'
import { sortingDate } from '@/utils/sorting'
import { todoService } from '@/services/todo-service/todo.service'
import { useQuery } from 'react-query'
import { useAppSelector } from '@/hooks/useAppSelector'
// const items: ITodo[] = [
//   {
//     id: 1,
//     title: 'dinner',
//     date: '2023-09-08',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 2,
//     title: 'Создать новое приложение react и сохранить его',
//     date: '2023-09-08',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 3,
//     title: 'dinner',
//     date: '2023-12-23',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 4,
//     title: 'Создать новое приложение react и сохранить его',
//     date: '2023-09-08',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 5,
//     title: 'dinner',
//     date: '2023-12-23',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 6,
//     title: 'dinner',
//     date: '2023-12-23',
//     time: '17:00',
//     description: 'no description',
//   },
//   {
//     id: 7,
//     title: 'Создать новое приложение react и сохранить его',
//     date: '2023-09-08',
//     time: '21:00',
//     description: 'no description',
//   },
//   {
//     id: 8,
//     title: 'dinner',
//     date: '2023-12-23',
//     time: '21:00',
//     description: 'no description',
//   },
// ]

const TodoList: FC = () => {
  const [tasksInPage] = useState(Math.min(5))
  const [currentPage, setCurrentPage] = useState(1)
  const { search } = useAppSelector((store) => store.userReducer)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const lastTodo = currentPage * tasksInPage
  let query = useQuery('todos', todoService.getTodos).data?.data || []
  console.log(search)
  useEffect(() => {
    query = query.filter((item, key) => item.title.includes(search))
  }, [search])
  const firstTodo = lastTodo - tasksInPage
  return (
    <div className="mt-2.5">
      <ul>
        {query &&
          sortingDate(query.filter((item) => item.title.includes(search)))
            .slice(firstTodo, lastTodo)
            .map((item, key) => {
              return <TodoItem key={key} {...item} />
            })}
      </ul>
      <Paginate
        paginate={paginate}
        tasksLength={query.filter((item) => item.title.includes(search)).length}
        tasksInPage={tasksInPage}
      />
    </div>
  )
}

export default TodoList
