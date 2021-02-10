import { v1 } from 'uuid';

import { TasksStateType } from '../Todolist';
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
} from './todolistsReducer';
import { TaskPriority, TaskStatus, TaskType } from '../api/todolistsApi';

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK';
  taskId: string;
  todolistId: string;
};

export type AddTaskActionType = {
  type: 'ADD_TASK';
  title: string;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS';
  taskId: string;
  status: TaskStatus;
  todolistId: string;
};

export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {};

export const tasksReducer = (
  state = initialState,
  action: ActionTypes,
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      const filteredTasks = state[action.todolistId].filter(
        (t) => t.id !== action.taskId,
      );
      return { ...state, [action.todolistId]: [...filteredTasks] };
    }

    case 'ADD_TASK': {
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        status: TaskStatus.New,
        todoListId: action.todolistId,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      };

      const tasks = state[action.todolistId];

      return { ...state, [action.todolistId]: [newTask, ...tasks] };
    }

    case 'CHANGE_TASK_STATUS': {
      const tasks = state[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t,
      );

      return { ...state, [action.todolistId]: tasks };
    }

    case 'CHANGE_TASK_TITLE': {
      const tasks = state[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t,
      );

      return { ...state, [action.todolistId]: tasks };
    }

    case 'ADD_TODOLIST': {
      return { ...state, [action.todolistId]: [] };
    }

    case 'REMOVE_TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];

      return stateCopy;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string,
): RemoveTaskActionType => {
  return {
    type: 'REMOVE_TASK',
    taskId,
    todolistId,
  };
};

export const addTaskAC = (
  title: string,
  todolistId: string,
): AddTaskActionType => {
  return {
    type: 'ADD_TASK',
    title,
    todolistId,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatus,
  todolistId: string,
): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE_TASK_STATUS',
    taskId,
    status,
    todolistId,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string,
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE_TASK_TITLE',
    taskId,
    title,
    todolistId,
  };
};
