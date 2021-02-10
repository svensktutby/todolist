import axios, { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
});

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

type ResponseType<D = Record<string, unknown>> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

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

type TasksResponseType = {
  items: Array<TaskType>;
  totalCount: number;
  error: string | null;
};

export const todolistsAPI = {
  getTodolists(): Promise<AxiosResponse<TodolistType[]>> {
    return API.get<Array<TodolistType>>('todo-lists');
  },
  createTodolist(title: string): Promise<AxiosResponse<ResponseType>> {
    return API.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
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
  ): Promise<AxiosResponse<ResponseType>> {
    return API.post<ResponseType<{ item: TaskType }>>(
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
  ): Promise<AxiosResponse<ResponseType>> {
    return API.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};
