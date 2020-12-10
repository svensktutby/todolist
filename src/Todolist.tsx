import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType, TaskType } from './App';

type TodolistPropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  addTask: (title: string, todoListID: string) => void;
  removeTask: (taskId: string, todoListID: string) => void;
  changeFilter: (filterValue: FilterValuesType, todoListID: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void;
  removeTodoList: (todoListID: string) => void;
};

export function Todolist({
  id,
  title,
  tasks,
  removeTask,
  addTask,
  changeFilter,
  changeStatus,
  filter,
  removeTodoList,
}: TodolistPropsType) {
  const [taskTitle, setTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const removeTodoListHandler = () => removeTodoList(id);
  const allClickHandler = () => changeFilter('all', id);
  const activeClickHandler = () => changeFilter('active', id);
  const completedClickHandler = () => changeFilter('completed', id);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTaskTitle(e.currentTarget.value);
  };

  const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTaskItem();
  };

  const addTaskItem = () => {
    const trimmedTask = taskTitle.trim();
    if (trimmedTask !== '') {
      addTask(trimmedTask, id);
    } else {
      setError('Title is required!');
    }
    setTaskTitle('');
  };

  const taskItems = tasks.map((t) => {
    const removeTaskHandler = () => removeTask(t.id, id);
    const statusTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeStatus(t.id, e.currentTarget.checked, id);
    };

    return (
      <li key={t.id} className={t.isDone ? 'is-done' : ''}>
        <input
          type="checkbox"
          onChange={statusTaskHandler}
          checked={t.isDone}
        />{' '}
        <span>{t.title}</span>
        <button onClick={removeTaskHandler}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>
        <span>{title}</span>
        <button onClick={removeTodoListHandler}>x</button>
      </h3>
      <div>
        <input
          className={error ? 'error' : ''}
          value={taskTitle}
          onChange={changeHandler}
          onKeyPress={keyPressHandler}
        />
        <button onClick={addTaskItem}>+</button>

        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>{taskItems}</ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={allClickHandler}
        >
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={activeClickHandler}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={completedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
