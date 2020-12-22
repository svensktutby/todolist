import React, { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@material-ui/icons';
import { Button, ButtonGroup, Checkbox, IconButton } from '@material-ui/core';

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todoListID: string) => void;
  addTask: (title: string, todoListID: string) => void;
  removeTask: (taskId: string, todoListID: string) => void;
  changeFilter: (filterValue: FilterValuesType, todoListID: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void;
  changeTaskTitle: (taskID: string, title: string, todoListID: string) => void;
  changeTodoListTitle: (todoListID: string, title: string) => void;
};

export function Todolist(props: TodolistPropsType) {
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
      <li key={t.id} className={t.isDone ? 'is-done' : ''}>
        <Checkbox
          color="primary"
          onChange={statusTaskHandler}
          checked={t.isDone}
        />{' '}
        <EditableSpan value={t.title} getNewTitle={changeTaskTitle} />
        <IconButton onClick={removeTaskHandler}>
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
      <h3>
        <EditableSpan value={props.title} getNewTitle={changeTodoListTitle} />
        <IconButton onClick={removeTodoListHandler}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>{taskItems}</ul>
      <div style={{ textAlign: 'center' }}>
        <ButtonGroup size="small" color="primary">
          <Button
            variant={props.filter === 'all' ? 'contained' : 'outlined'}
            onClick={allClickHandler}
          >
            All
          </Button>
          <Button
            variant={props.filter === 'active' ? 'contained' : 'outlined'}
            onClick={activeClickHandler}
          >
            Active
          </Button>
          <Button
            variant={props.filter === 'completed' ? 'contained' : 'outlined'}
            onClick={completedClickHandler}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
