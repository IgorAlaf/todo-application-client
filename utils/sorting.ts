import { ITodo } from '@/types'

export const sortingDate = (items: string[]): string[] => {
  return items.sort((a: string, b: string) => {
    return compute(b) - compute(a)
  })
}

const compute = (todo: string) => {
  const date =
    Number.parseInt(todo.substring(0, 4)) * 365 +
    Number.parseInt(todo.substring(5, 7)) * 30 +
    Number.parseInt(todo.substring(8))
  // const time =
  //   Number.parseInt(todo.time.substring(0, 3)) * 60 +
  //   Number.parseInt(todo.time.substring(4))
  // return date + 1 / time
  return date
}

export const sortingTime = (items: ITodo[]) => {
  return items.sort((a: ITodo, b: ITodo) => {
    return times(b) - times(a)
  })
}
const times = (todo: ITodo) => {
  const time =
    Number.parseInt(todo.time.substring(0, 3)) * 60 +
    Number.parseInt(todo.time.substring(4))
  return 1 / time
}
