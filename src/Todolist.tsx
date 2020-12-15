import React, { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
        <input
          type="checkbox"
          onChange={statusTaskHandler}
          checked={t.isDone}
        />{' '}
        <EditableSpan value={t.title} getNewTitle={changeTaskTitle} />
        <button onClick={removeTaskHandler}>x</button>
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
        <button onClick={removeTodoListHandler}>x</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>{taskItems}</ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={allClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={activeClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={completedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
