import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Middleware,
  Action,
} from 'redux';
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk';

/* eslint-disable import/no-cycle */
import { todolistsReducer } from './todolistsReducer';
import { tasksReducer } from './tasksReducer';
/* eslint-enable import/no-cycle */

const DEV = process.env.NODE_ENV !== 'production';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type ThunkType<
  A extends Action = Action,
  R = Promise<void>,
  S = AppRootStateType
> = ThunkAction<R, S, unknown, A>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore next line
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = DEV && devtools ? devtools : compose;

const middleware: Array<Middleware> = [
  thunk as ThunkMiddleware<AppRootStateType>,
];

export const enhancedStore = composeEnhancers(applyMiddleware(...middleware));

export const store = createStore(rootReducer, enhancedStore);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
