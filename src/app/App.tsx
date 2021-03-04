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
import { Menu } from '@material-ui/icons';

import './App.css';
import { TodolistsList } from '../features/TodolistsList/TodolistsList';

const styles = {
  AppBar: {
    position: 'relative',
  } as const,
  LinearProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  } as const,
};

export const App: FC = () => {
  return (
    <div className="App">
      <AppBar position="static" style={styles.AppBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        <LinearProgress style={styles.LinearProgress} />
      </AppBar>
      <Container fixed>
        <TodolistsList />
      </Container>
    </div>
  );
};
