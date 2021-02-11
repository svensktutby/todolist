import React, { useReducer } from 'react';
import { v1 } from 'uuid';
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
import { Menu } from '@material-ui/icons';

import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';

import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from './state/todolistsReducer';
import {
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC,
} from './state/tasksReducer';
import { TaskPriority, TaskStatus, TaskType } from './api/todolistsApi';

export function AppWithReducer() {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
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

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

  function removeTask(taskId: string, todolistId: string) {
    dispatchToTasks(removeTaskAC(taskId, todolistId));
  }

  function addTask(title: string, todolistId: string) {
    const task: TaskType = {
      id: 'id exists',
      title,
      status: TaskStatus.New,
      todoListId: todolistId,
      description: '',
      startDate: '',
      deadline: '',
      addedDate: '',
      order: 0,
      priority: TaskPriority.Low,
    };

    dispatchToTasks(addTaskAC(task));
  }

  function changeStatus(
    taskId: string,
    status: TaskStatus,
    todolistId: string,
  ) {
    dispatchToTasks(updateTaskAC(taskId, { status }, todolistId));
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatchToTasks(updateTaskAC(taskId, { title }, todolistId));
  }

  function changeFilter(filter: FilterValuesType, id: string) {
    dispatchToTodolists(changeTodolistFilterAC(filter, id));
  }

  function removeTodoList(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchToTasks(action);
    dispatchToTodolists(action);
  }

  function changeTodoListTitle(id: string, title: string) {
    dispatchToTodolists(changeTodolistTitleAC(id, title));
  }

  function addTodoList(title: string) {
    const todolist: TodolistDomainType = {
      id: 'id exists',
      title,
      addedDate: '',
      order: 0,
      filter: 'all',
    };

    const action = addTodolistAC(todolist);
    dispatchToTasks(action);
    dispatchToTodolists(action);
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
