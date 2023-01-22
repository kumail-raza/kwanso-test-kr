import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createTask(@Body('name') taskName) {
    const task = new Task();
    task.name = taskName;
    return this.taskService.create(task);
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }
}
