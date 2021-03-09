import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  addTodolistAsync,
  changeTodolistFilterAC,
  changeTodolistTitleAsync,
  fetchTodolistsAsync,
  FilterValuesType,
  removeTodolistAsync,
  TodolistDomainType,
} from './todolistsReducer';
import {
  addTaskAsync,
  removeTaskAsync,
  TasksStateType,
  updateTaskAsync,
} from './tasksReducer';
import { TaskStatus } from '../../api/todolistsApi';
import { AddItemForm } from '../../components/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';

const useStyles = makeStyles((theme: Theme) => ({
  addTodoListContainer: {
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

type TodolistsListPropsType = {
  demo?: boolean;
};

export const TodolistsList: FC<TodolistsListPropsType> = ({ demo = false }) => {
  const classes = useStyles();

  const todolists = useTypedSelector<Array<TodolistDomainType>>(
    (state) => state.todolists,
  );
  const tasks = useTypedSelector<TasksStateType>((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!demo) dispatch(fetchTodolistsAsync());
  }, [dispatch, demo]);

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
    <>
      <Grid container className={classes.addTodoListContainer}>
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <Grid container spacing={3}>
        {todolists.map((tl) => {
          const tasksForTodolist = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper className={classes.paper}>
                <Todolist
                  todolist={tl}
                  demo={demo}
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
    </>
  );
};
