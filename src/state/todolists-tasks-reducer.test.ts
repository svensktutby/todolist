import { TasksStateType, TodolistType } from '../App';
import { addTodolistAC, todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

test('ids should be equal', () => {
  const startTasksState: TasksStateType = {};
  const startTodoListsState: Array<TodolistType> = [];

  const action = addTodolistAC('new todolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodoListsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
