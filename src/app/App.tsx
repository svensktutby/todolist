import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
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
import { Login } from '../features/Login/Login';

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

export type AppPropsType = {
  demo?: boolean;
};

export const App: FC<AppPropsType> = ({ demo = false }) => {
  const classes = useStyles();

  const status = useTypedSelector<RequestStatusType>(
    (state) => state.app.status,
  );

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
            <Button color="inherit">Login</Button>
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
