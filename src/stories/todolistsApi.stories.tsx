import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { todolistsAPI } from '../api/todolistsApi';

export default {
  title: 'Todolist/Api',
} as Meta;

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);

  const todolistTitle = 'Hi, dude';

  useEffect(() => {
    todolistsAPI.createTodolist(todolistTitle).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = '';

  useEffect(() => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  const todolistId = '6280c7ab-944f-45af-8473-594c08363a12';
  const todolistTitle = 'Hi, bud!';

  useEffect(() => {
    todolistsAPI.updateTodolistTitle(todolistId, todolistTitle).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
