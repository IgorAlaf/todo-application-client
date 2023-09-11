import { ITodo } from '@/types'

export const sortingDate = (items: ITodo[]): ITodo[] => {
  return items.sort((a: ITodo, b: ITodo) => {
    return compute(b) - compute(a)
  })
}

const compute = (todo: ITodo) => {
  const date =
    Number.parseInt(todo.date.substring(0, 4)) * 365 +
    Number.parseInt(todo.date.substring(5, 7)) * 30 +
    Number.parseInt(todo.date.substring(8))
  const time =
    Number.parseInt(todo.time.substring(0, 3)) * 60 +
    Number.parseInt(todo.time.substring(4))
  return date + 1 / time
}
