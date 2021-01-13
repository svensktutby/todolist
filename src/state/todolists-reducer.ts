import { FilterValuesType, TodolistType } from '../AppWithRedux'
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

const initialState: Array<TodolistType> = []

export const todolistsReducer = (
  state = initialState,
  action: ActionTypes,
): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id)

    case 'ADD_TODOLIST':
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
        ...state,
      ]

    case 'CHANGE_TODOLIST_TITLE': {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      )
    }

    case 'CHANGE_TODOLIST_FILTER': {
      const todolist = state.find((tl) => tl.id === action.id)
      todolist && (todolist.filter = action.filter)

      return [...state]
    }

    default:
      return state
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
  filter: FilterValuesType,
  id: string,
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    filter,
    id,
  }
}
