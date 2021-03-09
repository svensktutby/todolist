/* eslint-disable import/no-cycle */
import { ThunkType } from '../../app/store';
/* eslint-enable import/no-cycle */

import { ResultCode, todolistsAPI, TodolistType } from '../../api/todolistsApi';
import { RequestStatusType, setAppStatusAC } from '../../app/appReducer';

export enum ActionType {
  REMOVE_TODOLIST = 'TL/TODOLISTS/REMOVE_TODOLIST',
  ADD_TODOLIST = 'TL/TODOLISTS/ADD_TODOLIST',
  CHANGE_TODOLIST_TITLE = 'TL/TODOLISTS/CHANGE_TODOLIST_TITLE',
  CHANGE_TODOLIST_FILTER = 'TL/TODOLISTS/CHANGE_TODOLIST_FILTER',
  CHANGE_TODOLIST_ENTITY_STATUS = 'TL/TODOLISTS/CHANGE_TODOLIST_ENTITY_STATUS',
  SET_TODOLISTS = 'TL/TODOLISTS/SET_TODOLISTS',
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state = initialState,
  action: ActionsType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case ActionType.REMOVE_TODOLIST:
      return state.filter((tl) => tl.id !== action.payload.id);

    case ActionType.ADD_TODOLIST:
      return [
        {
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        },
        ...state,
      ];

    case ActionType.CHANGE_TODOLIST_TITLE:
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, title: action.payload.title }
          : tl,
      );

    case ActionType.CHANGE_TODOLIST_FILTER:
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, filter: action.payload.filter }
          : tl,
      );

    case ActionType.CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, entityStatus: action.payload.status }
          : tl,
      );

    case ActionType.SET_TODOLISTS:
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle',
      }));

    default:
      return state;
  }
};

/** Actions */
export const removeTodolistAC = (id: string) =>
  ({
    type: ActionType.REMOVE_TODOLIST,
    payload: {
      id,
    },
  } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({
    type: ActionType.ADD_TODOLIST,
    payload: {
      todolist,
    },
  } as const);

export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: ActionType.CHANGE_TODOLIST_TITLE,
    payload: {
      id,
      title,
    },
  } as const);

export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) =>
  ({
    type: ActionType.CHANGE_TODOLIST_FILTER,
    payload: {
      id,
      filter,
    },
  } as const);

export const changeTodolistEntityStatusAC = (
  id: string,
  status: RequestStatusType,
) =>
  ({
    type: ActionType.CHANGE_TODOLIST_ENTITY_STATUS,
    payload: {
      id,
      status,
    },
  } as const);

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({
    type: ActionType.SET_TODOLISTS,
    payload: {
      todolists,
    },
  } as const);

/** Thunks */
export const fetchTodolistsAsync = (): ThunkType<ActionsType> => async (
  dispatch,
) => {
  dispatch(setAppStatusAC('loading'));

  const { status, data } = await todolistsAPI.getTodolists();

  if (status === 200) {
    dispatch(setTodolistsAC(data));
    dispatch(setAppStatusAC('succeeded'));
  }
};

export const removeTodolistAsync = (
  todolistId: string,
): ThunkType<ActionsType> => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));

  const {
    data: { resultCode },
  } = await todolistsAPI.deleteTodolist(todolistId);

  if (resultCode === ResultCode.Success) {
    dispatch(removeTodolistAC(todolistId));
    dispatch(setAppStatusAC('succeeded'));
  }
};

export const addTodolistAsync = (
  title: string,
): ThunkType<ActionsType> => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));

  const {
    data: { resultCode, data },
  } = await todolistsAPI.createTodolist(title);

  if (resultCode === ResultCode.Success) {
    dispatch(addTodolistAC(data.item));
    dispatch(setAppStatusAC('succeeded'));
  }
};

export const changeTodolistTitleAsync = (
  id: string,
  title: string,
): ThunkType<ActionsType> => async (dispatch) => {
  const {
    data: { resultCode },
  } = await todolistsAPI.updateTodolistTitle(id, title);

  if (resultCode === ResultCode.Success) {
    dispatch(changeTodolistTitleAC(id, title));
  }
};

/** Types */
type ActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ReturnType<typeof setAppStatusAC>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
