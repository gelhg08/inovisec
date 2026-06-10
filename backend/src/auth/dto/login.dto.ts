import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  declare username: string;

  @IsString()
  @IsNotEmpty()
  declare password: string;
}