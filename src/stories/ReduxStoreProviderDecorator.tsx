import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { v1 } from 'uuid';

import { AppRootStateType } from '../app/store';
import { tasksReducer } from '../features/TodolistsList/tasksReducer';
import { todolistsReducer } from '../features/TodolistsList/todolistsReducer';
import { TaskPriority, TaskStatus } from '../api/todolistsApi';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const todolistId1 = v1();
const todolistId2 = v1();

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
  ],
  tasks: {
    [todolistId1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
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
        id: v1(),
        title: 'JS',
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
        id: v1(),
        title: 'Beer',
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
        id: v1(),
        title: 'Cheese',
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
        id: v1(),
        title: 'Sausage',
        status: TaskStatus.Completed,
        todoListId: todolistId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
  },
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (
  storyFn: () => React.ReactNode,
): JSX.Element => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
