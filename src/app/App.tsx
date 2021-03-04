import React, { FC } from 'react';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';

import './App.css';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

const useStyles = makeStyles(() => ({
  AppBar: {
    position: 'relative',
  },
  LinearProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

export const App: FC = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <LinearProgress className={classes.LinearProgress} />
      </AppBar>
      <Container fixed>
        <TodolistsList />
      </Container>
    </div>
  );
};
