import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(data: Task): Promise<Task> {
    return this.taskRepository.save({ ...data });
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
