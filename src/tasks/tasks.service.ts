import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterTaskDto } from './dto/filterTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | string {
    return this.tasks.find((task) => task.id === id) || 'Task not found';
  }

  getTasksWithFilter(filters: FilterTaskDto): Task[] | string {
    const { status, search } = filters;

    let tasks = this.getAllTasks();

    if (status && Object.values(TaskStatus).includes(status)) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        } else {
          false;
        }
      });
    }
    console.log('--', tasks);

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task | string {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      return 'task not found';
    }
    if (task.status === status) {
      return 'This status is already use';
    }
    if (!Object.values(TaskStatus).includes(status)) {
      return 'status not found';
    }

    task.status = status;
    return task;
  }

  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return `Task ${id} deleted`;
  }
}
