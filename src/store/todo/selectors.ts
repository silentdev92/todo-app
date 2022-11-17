import { RootState } from './../index'

export const selectTodoState = (state: RootState) => state.todo

export const selectTodoList = (state: RootState) => selectTodoState(state).list
