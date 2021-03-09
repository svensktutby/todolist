import {
  setAppStatusAC,
  setAppErrorAC,
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
    const endState = appReducer(startState, setAppStatusAC('succeeded'));

    expect(endState.status).toBe('succeeded');
  });

  it('should handle setErrorAC', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'));

    expect(endState.error).toBe('some error');
  });
});
