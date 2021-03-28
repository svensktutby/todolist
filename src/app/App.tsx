import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  AppBar,
  Button,
  CircularProgress,
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
import { initializeAppAsync, RequestStatusType } from './appReducer';
import { Login } from '../features/Login/Login';
import { logoutAsync } from '../features/Login/authReducer';

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
  circularProgressWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
}));

export type AppPropsType = {
  demo?: boolean;
};

export const App: FC<AppPropsType> = ({ demo = false }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppAsync());
  }, [dispatch]);

  const status = useTypedSelector<RequestStatusType>(
    (state) => state.app.status,
  );

  const isInitialized = useTypedSelector<boolean>(
    (state) => state.app.isInitialized,
  );

  const isLoggedIn = useTypedSelector<boolean>(
    (state) => state.auth.isLoggedIn,
  );

  const logoutHandler = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className={classes.circularProgressWrapper}>
        <CircularProgress size={160} />
      </div>
    );
  }

  return (
    <Router>
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
              Todolist
            </Typography>

            {isLoggedIn && (
              <Button color="inherit" onClick={logoutHandler}>
                Log out
              </Button>
            )}
          </Toolbar>

          {status === 'loading' && (
            <LinearProgress className={classes.linearProgress} />
          )}
        </AppBar>
        <Container fixed>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <TodolistsList demo={demo} />}
            />
            <Route path="/login" render={() => <Login />} />

            <Route path="/404" render={() => <h1>404: PAGE NOT FOUND</h1>} />
            <Redirect from="*" to="/404" />
          </Switch>
        </Container>
        <ErrorSnackbar />
      </div>
    </Router>
  );
};
