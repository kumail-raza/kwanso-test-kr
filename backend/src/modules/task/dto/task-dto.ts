import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  name: string;
}
