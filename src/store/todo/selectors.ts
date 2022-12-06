import moment from 'moment'
import { RootState } from './../index'
import { SortedTodoList } from './types'

export const selectTodoState = (state: RootState) => state.todo

export const selectTodoList = (state: RootState) => selectTodoState(state).list

export const selectSortedTodoLists = (state: RootState) => {
  const list = selectTodoList(state)
  const result: SortedTodoList[] = []

  for (const todo of list) {
    const now = moment()
    const currentDate = moment(todo.created_at)
    let title: string

    if (
      currentDate.dayOfYear() === now.dayOfYear() &&
      currentDate.year() === now.year()
    )
      title = 'Today'
    else if (
      currentDate.dayOfYear() === now.subtract(1, 'day').dayOfYear() &&
      currentDate.year() === now.subtract(1, 'day').year()
    )
      title = 'Yesterday'
    else title = currentDate.format('MMMM YYYY')

    const sortedTodoListIndex = result.findIndex((todo) => todo.title === title)
    if (sortedTodoListIndex !== -1) result[sortedTodoListIndex].list.push(todo)
    else {
      result.push({
        id: Math.round(Date.now() * Math.random()),
        title,
        list: [todo],
      })
    }

    const todayTodoList = result.find((todo) => todo.title === 'Today')
    if (!todayTodoList)
      result.unshift({
        id: Math.round(Date.now() * Math.random()),
        title: 'Today',
        list: [],
      })
  }

  return result
}
