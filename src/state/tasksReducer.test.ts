import {
  addTaskAC,
  updateTaskAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer,
  TasksStateType,
} from './tasksReducer';
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
  TodolistDomainType,
} from './todolistsReducer';
import { TaskPriority, TaskStatus, TaskType } from '../api/todolistsApi';

const todolistId1 = 'todolistId1';
const todolistId2 = 'todolistId2';

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    [todolistId1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatus.New,
        todoListId: todolistId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: todolistId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatus.New,
        todoListId: todolistId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
    [todolistId2]: [
      {
        id: '1',
        title: 'beer',
        status: TaskStatus.New,
        todoListId: todolistId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: '2',
        title: 'cheese',
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: '3',
        title: 'sausage',
        status: TaskStatus.New,
        todoListId: todolistId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
  };
});

it('correct task should be deleted from correct array', () => {
  const action = removeTaskAC('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1).toHaveLength(3);
  expect(endState.todolistId2).toHaveLength(2);
  expect(endState.todolistId2.every((t) => t.id !== '2')).toBeTruthy();
});

it('correct task should be added from correct array', () => {
  const task: TaskType = {
    id: 'id exists',
    title: 'whisky',
    status: TaskStatus.New,
    todoListId: 'todolistId2',
    description: '',
    startDate: '',
    deadline: '',
    addedDate: '',
    order: 0,
    priority: TaskPriority.Low,
  };

  const action = addTaskAC(task);

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId1).toHaveLength(3);
  expect(endState.todolistId2).toHaveLength(4);
  expect(endState.todolistId2[0].id).toBeDefined();
  expect(endState.todolistId2[0].title).toBe('whisky');
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New);
});

it('status of specified task should be changed', () => {
  const action = updateTaskAC('2', { status: TaskStatus.New }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].status).toBe(TaskStatus.New);
  expect(endState.todolistId1[1].status).toBe(TaskStatus.Completed);
  expect(startState.todolistId2[1] === endState.todolistId2[1]).toBeFalsy();
});

it('title of specified task should be changed', () => {
  const action = updateTaskAC('2', { title: 'parmesan' }, 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState.todolistId2[1].title).toBe('parmesan');
  expect(endState.todolistId1[1].title).not.toBe('parmesan');
  expect(startState.todolistId2 === endState.todolistId2).toBeFalsy();
  expect(endState.todolistId2).toHaveLength(3);
});

it('new property with new array should be added when new todolist is added', () => {
  const todolist: TodolistDomainType = {
    id: 'id exists',
    title: 'New Todolist',
    addedDate: '',
    order: 0,
    filter: 'all',
  };

  const action = addTodolistAC(todolist);

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw new Error('new key should be added');
  }

  expect(keys).toHaveLength(3);
  expect(endState[newKey]).toEqual([]);
});

it('property with todolistId should be deleted', () => {
  const action = removeTodolistAC('todolistId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys).toHaveLength(1);
  expect(endState.todolistId2).toBeUndefined();
});

it('empty arrays should be added when we set todolists', () => {
  const action = setTodolistsAC([
    { id: '1', title: 'title 1', addedDate: '', order: 0 },
    { id: '2', title: 'title 2', addedDate: '', order: 0 },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys).toHaveLength(2);
  expect(endState['1']).toStrictEqual([]);
  expect(endState['2']).toStrictEqual([]);
});

it('tasks should be added for todolist', () => {
  const action = setTasksAC(startState[todolistId1], todolistId1);

  const endState = tasksReducer(
    {
      [todolistId1]: [],
      [todolistId2]: [],
    },
    action,
  );

  expect(endState[todolistId1]).toHaveLength(3);
  expect(endState[todolistId2]).toHaveLength(0);
});
