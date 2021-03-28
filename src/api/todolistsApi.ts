import axios, { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
});

export const todolistsAPI = {
  getTodolists(): Promise<AxiosResponse<Array<TodolistType>>> {
    return API.get<Array<TodolistType>>('todo-lists');
  },
  createTodolist(
    title: string,
  ): Promise<AxiosResponse<ResponseType<TodolistResponseDataType>>> {
    return API.post<ResponseType<TodolistResponseDataType>>('todo-lists', {
      title,
    });
  },
  deleteTodolist(id: string): Promise<AxiosResponse<ResponseType>> {
    return API.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolistTitle(
    id: string,
    title: string,
  ): Promise<AxiosResponse<ResponseType>> {
    return API.put<ResponseType>(`todo-lists/${id}`, {
      title,
    });
  },
  getTasks(todolistId: string): Promise<AxiosResponse<TasksResponseType>> {
    return API.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(
    todolistId: string,
    title: string,
  ): Promise<AxiosResponse<ResponseType<TaskResponseDataType>>> {
    return API.post<ResponseType<TaskResponseDataType>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title,
      },
    );
  },
  deleteTask(
    todolistId: string,
    taskId: string,
  ): Promise<AxiosResponse<ResponseType>> {
    return API.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(
    todolistId: string,
    taskId: string,
    model: UpdateTaskModelType,
  ): Promise<AxiosResponse<ResponseType<TaskResponseDataType>>> {
    return API.put<ResponseType<TaskResponseDataType>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};

export const authAPI = {
  me(): Promise<AxiosResponse<ResponseType<MeResponseType>>> {
    return API.get<ResponseType<MeResponseType>>('/auth/me');
  },
  login(
    data: LoginValuesType,
  ): Promise<AxiosResponse<ResponseType<LoginResponseType>>> {
    return API.post<ResponseType<LoginResponseType>>('auth/login', data);
  },
};

/** Types */
export enum ResultCode {
  Success = 0,
  Error = 1,
}

export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
};

export type TaskType = UpdateTaskModelType & {
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type LoginValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

type TodolistResponseDataType = {
  item: TodolistType;
};

type TaskResponseDataType = {
  item: TaskType;
};

type TasksResponseType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string | null;
};

type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseType = {
  userId?: number;
};

export type ResponseType<D = Record<string, unknown>> = {
  resultCode: ResultCode;
  messages: Array<string>;
  data: D;
};
