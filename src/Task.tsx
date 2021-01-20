import React, { ChangeEvent, FC, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { EditableSpan } from './EditableSpan';

type TaskPropsType = {
  taskId: string;
  title: string;
  isDone: boolean;
  todolistId: string;
  removeTask: (taskId: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};
export const Task: FC<TaskPropsType> = React.memo((props) => {
  console.log('Task is called');
  const removeTaskHandler = useCallback(() => {
    props.removeTask(props.taskId, props.todolistId);
  }, [props]);

  const statusTaskHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(
        props.taskId,
        e.currentTarget.checked,
        props.todolistId,
      );
    },
    [props],
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      props.changeTaskTitle(props.taskId, title, props.todolistId);
    },
    [props],
  );

  return (
    <li
      className={props.isDone ? 'is-done' : ''}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Checkbox
        color="primary"
        onChange={statusTaskHandler}
        checked={props.isDone}
      />
      <EditableSpan value={props.title} getNewTitle={changeTaskTitle} />
      <IconButton onClick={removeTaskHandler} style={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </li>
  );
});
