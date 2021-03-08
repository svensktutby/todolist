/* eslint-disable import/no-cycle */
import { ThunkType } from './store';
/* eslint-enable import/no-cycle */

import { todolistsAPI } from '../api/todolistsApi';

export enum ActionType {
  SET_STATUS = 'TL/APP/SET_STATUS',
  SET_ERROR = 'TL/APP/SET_ERROR',
}

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppStateType = {
  status: 'idle',
  error: null,
};

export const appReducer = (
  state = initialState,
  action: ActionsType,
): AppStateType => {
  switch (action.type) {
    case ActionType.SET_STATUS:
      return { ...state, status: action.payload.status };

    case ActionType.SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

/** Actions */
export const setStatusAC = (status: StatusType) =>
  ({
    type: ActionType.SET_STATUS,
    payload: {
      status,
    },
  } as const);

export const setErrorAC = (error: null | string) =>
  ({
    type: ActionType.SET_ERROR,
    error,
  } as const);

/** Thunks */

/** Types */
export type AppStateType = {
  status: StatusType;
  error: null | string;
};

type ActionsType =
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof setErrorAC>;
