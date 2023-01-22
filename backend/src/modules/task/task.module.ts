import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
