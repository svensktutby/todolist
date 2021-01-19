import React, { ChangeEvent, FC } from 'react';
import { Delete } from '@material-ui/icons';
import { Button, ButtonGroup, Checkbox, IconButton } from '@material-ui/core';

import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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

export const Todolist: FC<TodolistPropsType> = (props) => {
  const removeTodoListHandler = () => props.removeTodoList(props.id);
  const allClickHandler = () => props.changeFilter('all', props.id);
  const activeClickHandler = () => props.changeFilter('active', props.id);
  const completedClickHandler = () => props.changeFilter('completed', props.id);
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const taskItems = props.tasks.map((t) => {
    const removeTaskHandler = () => {
      props.removeTask(t.id, props.id);
    };
    const statusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(t.id, e.currentTarget.checked, props.id);
    };
    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(t.id, title, props.id);
    };

    return (
      <li
        key={t.id}
        className={t.isDone ? 'is-done' : ''}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Checkbox
          color="primary"
          onChange={statusTaskHandler}
          checked={t.isDone}
        />
        <EditableSpan value={t.title} getNewTitle={changeTaskTitle} />
        <IconButton onClick={removeTaskHandler} style={{ marginLeft: 'auto' }}>
          <Delete />
        </IconButton>
      </li>
    );
  });

  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(props.id, title);
  };

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
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{taskItems}</ul>
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
};
