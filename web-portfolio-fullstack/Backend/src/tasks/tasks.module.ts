import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import TasksService from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/user/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]), // Import TaskRepository along with Task
    // Other modules if needed...
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
