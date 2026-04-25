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
  SetMetadata,
  // UseGuards,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { updateUserDto } from './dtos/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './users.service';
import { userResponseDto } from './dtos/user-response.dto';
import { Is_Public_Key, Public } from '../common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
// import { AuthGuard } from '../common/guards/auth.guard';
// import { resolve } from 'path';

interface config {
  DATABASE_PASSWORD: number;
  DATABASE_HOST: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService<config>,
  ) {
    console.log('ENV VARIABLE =>', process.env.ENV);
    console.log(this.configService.get('DATABASE_HOST', { infer: true }));
  }
  private readonly users: UserEntity[] = [];

  @SetMetadata(Is_Public_Key, true)
  @Public()
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
  // @UseGuards(AuthGuard)
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
