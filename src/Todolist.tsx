import React, { FC, useCallback } from 'react';
import { Delete } from '@material-ui/icons';
import { Button, ButtonGroup, IconButton } from '@material-ui/core';

import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filterValue: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
  changeTodoListTitle: (todolistId: string, title: string) => void;
};

export const Todolist: FC<TodolistPropsType> = React.memo((props) => {
  console.log('Todolist is called');
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
    tasksForTodolist = props.tasks.filter((t) => !t.isDone);
  }

  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.isDone);
  }

  const tasks = tasksForTodolist.map((t) => {
    return (
      <Task
        key={t.id}
        taskId={t.id}
        title={t.title}
        isDone={t.isDone}
        todolistId={props.id}
        removeTask={props.removeTask}
        changeTaskTitle={props.changeTaskTitle}
        changeStatus={props.changeStatus}
      />
    );
  });

  return (
    <div>
      <h3 style={{ display: 'flex', alignItems: 'center' }}>
        <EditableSpan value={props.title} getNewTitle={changeTodoListTitle} />
        <IconButton
          onClick={removeTodoListHandler}
          style={{ marginLeft: 'auto' }}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{tasks}</ul>
      <div style={{ textAlign: 'center' }}>
        <ButtonGroup size="small" color="primary" style={{ display: 'flex' }}>
          <Button
            variant={props.filter === 'all' ? 'contained' : 'outlined'}
            onClick={allClickHandler}
            style={{ flexGrow: 1 }}
          >
            All
          </Button>
          <Button
            variant={props.filter === 'active' ? 'contained' : 'outlined'}
            onClick={activeClickHandler}
            style={{ flexGrow: 1 }}
          >
            Active
          </Button>
          <Button
            variant={props.filter === 'completed' ? 'contained' : 'outlined'}
            onClick={completedClickHandler}
            style={{ flexGrow: 1 }}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
});
