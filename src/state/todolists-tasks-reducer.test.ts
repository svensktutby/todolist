import {
  addTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolistsReducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../Todolist';

test('ids should be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC('new todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
