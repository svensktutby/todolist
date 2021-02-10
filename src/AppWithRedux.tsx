import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import './App.css';
import { Todolist, TasksStateType } from './Todolist';
import { AddItemForm } from './AddItemForm';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistDomainType,
} from './state/todolistsReducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './state/tasks-reducer';
import { AppRootStateType } from './state/store';
import { TaskStatus } from './api/todolistsApi';

export const AppWithRedux: FC = () => {
  console.log('AppWithRedux is called');
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks,
  );

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskAC(taskId, todolistId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatus, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskId, status, todolistId));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskId, title, todolistId));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (filter: FilterValuesType, id: string) => {
      dispatch(changeTodolistFilterAC(filter, id));
    },
    [dispatch],
  );

  const removeTodoList = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistAC(todolistId));
    },
    [dispatch],
  );

  const changeTodoListTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleAC(id, title));
    },
    [dispatch],
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch],
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: 20 }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => {
            const tasksForTodolist = tasks[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: 10 }}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
