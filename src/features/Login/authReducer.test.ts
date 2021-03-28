import { authReducer, AuthStateType, setIsLoggedInAC } from './authReducer';

describe('auth reducer', () => {
  let startState: AuthStateType;

  beforeEach(() => {
    startState = {
      isLoggedIn: false,
    };
  });

  it('user should be logged in', () => {
    const action = setIsLoggedInAC(true);

    const endState = authReducer(startState, action);

    expect(endState.isLoggedIn).toBeTruthy();
  });
});
