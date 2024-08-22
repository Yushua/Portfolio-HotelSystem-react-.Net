import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import TasksService from './tasks.service';
import { CreateTaskDto } from './dto/create-task';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(CreateTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  PatchTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }
}
