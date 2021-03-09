import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { TaskStatus, TaskType } from '../../../api/todolistsApi';
import { FilterValuesType, TodolistDomainType } from '../todolistsReducer';
import { fetchTasksAsync } from '../tasksReducer';

const useStyles = makeStyles(() => ({
  todoListTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  removeTodoListButton: {
    marginLeft: 'auto',
  },
  taskList: {
    paddingLeft: 0,
    listStyleType: 'none',
  },
  buttonGroupWrapper: {
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
  },
  button: {
    flexGrow: 1,
  },
}));

type TodolistPropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  demo?: boolean;
  removeTodoList: (todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filterValue: FilterValuesType, todolistId: string) => void;
  changeStatus: (
    taskId: string,
    status: TaskStatus,
    todolistId: string,
  ) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const Todolist: FC<TodolistPropsType> = React.memo(
  ({ demo = false, ...props }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
      if (!demo) dispatch(fetchTasksAsync(props.todolist.id));
    }, [dispatch, demo, props.todolist.id]);

    const addTask = useCallback(
      (title: string) => {
        props.addTask(title, props.todolist.id);
      },
      [props],
    );
    const removeTodoListHandler = useCallback(
      () => props.removeTodoList(props.todolist.id),
      [props],
    );

    const changeTodoListTitle = useCallback(
      (title: string) => {
        props.changeTodoListTitle(props.todolist.id, title);
      },
      [props],
    );

    const allClickHandler = useCallback(
      () => props.changeFilter('all', props.todolist.id),
      [props],
    );
    const activeClickHandler = useCallback(
      () => props.changeFilter('active', props.todolist.id),
      [props],
    );
    const completedClickHandler = useCallback(
      () => props.changeFilter('completed', props.todolist.id),
      [props],
    );

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
      tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatus.New);
    }

    if (props.todolist.filter === 'completed') {
      tasksForTodolist = props.tasks.filter(
        (t) => t.status === TaskStatus.Completed,
      );
    }

    const tasks = tasksForTodolist.map((t) => {
      return (
        <Task
          key={t.id}
          task={t}
          todolistId={props.todolist.id}
          removeTask={props.removeTask}
          changeTaskTitle={props.changeTaskTitle}
          changeStatus={props.changeStatus}
        />
      );
    });

    return (
      <div>
        <Typography variant="h6" className={classes.todoListTitle}>
          <EditableSpan
            value={props.todolist.title}
            onChange={changeTodoListTitle}
          />
          <IconButton
            onClick={removeTodoListHandler}
            className={classes.removeTodoListButton}
            disabled={props.todolist.entityStatus === 'loading'}
          >
            <Delete />
          </IconButton>
        </Typography>
        <AddItemForm
          addItem={addTask}
          disabled={props.todolist.entityStatus === 'loading'}
        />
        <ul className={classes.taskList}>{tasks}</ul>
        <div className={classes.buttonGroupWrapper}>
          <ButtonGroup
            size="small"
            color="primary"
            className={classes.buttonGroup}
          >
            <Button
              variant={
                props.todolist.filter === 'all' ? 'contained' : 'outlined'
              }
              onClick={allClickHandler}
              className={classes.button}
            >
              All
            </Button>
            <Button
              variant={
                props.todolist.filter === 'active' ? 'contained' : 'outlined'
              }
              onClick={activeClickHandler}
              className={classes.button}
            >
              Active
            </Button>
            <Button
              variant={
                props.todolist.filter === 'completed' ? 'contained' : 'outlined'
              }
              onClick={completedClickHandler}
              className={classes.button}
            >
              Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  },
);
