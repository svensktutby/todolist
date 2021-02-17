/* eslint-disable import/no-cycle */
import { ThunkType } from '../../app/store';
import {
  ActionType as TodolistsActionType,
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from './todolistsReducer';
/* eslint-enable import/no-cycle */

import {
  todolistsAPI,
  ResultCode,
  TaskStatus,
  TaskPriority,
  TaskType,
  UpdateTaskModelType,
} from '../../api/todolistsApi';

export enum ActionType {
  REMOVE_TASK = 'TL/TASKS/REMOVE_TASK',
  ADD_TASK = 'TL/TASKS/ADD_TASK',
  UPDATE_TASK = 'TL/TASKS/UPDATE_TASK',
  SET_TASKS = 'TL/TASKS/SET_TASKS',
}

const initialState: TasksStateType = {};

export const tasksReducer = (
  state = initialState,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case ActionType.REMOVE_TASK:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (t) => t.id !== action.payload.taskId,
        ),
      };

    case ActionType.ADD_TASK:
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      };

    case ActionType.UPDATE_TASK:
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? { ...t, ...action.payload.model }
            : t,
        ),
      };

    case ActionType.SET_TASKS:
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks,
      };

    case TodolistsActionType.ADD_TODOLIST:
      return { ...state, [action.payload.todolist.id]: [] };

    case TodolistsActionType.REMOVE_TODOLIST: {
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];

      return stateCopy;
    }

    case TodolistsActionType.SET_TODOLISTS:
      return action.payload.todolists.reduce(
        (acc, tl) => {
          return { ...acc, [tl.id]: [] };
        },
        { ...state },
      );

    default:
      return state;
  }
};

/** Actions */
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({
    type: ActionType.REMOVE_TASK,
    payload: {
      taskId,
      todolistId,
    },
  } as const);

export const addTaskAC = (task: TaskType) =>
  ({
    type: ActionType.ADD_TASK,
    payload: {
      task,
    },
  } as const);

export const updateTaskAC = (
  taskId: string,
  model: UpdateDomainTaskModelType,
  todolistId: string,
) =>
  ({
    type: ActionType.UPDATE_TASK,
    payload: {
      taskId,
      model,
      todolistId,
    },
  } as const);

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({
    type: ActionType.SET_TASKS,
    payload: {
      tasks,
      todolistId,
    },
  } as const);

/** Thunks */
export const fetchTasksAsync = (
  todolistId: string,
): ThunkType<ActionsType> => async (dispatch) => {
  const {
    status,
    data: { items },
  } = await todolistsAPI.getTasks(todolistId);

  if (status === 200) {
    dispatch(setTasksAC(items, todolistId));
  }
};

export const removeTaskAsync = (
  taskId: string,
  todolistId: string,
): ThunkType<ActionsType> => async (dispatch) => {
  const {
    data: { resultCode },
  } = await todolistsAPI.deleteTask(todolistId, taskId);

  if (resultCode === ResultCode.Success) {
    dispatch(removeTaskAC(taskId, todolistId));
  }
};

export const addTaskAsync = (
  title: string,
  todolistId: string,
): ThunkType<ActionsType> => async (dispatch) => {
  const {
    data: { resultCode, data },
  } = await todolistsAPI.createTask(todolistId, title);

  if (resultCode === ResultCode.Success) {
    dispatch(addTaskAC(data.item));
  }
};

export const updateTaskAsync = (
  taskId: string,
  domainModel: UpdateDomainTaskModelType,
  todolistId: string,
): ThunkType<ActionsType> => async (dispatch, getState) => {
  const allTaskFromState = getState().tasks;
  const tasksForCurrentTodolist = allTaskFromState[todolistId];
  const task = tasksForCurrentTodolist.find((t) => t.id === taskId);

  if (task) {
    const { title, description, status, priority, startDate, deadline } = task;
    const model: UpdateTaskModelType = {
      title,
      description,
      status,
      priority,
      startDate,
      deadline,
      ...domainModel,
    };

    const {
      data: { resultCode },
    } = await todolistsAPI.updateTask(todolistId, taskId, model);

    if (resultCode === ResultCode.Success) {
      dispatch(updateTaskAC(taskId, domainModel, todolistId));
    }
  }
};

/** Types */
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolistsAC>;

export type TasksStateType = Record<string, Array<TaskType>>;

type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  startDate?: string;
  deadline?: string;
};
