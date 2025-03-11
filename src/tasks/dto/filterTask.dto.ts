import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../types/taskEnum';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
