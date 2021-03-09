import { Dispatch } from 'redux';

import { setAppErrorAC, setAppStatusAC } from '../app/appReducer';

export const handleServerAppError = (
  messages: Array<string>,
  dispatch: ErrorUtilsDispatchType,
): void => {
  if (messages.length) {
    dispatch(setAppErrorAC(messages[0]));
  } else {
    dispatch(setAppErrorAC('Sorry, an unknown error occurred'));
  }
  dispatch(setAppStatusAC('failed'));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType,
): void => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppStatusAC('failed'));
};

type ErrorUtilsDispatchType = Dispatch<
  ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
>;
