/* eslint-disable import/no-cycle */
import { ThunkType } from '../../app/store';
/* eslint-enable import/no-cycle */

import {
  handleServerAppError,
  handleServerNetworkError,
} from '../../utils/errorUtils';
import { LoginValuesType, authAPI, ResultCode } from '../../api/todolistsApi';
import { setAppStatusAC } from '../../app/appReducer';

export enum ActionType {
  SET_IS_LOGGED_IN = 'TL/LOGIN/SET_IS_LOGGED_IN',
}

const initialState: AuthStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state = initialState,
  action: ActionsType,
): AuthStateType => {
  switch (action.type) {
    case ActionType.SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.value,
      };

    default:
      return state;
  }
};

/** Actions */
export const setIsLoggedInAC = (value: boolean) =>
  ({
    type: ActionType.SET_IS_LOGGED_IN,
    payload: {
      value,
    },
  } as const);

/** Thunks */
export const loginAsync = (
  loginValues: LoginValuesType,
): ThunkType<ActionsType> => async (dispatch) => {
  dispatch(setAppStatusAC('loading'));

  try {
    const {
      data: { resultCode, messages },
    } = await authAPI.login(loginValues);

    if (resultCode === ResultCode.Success) {
      dispatch(setIsLoggedInAC(true));
      dispatch(setAppStatusAC('succeeded'));
    } else {
      handleServerAppError(messages, dispatch);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
  }
};

/** Types */
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setAppStatusAC>;

export type AuthStateType = {
  isLoggedIn: boolean;
};
