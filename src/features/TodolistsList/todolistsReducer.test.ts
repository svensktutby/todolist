import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  setTodolistsAC,
  TodolistDomainType,
  todolistsReducer,
} from './todolistsReducer';

describe('todolists reducer', () => {
  const todolistId1 = 'todolistId1';
  const todolistId2 = 'todolistId2';

  let startState: Array<TodolistDomainType>;

  beforeEach(() => {
    startState = [
      {
        id: todolistId1,
        title: 'What to learn',
        addedDate: '',
        order: 0,
        filter: 'all',
        entityStatus: 'idle',
      },
      {
        id: todolistId2,
        title: 'What to buy',
        addedDate: '',
        order: 0,
        filter: 'all',
        entityStatus: 'idle',
      },
    ];
  });

  it('correct todolist should be removed', () => {
    const endState = todolistsReducer(
      startState,
      removeTodolistAC(todolistId1),
    );

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
  });

  it('correct todolist should be added', () => {
    const todolist: TodolistDomainType = {
      id: 'id exists',
      title: 'New Todolist',
      addedDate: '',
      order: 0,
      filter: 'all',
      entityStatus: 'idle',
    };

    const endState = todolistsReducer(startState, addTodolistAC(todolist));

    expect(endState).toHaveLength(3);
    expect(endState[0].title).toBe('New Todolist');
    expect(endState[0]).toEqual(todolist);
  });

  it('correct todolist should change its name', () => {
    const newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(
      startState,
      changeTodolistTitleAC(todolistId2, newTodolistTitle),
    );

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(endState).toHaveLength(2);
  });

  it('correct filter of todolist should be changed', () => {
    const newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(
      startState,
      changeTodolistFilterAC(newFilter, todolistId2),
    );

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
    expect(endState).toHaveLength(2);
  });

  it('todolists should be set to the state', () => {
    const endState = todolistsReducer([], setTodolistsAC(startState));

    expect(endState[1]).toEqual({
      id: todolistId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    });
    expect(endState).toHaveLength(2);
  });
});
