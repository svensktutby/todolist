import React, { FC, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setAppErrorAC } from '../../app/appReducer';

const Alert: FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const ErrorSnackbar: FC = () => {
  const dispatch = useDispatch();

  const error = useTypedSelector<null | string>((state) => state.app.error);

  const isOpen = error !== null;

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
