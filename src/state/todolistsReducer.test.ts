import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolistsReducer';

const todolistId1 = 'todolistId1';
const todolistId2 = 'todolistId2';

let startState: Array<TodolistDomainType>;

beforeEach(() => {
  startState = [
    {
      id: todolistId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
    {
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
  ];
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(
    startState,
    addTodolistAC(newTodolistTitle),
  );

  expect(endState).toHaveLength(3);
  expect(endState[0].title).toBe(newTodolistTitle);
  expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todolist';

  const endState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId2, newTodolistTitle),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
  expect(endState).toHaveLength(2);
});

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterValuesType = 'completed';

  const endState = todolistsReducer(
    startState,
    changeTodolistFilterAC(newFilter, todolistId2),
  );

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
  expect(endState).toHaveLength(2);
});
