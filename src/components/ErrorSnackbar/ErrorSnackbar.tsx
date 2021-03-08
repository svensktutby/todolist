import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setErrorAC } from '../../app/appReducer';

const Alert: FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const ErrorSnackbar: FC = () => {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const error = useTypedSelector<null | string>((state) => state.app.error);

  const isOpen = error !== null;

  const handleClose = () => {
    dispatch(setErrorAC(error));
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
};
