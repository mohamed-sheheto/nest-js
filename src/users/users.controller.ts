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
  ParseUUIDPipe,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './users.service';
import { userResponseDto } from './dtos/user-response.dto';
// import { resolve } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  private readonly users: UserEntity[] = [];
  @Get()
  // async findAll(): Promise<UserEntity[]> {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  findAll(): UserEntity[] {
    return this.userService.findUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    return this.userService.findUserById(id);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: createUserDto): userResponseDto {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: updateUserDto,
  ): UserEntity {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    this.userService.deleteUser(id);
  }
}
