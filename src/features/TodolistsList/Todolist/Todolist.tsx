import React, { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { TaskStatus, TaskType } from '../../../api/todolistsApi';
import { FilterValuesType } from '../todolistsReducer';
import { fetchTasksAsync } from '../tasksReducer';

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
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

const useStyles = makeStyles(() => ({
  TodoListTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  TodoListTitleIconButton: {
    marginLeft: 'auto',
  },
  TaskList: {
    paddingLeft: 0,
    listStyleType: 'none',
  },
  ButtonGroupWrapper: {
    textAlign: 'center',
  },
  ButtonGroup: {
    display: 'flex',
  },
  Button: {
    flexGrow: 1,
  },
}));

export const Todolist: FC<TodolistPropsType> = React.memo((props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksAsync(props.id));
  }, [dispatch, props.id]);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props],
  );
  const removeTodoListHandler = useCallback(
    () => props.removeTodoList(props.id),
    [props],
  );

  const changeTodoListTitle = useCallback(
    (title: string) => {
      props.changeTodoListTitle(props.id, title);
    },
    [props],
  );

  const allClickHandler = useCallback(
    () => props.changeFilter('all', props.id),
    [props],
  );
  const activeClickHandler = useCallback(
    () => props.changeFilter('active', props.id),
    [props],
  );
  const completedClickHandler = useCallback(
    () => props.changeFilter('completed', props.id),
    [props],
  );

  let tasksForTodolist = props.tasks;

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatus.New);
  }

  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatus.Completed,
    );
  }

  const tasks = tasksForTodolist.map((t) => {
    return (
      <Task
        key={t.id}
        task={t}
        todolistId={props.id}
        removeTask={props.removeTask}
        changeTaskTitle={props.changeTaskTitle}
        changeStatus={props.changeStatus}
      />
    );
  });

  return (
    <div>
      <Typography variant="h6" className={classes.TodoListTitle}>
        <EditableSpan value={props.title} onChange={changeTodoListTitle} />
        <IconButton
          onClick={removeTodoListHandler}
          className={classes.TodoListTitleIconButton}
        >
          <Delete />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask} />
      <ul className={classes.TaskList}>{tasks}</ul>
      <div className={classes.ButtonGroupWrapper}>
        <ButtonGroup
          size="small"
          color="primary"
          className={classes.ButtonGroup}
        >
          <Button
            variant={props.filter === 'all' ? 'contained' : 'outlined'}
            onClick={allClickHandler}
            className={classes.Button}
          >
            All
          </Button>
          <Button
            variant={props.filter === 'active' ? 'contained' : 'outlined'}
            onClick={activeClickHandler}
            className={classes.Button}
          >
            Active
          </Button>
          <Button
            variant={props.filter === 'completed' ? 'contained' : 'outlined'}
            onClick={completedClickHandler}
            className={classes.Button}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
