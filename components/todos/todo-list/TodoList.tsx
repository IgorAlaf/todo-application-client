'use client'
import { ITodo } from '@/types'
import { FC, useState, useEffect } from 'react'
import TodoItem, { TodoItemList } from '../todo-item/TodoItem'
import Paginate from '@/components/paginate/Paginate'
import { sortingDate, sortingTime } from '@/utils/sorting'
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
  const map = new Map<string, ITodo[]>()
  let query = useQuery('todos', todoService.getTodos).data?.data || []
  useEffect(() => {
    query = query.filter((item, key) => item.title.includes(search))
  }, [search])
  query.map((item) => {
    if (map.has(item.date)) {
      const items1: ITodo[] = map.get(item.date) || []
      items1.push(item)
      map.set(item.date, items1)
    } else {
      map.set(item.date, [item])
    }
  })
  const firstTodo = lastTodo - tasksInPage
  useEffect(() => {
    if (!Array.from(map.keys()).slice(firstTodo, lastTodo)[0]) {
      setCurrentPage((prev) => {
        if (prev === 1) {
          return 1
        }
        return prev - 1
      })
    }
  }, [map])
  return (
    <div className="mt-2.5">
      <ul>
        {map &&
          sortingDate(Array.from(map.keys()))
            .slice(firstTodo, lastTodo)
            .map((item) => {
              return (
                <TodoItemList
                  items={sortingTime(map.get(item) || []).filter((item) =>
                    item.title.includes(search)
                  )}
                />
              )
            })}
      </ul>
      <Paginate
        paginate={paginate}
        tasksLength={map.size}
        currentPage={currentPage}
        tasksInPage={tasksInPage}
      />
    </div>
  )
}

export default TodoList
