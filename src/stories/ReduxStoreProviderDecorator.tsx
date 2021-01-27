import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { v1 } from 'uuid';

import { AppRootStateType } from '../state/store';
import { tasksReducer } from '../state/tasks-reducer';
import { todolistsReducer } from '../state/todolists-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    todolistId1: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],
    todolistId2: [
      { id: v1(), title: 'Beer', isDone: true },
      { id: v1(), title: 'Cheese', isDone: true },
      { id: v1(), title: 'Sausage', isDone: false },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType,
);

export const ReduxStoreProviderDecorator = (
  storyFn: () => React.ReactNode,
): JSX.Element => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
