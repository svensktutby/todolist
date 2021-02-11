import React, { useState } from 'react';
import { v1 } from 'uuid';
import { Menu } from '@material-ui/icons';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';

import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

import { TaskPriority, TaskStatus, TaskType } from './api/todolistsApi';
import { FilterValuesType, TodolistDomainType } from './state/todolistsReducer';
import { TasksStateType } from './state/tasksReducer';

function App() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
    },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatus.Completed,
        todoListId: todoListId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatus.Completed,
        todoListId: todoListId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'ReactJS',
        status: TaskStatus.Completed,
        todoListId: todoListId1,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
    [todoListId2]: [
      {
        id: v1(),
        title: 'Beer',
        status: TaskStatus.Completed,
        todoListId: todoListId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'Cheese',
        status: TaskStatus.Completed,
        todoListId: todoListId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
      {
        id: v1(),
        title: 'Sausage',
        status: TaskStatus.Completed,
        todoListId: todoListId2,
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriority.Low,
      },
    ],
  });

  function removeTask(taskId: string, todoListId: string) {
    tasks[todoListId] = tasks[todoListId].filter((t) => t.id !== taskId);
    setTasks({ ...tasks });
  }

  function addTask(title: string, todoListId: string) {
    const task: TaskType = {
      id: v1(),
      title,
      status: TaskStatus.New,
      todoListId,
      description: '',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
    };

    tasks[todoListId] = [task, ...tasks[todoListId]];

    setTasks({ ...tasks });
  }

  function changeStatus(
    taskId: string,
    status: TaskStatus,
    todoListId: string,
  ) {
    const todoListTasks = tasks[todoListId];
    const task = todoListTasks.find((t) => t.id === taskId);

    task && (task.status = status);
    setTasks({ ...tasks });
  }

  function changeTaskTitle(taskId: string, title: string, todoListId: string) {
    const todoListTasks = tasks[todoListId];
    const task = todoListTasks.find((t) => t.id === taskId);

    task && (task.title = title);
    setTasks({ ...tasks });
  }

  function changeFilter(filterValue: FilterValuesType, todoListId: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListId);

    todoList && (todoList.filter = filterValue) && setTodoLists([...todoLists]);
  }

  function removeTodoList(todoListId: string) {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
    setTasks({ ...tasks });
  }

  function addTodoList(title: string) {
    const newtodoListId = v1();
    const newTodoList: TodolistDomainType = {
      id: newtodoListId,
      title,
      filter: 'all',
      addedDate: '',
      order: 0,
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({ ...tasks, [newtodoListId]: [] });
  }

  function changeTodoListTitle(todoListId: string, title: string) {
    const todoList = todoLists.find((tl) => tl.id === todoListId);
    todoList && (todoList.title = title);
    setTodoLists([...todoLists]);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: 20 }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>

        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let tasksForTodolist = tasks[tl.id];

            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter(
                (t) => t.status === TaskStatus.New,
              );
            }

            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter(
                (t) => t.status === TaskStatus.Completed,
              );
            }

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: 10 }}>
                  <Todolist
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
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
