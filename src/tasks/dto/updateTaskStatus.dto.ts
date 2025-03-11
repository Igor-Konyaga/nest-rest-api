import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../types/taskEnum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
