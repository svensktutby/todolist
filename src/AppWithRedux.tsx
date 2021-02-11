import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import {
  addTodolistAsync,
  changeTodolistFilterAC,
  changeTodolistTitleAsync,
  fetchTodolistsAsync,
  FilterValuesType,
  removeTodolistAsync,
  TodolistDomainType,
} from './state/todolistsReducer';
import {
  addTaskAsync,
  removeTaskAsync,
  TasksStateType,
  updateTaskAsync,
} from './state/tasksReducer';
import { TaskStatus } from './api/todolistsApi';
import { useTypedSelector } from './hooks/useTypedSelector';

export const AppWithRedux: FC = () => {
  const todolists = useTypedSelector<Array<TodolistDomainType>>(
    (state) => state.todolists,
  );
  const tasks = useTypedSelector<TasksStateType>((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsAsync());
  }, [dispatch]);

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskAsync(taskId, todolistId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAsync(title, todolistId));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    (taskId: string, status: TaskStatus, todolistId: string) => {
      dispatch(updateTaskAsync(taskId, { status }, todolistId));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (taskId: string, title: string, todolistId: string) => {
      dispatch(updateTaskAsync(taskId, { title }, todolistId));
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
      dispatch(removeTodolistAsync(todolistId));
    },
    [dispatch],
  );

  const changeTodoListTitle = useCallback(
    (id: string, title: string) => {
      dispatch(changeTodolistTitleAsync(id, title));
    },
    [dispatch],
  );

  const addTodoList = useCallback(
    (title: string) => {
      dispatch(addTodolistAsync(title));
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
