import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { Task, TaskPropsType } from './Task';
import { TaskPriority, TaskStatus } from '../../../../api/todolistsApi';

export default {
  title: 'Todolist/Task',
  component: Task,
  args: {
    removeTask: action('Title changed inside Task'),
    changeTaskStatus: action('Remove button inside Task clicked'),
    changeTaskTitle: action('Status changed inside Task'),
  },
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  task: {
    id: '1',
    title: 'CSS',
    status: TaskStatus.Completed,
    todoListId: 'todolistId1',
    description: '',
    startDate: '',
    deadline: '',
    addedDate: '',
    order: 0,
    priority: TaskPriority.Low,
  },
  todolistId: 'todolistId1',
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  task: {
    id: '2',
    title: 'JS',
    status: TaskStatus.New,
    todoListId: 'todolistId2',
    description: '',
    startDate: '',
    deadline: '',
    addedDate: '',
    order: 0,
    priority: TaskPriority.Low,
  },
  todolistId: 'todolistId2',
};
