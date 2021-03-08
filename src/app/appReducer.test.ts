import {
  setStatusAC,
  setErrorAC,
  AppStateType,
  appReducer,
} from './appReducer';

describe('app reducer', () => {
  let startState: AppStateType;

  beforeEach(() => {
    startState = {
      status: 'idle',
      error: null,
    };
  });

  it('should handle setStatusAC', () => {
    const endState = appReducer(startState, setStatusAC('succeeded'));

    expect(endState.status).toBe('succeeded');
  });

  it('should handle setErrorAC', () => {
    const endState = appReducer(startState, setErrorAC('some error'));

    expect(endState.error).toBe('some error');
  });
});
