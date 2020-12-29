import { userReducer } from './user-reducer'

test('user reducer should increment only age', () => {
  const startState = { age: 43, childrenCount: 2, name: 'Andrei' }

  const endState = userReducer(startState, { type: 'INCREMENT_AGE' })

  expect(endState.age).toBe(44)
  expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
  const startState = { age: 43, childrenCount: 2, name: 'Andrei' }

  const endState = userReducer(startState, { type: 'INCREMENT_CHILDREN_COUNT' })

  expect(endState.childrenCount).toBe(3)
  expect(endState.age).toBe(43)
})

test('user reducer should change name of user', () => {
  const startState = { age: 43, childrenCount: 2, name: 'Andrei' }

  const endState = userReducer(startState, {
    type: 'CHANGE_NAME',
    newName: 'Andriano',
  })

  expect(endState.name).toBe('Andriano')
  expect(endState.name).not.toBe(startState.name)
})
