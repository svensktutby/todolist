import React, { useReducer } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { Todolist } from './Todolist'
import { AddItemForm } from './AddItemForm'
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from './state/todolists-reducer'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function AppWithRedux() {
  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
    {
      id: todoListId1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: todoListId2,
      title: 'What to buy',
      filter: 'all',
    },
  ])

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListId1]: [
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
    [todoListId2]: [
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
  })

  function removeTask(taskId: string, todolistId: string) {
    dispatchToTasks(removeTaskAC(taskId, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatchToTasks(addTaskAC(title, todolistId))
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId))
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todolistId))
  }

  function changeFilter(filter: FilterValuesType, id: string) {
    dispatchToTodolists(changeTodolistFilterAC(filter, id))
  }

  function removeTodoList(todolistId: string) {
    const action = removeTodolistAC(todolistId)
    dispatchToTasks(action)
    dispatchToTodolists(action)
  }

  function changeTodoListTitle(id: string, title: string) {
    dispatchToTodolists(changeTodolistTitleAC(id, title))
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title)
    dispatchToTasks(action)
    dispatchToTodolists(action)
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
            let tasksForTodolist = tasks[tl.id]

            if (tl.filter === 'active') {
              tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone)
            }

            if (tl.filter === 'completed') {
              tasksForTodolist = tasks[tl.id].filter((t) => t.isDone)
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
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithRedux
