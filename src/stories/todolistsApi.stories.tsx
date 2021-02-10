import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import { todolistsAPI } from '../api/todolistsApi';
import { Button } from './Button';

export default {
  title: 'Todolist/Api',
} as Meta;

export const GetTodolists = () => {
  const [state, setState] = useState<unknown>(null);

  useEffect(() => {
    todolistsAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<unknown>(null);

  const todolistTitle = 'Hi, dude';

  useEffect(() => {
    todolistsAPI.createTodolist(todolistTitle).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<unknown>(null);

  const todolistId = '6280c7ab-944f-45af-8473-594c08363a12';

  useEffect(() => {
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<unknown>(null);

  const todolistId = '1d123a2c-2fbe-428d-99c5-4cc85532929c';
  const todolistTitle = 'Hi, bud!';

  useEffect(() => {
    todolistsAPI.updateTodolistTitle(todolistId, todolistTitle).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<unknown>(null);
  const [todolistId, setTodolistId] = useState<string>('');

  const getTasks = () => {
    todolistsAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <Button label="get tasks" onClick={getTasks} />
      </div>
    </div>
  );
};

export const DeleteTask = () => {
  const [state, setState] = useState<unknown>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const deleteTask = () => {
    todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="task id"
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <Button label="delete task" onClick={deleteTask} />
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<unknown>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');

  const createTask = () => {
    todolistsAPI.createTask(todolistId, taskTitle).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolist id"
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="task title"
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <Button label="create task" onClick={createTask} />
      </div>
    </div>
  );
};

export const UpdateTaskTitle = () => {
  const [state, setState] = useState<unknown>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');

  const model = {
    title,
    description,
    completed,
    status,
    priority,
    startDate,
    deadline,
  };

  const updateTask = () => {
    todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data);
    });
  };

  const style = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    width: 200,
    marginBottom: 20,
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <div style={style}>
          <input
            type="text"
            placeholder="todolist id"
            value={todolistId}
            onChange={(e) => {
              setTodolistId(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="task id"
            value={taskId}
            onChange={(e) => {
              setTaskId(e.currentTarget.value);
            }}
          />
        </div>
        <div style={style}>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
          />
          <input
            type="number"
            placeholder="status"
            value={status}
            onChange={(e) => {
              setStatus(+e.currentTarget.value);
            }}
          />
          <input
            type="number"
            placeholder="priority"
            value={priority}
            onChange={(e) => {
              setPriority(+e.currentTarget.value);
            }}
          />
        </div>

        <Button label="update task" onClick={updateTask} />
      </div>
    </div>
  );
};
