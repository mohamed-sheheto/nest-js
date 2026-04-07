import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
  private readonly users: UserEntity[] = [];
  @Get()
  findAll(): UserEntity[] {
    return this.users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  @Post()
  create(@Body() createUserDto: createUserDto): UserEntity {
    const newUser = {
      ...createUserDto,
      id: uuid(),
    };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: updateUserDto) {
    return updateUserDto;
  }

  @Delete(':username')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('username') username: string): string {
    return `${username} deleted`;
  }
}
