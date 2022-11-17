import { supabase } from './index'

class TodoService {
  selectAll(userId: string) {
    return supabase.from('todos').select().eq('user_id', userId)
  }
  create(title: string, description: string, userId: string) {
    return supabase
      .from('todos')
      .insert({ title, description, completed: false, user_id: userId })
      .select()
  }
  update(
    id: number,
    data: { title?: string; description?: string; completed?: boolean }
  ) {
    return supabase
      .from('todos')
      .update({ ...data })
      .eq('id', id)
      .select()
  }
  delete(id: number) {
    return supabase.from('todos').delete().eq('id', id)
  }
}

export default new TodoService()
