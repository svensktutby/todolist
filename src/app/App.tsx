import React, { FC } from 'react';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { RequestStatusType } from './appReducer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: '"Roboto", sans-serif',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  linearProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export const App: FC = () => {
  const classes = useStyles();

  const status = useTypedSelector<RequestStatusType>(
    (state) => state.app.status,
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>

        {status === 'loading' && (
          <LinearProgress className={classes.linearProgress} />
        )}
      </AppBar>
      <Container fixed>
        <TodolistsList />
        <ErrorSnackbar />
      </Container>
    </div>
  );
};
