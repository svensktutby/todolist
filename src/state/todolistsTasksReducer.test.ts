import {
  addTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolistsReducer';
import { tasksReducer, TasksStateType } from './tasksReducer';

it('ids should be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodolistDomainType> = [];

  const todolist: TodolistDomainType = {
    id: 'id exists',
    title: 'New Todolist',
    addedDate: '',
    order: 0,
    filter: 'all',
  };

  const action = addTodolistAC(todolist);

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
