import { v1 } from 'uuid';
import { TodolistType } from '../api/todolistsApi';

export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD_TODOLIST';
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE';
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER';
  id: string;
  filter: FilterValuesType;
};

type ActionTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state = initialState,
  action: ActionTypes,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter((tl) => tl.id !== action.id);

    case 'ADD_TODOLIST':
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
          addedDate: '',
          order: 0,
        },
        ...state,
      ];

    case 'CHANGE_TODOLIST_TITLE': {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl,
      );
    }

    case 'CHANGE_TODOLIST_FILTER': {
      return state.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl,
      );
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (
  todolistId: string,
): RemoveTodolistActionType => {
  return {
    type: 'REMOVE_TODOLIST',
    id: todolistId,
  };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD_TODOLIST',
    title,
    todolistId: v1(),
  };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string,
): ChangeTodolistTitleActionType => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    id,
    title,
  };
};

export const changeTodolistFilterAC = (
  filter: FilterValuesType,
  id: string,
): ChangeTodolistFilterActionType => {
  return {
    type: 'CHANGE_TODOLIST_FILTER',
    filter,
    id,
  };
};
