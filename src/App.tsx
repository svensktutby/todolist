import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TaskStateType = {
  [key: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const todoListID1 = v1();
  const todoListID2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    {
      id: todoListID1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: todoListID2,
      title: 'What to buy',
      filter: 'all',
    },
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListID1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        isDone: true,
      },
      {
        id: v1(),
        title: 'JS',
        isDone: true,
      },
      {
        id: v1(),
        title: 'ReactJS',
        isDone: false,
      },
      {
        id: v1(),
        title: 'rest api',
        isDone: false,
      },
      {
        id: v1(),
        title: 'graphQL',
        isDone: false,
      },
    ],
    [todoListID2]: [
      {
        id: v1(),
        title: 'Beer',
        isDone: true,
      },
      {
        id: v1(),
        title: 'Cheese',
        isDone: true,
      },
      {
        id: v1(),
        title: 'Sausage',
        isDone: false,
      },
    ],
  });

  function removeTask(taskID: string, todoListID: string) {
    tasks[todoListID] = tasks[todoListID].filter((t) => t.id !== taskID);
    setTasks({ ...tasks });
  }

  function addTask(title: string, todoListID: string) {
    const task: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };

    tasks[todoListID] = [task, ...tasks[todoListID]];

    setTasks({ ...tasks });
  }

  function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
    const todoListTasks = tasks[todoListID];
    const task = todoListTasks.find((t) => t.id === taskID);

    task && (task.isDone = isDone);
    setTasks({ ...tasks });
  }

  function changeTaskTitle(taskID: string, title: string, todoListID: string) {
    const todoListTasks = tasks[todoListID];
    const task = todoListTasks.find((t) => t.id === taskID);

    task && (task.title = title);
    setTasks({ ...tasks });
  }

  function changeFilter(filterValue: FilterValuesType, todoListID: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListID);

    todoList && (todoList.filter = filterValue) && setTodoLists([...todoLists]);
  }

  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListID));
    delete tasks[todoListID];
    setTasks({ ...tasks });
  }

  function addTodoList(title: string) {
    const newTodoListID = v1();
    const newTodoList: TodolistType = {
      id: newTodoListID,
      title,
      filter: 'all',
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({ ...tasks, [newTodoListID]: [] });
  }

  function changeTodoListTitle(todoListID: string, title: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListID);
    todoList && (todoList.title = title);
    setTodoLists([...todoLists]);
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

      {todoLists.map((tl) => {
        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === 'active') {
          tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone);
        }

        if (tl.filter === 'completed') {
          tasksForTodolist = tasks[tl.id].filter((t) => t.isDone);
        }

        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
