import { TodoState, Todo } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TodoState = {
  list: [],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.list = action.payload
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.list?.push(action.payload)
    },
    updateTodo(state, action: PayloadAction<{ id: number; data: Todo }>) {
      const index = state.list?.findIndex(
        (todo) => todo.id === action.payload.id
      )
      state.list[index] = action.payload.data
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.list = state.list?.filter((todo) => todo.id !== action.payload)
    },
  },
})

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions
export default todoSlice.reducer
