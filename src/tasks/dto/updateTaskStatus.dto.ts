import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../taskEnum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
