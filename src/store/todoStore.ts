import { Todo } from '../types/todo';

let todos: Todo[] = [];
let nextId = 1;

export function resetTodos(): void {
  todos = [];
  nextId = 1;
}

export function getAllTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: number): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(title: string): Todo {
  const now = new Date().toISOString();
  const todo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  todos.push(todo);
  return todo;
}

export function updateTodo(
  id: number,
  updates: Partial<Pick<Todo, 'title' | 'completed'>>
): Todo | undefined {
  const todo = getTodoById(id);

  if (!todo) {
    return undefined;
  }

  if (typeof updates.title !== 'undefined') {
    todo.title = updates.title;
  }

  if (typeof updates.completed !== 'undefined') {
    todo.completed = updates.completed;
  }

  todo.updatedAt = new Date().toISOString();
  return todo;
}

export function deleteTodo(id: number): boolean {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
