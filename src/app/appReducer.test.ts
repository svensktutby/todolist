import {
  setAppStatusAC,
  setAppErrorAC,
  AppStateType,
  appReducer,
  setAppInitializedAC,
} from './appReducer';

describe('app reducer', () => {
  let startState: AppStateType;

  beforeEach(() => {
    startState = {
      status: 'idle',
      error: null,
      isInitialized: false,
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

  it('should handle setAppInitializedAC', () => {
    const endState = appReducer(startState, setAppInitializedAC(true));

    expect(endState.isInitialized).toBeTruthy();
  });
});
