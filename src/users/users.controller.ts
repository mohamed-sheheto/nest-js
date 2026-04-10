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
  ParseUUIDPipe,
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
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found, please try again ');

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
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: updateUserDto,
  ): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);
    return (this.users[index] = { ...this.users[index], ...updateUserDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);

    // this.users = this.users.filter((user) => user.id !== id);
  }
}
