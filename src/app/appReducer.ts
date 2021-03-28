/* eslint-disable import/no-cycle */
import { ThunkType } from './store';
import {
  handleServerAppError,
  handleServerNetworkError,
} from '../utils/errorUtils';
import { setIsLoggedInAC } from '../features/Login/authReducer';
/* eslint-enable import/no-cycle */
import { authAPI, ResultCode } from '../api/todolistsApi';

export enum ActionType {
  SET_STATUS = 'TL/APP/SET_STATUS',
  SET_ERROR = 'TL/APP/SET_ERROR',
  SET_INITIALIZED = 'TL/APP/SET_INITIALIZED',
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState: AppStateType = {
  status: 'idle',
  error: null,
  isInitialized: false,
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

    case ActionType.SET_INITIALIZED:
      return { ...state, isInitialized: action.payload.value };

    default:
      return state;
  }
};

/** Actions */
export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: ActionType.SET_STATUS,
    payload: {
      status,
    },
  } as const);

export const setAppErrorAC = (error: null | string) =>
  ({
    type: ActionType.SET_ERROR,
    error,
  } as const);

export const setAppInitializedAC = (value: boolean) =>
  ({
    type: ActionType.SET_INITIALIZED,
    payload: {
      value,
    },
  } as const);

/** Thunks */
export const initializeAppAsync = (): ThunkType<ActionsType> => async (
  dispatch,
) => {
  try {
    const {
      data: { resultCode, messages },
    } = await authAPI.me();

    if (resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC(true));
    } else {
      handleServerAppError(messages, dispatch);
    }
    dispatch(setAppInitializedAC(true));
  } catch (error) {
    handleServerNetworkError(error, dispatch);
  }
};

/** Types */
export type AppStateType = {
  status: RequestStatusType;
  error: null | string;
  isInitialized: boolean;
};

type ActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInitializedAC>
  | ReturnType<typeof setIsLoggedInAC>;
