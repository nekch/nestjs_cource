import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  createTask(params: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = params;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user
    });

    return this.save(task);
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task').where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        `(LOWER(task.title) LIKE LOWER(:search) OR
         LOWER(task.description) LIKE LOWER(:search))`,
        { search: `%${search.trim()}%` }
      );
    }

    return query.getMany();
  }
}
