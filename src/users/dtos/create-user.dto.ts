import { IsEmail, IsString, Length } from 'class-validator';

export class createUserDto {
  @IsString()
  @Length(3, 20)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly country: string;

  @IsString()
  readonly password : string
}
