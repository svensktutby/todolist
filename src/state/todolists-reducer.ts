import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST'
  id: string
}

export type AddTodolistActionType = {
  type: 'ADD_TODOLIST'
  title: string
  todolistId: string
}

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE'
  id: string
  title: string
}

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER'
  id: string
  filter: FilterValuesType
}

type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistsReducer = (
  state: Array<TodolistType>,
  action: ActionTypes,
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id)

    case 'ADD_TODOLIST':
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
      ]

    case 'CHANGE_TODOLIST_TITLE': {
      const todolist = state.find((tl) => tl.id === action.id)
      todolist && (todolist.title = action.title)

      return todolist ? [...state, todolist] : state
    }

    case 'CHANGE_TODOLIST_FILTER': {
      const todolist = state.find((tl) => tl.id === action.id)
      todolist && (todolist.filter = action.filter)

      return todolist ? [...state, todolist] : state
    }

    default:
      // return state
      throw new Error('An incorrect action type')
  }
}

export const removeTodolistAC = (
  todolistId: string,
): RemoveTodolistActionType => {
  return {
    type: 'REMOVE_TODOLIST',
    id: todolistId,
  }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD_TODOLIST',
    title: title,
    todolistId: v1(),
  }
}

export const changeTodolistTitleAC = (
  id: string,
  title: string,
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    id,
    title,
  }
}

export const changeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType,
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    id,
    filter,
  }
}
