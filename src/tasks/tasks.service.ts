import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskEnum';
import { CreateTaskDto } from './dto/createTask.dto';
import { FilterTaskDto } from './dto/filterTask.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(private dataSource: DataSource) {}

  // getAllTasks() {
  // }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.dataSource.manager.findOne(Task, {
      where: { id },
    });

    if (!foundTask) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return foundTask;
  }

  // getTasksWithFilter(filters: FilterTaskDto): Task[] | string {
  //   const { status, search } = filters;

  //   let tasks = this.getAllTasks();

  //   if (status && Object.values(TaskStatus).includes(status)) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (
  //         task.title.toLowerCase().includes(search.toLowerCase()) ||
  //         task.description.toLowerCase().includes(search.toLowerCase())
  //       ) {
  //         return true;
  //       } else {
  //         false;
  //       }
  //     });
  //   }

  //   return tasks;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const newTask = await this.dataSource.manager.create(Task, {
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.dataSource.manager.save(newTask);

    return newTask;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);

  //   task.status = status;
  //   return task;
  // }

  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);

  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
}
