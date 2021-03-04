import React, { ChangeEvent, FC, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';

import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan';
import { TaskStatus, TaskType } from '../../../../api/todolistsApi';

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (taskId: string, todolistId: string) => void;
  changeStatus: (
    taskId: string,
    status: TaskStatus,
    todolistId: string,
  ) => void;
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void;
};

const useStyles = makeStyles(() => ({
  Task: {
    display: 'flex',
    alignItems: 'center',
  },
  IconButton: {
    marginLeft: 'auto',
  },
}));

export const Task: FC<TaskPropsType> = React.memo((props) => {
  const classes = useStyles();

  const removeTaskHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todolistId);
  }, [props]);

  const statusTaskHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(
        props.task.id,
        e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New,
        props.todolistId,
      );
    },
    [props],
  );

  const changeTaskTitle = useCallback(
    (title: string) => {
      props.changeTaskTitle(props.task.id, title, props.todolistId);
    },
    [props],
  );

  return (
    <li
      className={`${classes.Task} ${
        props.task.status === TaskStatus.Completed ? 'is-done' : ''
      }`}
    >
      <Checkbox
        color="primary"
        onChange={statusTaskHandler}
        checked={props.task.status === TaskStatus.Completed}
      />
      <EditableSpan value={props.task.title} onChange={changeTaskTitle} />
      <IconButton onClick={removeTaskHandler} className={classes.IconButton}>
        <Delete />
      </IconButton>
    </li>
  );
});
