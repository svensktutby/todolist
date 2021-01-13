import React from 'react'
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
} from './state/todolists-reducer'
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './state/store'

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
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists,
  )
  const tasks = useSelector<AppRootStateType, TasksStateType>(
    (state) => state.tasks,
  )

  function removeTask(taskId: string, todolistId: string) {
    dispatch(removeTaskAC(taskId, todolistId))
  }

  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId))
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
  }

  function changeTaskTitle(taskId: string, title: string, todolistId: string) {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }

  function changeFilter(filter: FilterValuesType, id: string) {
    dispatch(changeTodolistFilterAC(filter, id))
  }

  function removeTodoList(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
  }

  function changeTodoListTitle(id: string, title: string) {
    dispatch(changeTodolistTitleAC(id, title))
  }

  function addTodoList(title: string) {
    dispatch(addTodolistAC(title))
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
          {todolists.map((tl) => {
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
