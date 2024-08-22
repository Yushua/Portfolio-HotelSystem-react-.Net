import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

//tasks use the services from other modules, to do things and returns. for example
//THEY USE THE SERVICES from other services entitiy, to do things in here, to return
//data back. this way, information in their resectfull, are to add and change.
//you do not change information in entity's here
@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskEntity: Repository<Task>,
    @InjectRepository(User)
    private readonly UserEntity: Repository<User>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.taskEntity.createQueryBuilder('task');
    const { status, search } = filterDto;

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}` },
      );
    } else if (status) {
      query.andWhere('task.status = :status', { status: `OPEN` });
    }
    const task = await query.getMany();
    return task;
  }

  async createTask(CreateTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = CreateTaskDto;

    const task = this.taskEntity.create({
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    });
    await this.taskEntity.save(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task>{
    const found: Task = await this.taskEntity.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTaskById(id: string): Promise<void>{
    const found = await this.taskEntity.delete({ id });
    if (found.affected === 0) {
      throw new NotFoundException(`Task with ID ${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskEntity.save(task);
    return task;
  }

}
