type StateType = {
  name: string;
  age: number;
  childrenCount: number;
};

type ActionType = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export const userReducer = (
  state: StateType,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case 'INCREMENT_AGE':
      return { ...state, age: state.age + 1 };

    case 'INCREMENT_CHILDREN_COUNT':
      return { ...state, childrenCount: state.childrenCount + 1 };

    case 'CHANGE_NAME':
      return { ...state, name: action.newName };

    default:
      return state;
  }
};
