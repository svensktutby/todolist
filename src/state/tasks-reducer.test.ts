import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './tasks-reducer'
import { TasksStateType } from '../App'
import { addTodolistAC, removeTodolistAC } from './todolists-reducer'

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = removeTaskAC('2', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1']).toHaveLength(3)
  expect(endState['todolistId2']).toHaveLength(2)
  expect(endState['todolistId2'].every((t) => t.id !== '2')).toBeTruthy()
})

test('correct task should be added from correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = addTaskAC('whisky', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId1']).toHaveLength(3)
  expect(endState['todolistId2']).toHaveLength(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('whisky')
  expect(endState['todolistId2'][0].isDone).toBeFalsy()
})

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = changeTaskStatusAC('2', false, 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBeFalsy()
  expect(endState['todolistId1'][1].isDone).toBeTruthy()
  expect(
    startState['todolistId2'][1] === endState['todolistId2'][1],
  ).toBeFalsy()
})

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = changeTaskTitleAC('2', 'parmesan', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('parmesan')
  expect(endState['todolistId1'][1].title).not.toBe('parmesan')
  expect(startState['todolistId2'] === endState['todolistId2']).toBeFalsy()
})

test('new property with new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw new Error('new key should be added')
  }

  expect(keys).toHaveLength(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'beer', isDone: false },
      { id: '2', title: 'cheese', isDone: true },
      { id: '3', title: 'sausage', isDone: false },
    ],
  }

  const action = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys).toHaveLength(1)
  expect(endState['todolistId2']).toBeUndefined()
})
