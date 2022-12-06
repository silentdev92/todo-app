export interface TodoState {
  list: Todo[]
}

export interface SortedTodoList {
  id: number
  title: string
  list: Todo[]
}

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  user_id: string
  created_at: string
}
