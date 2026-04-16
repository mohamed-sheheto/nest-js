import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { createUserDto } from './dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import { updateUserDto } from './dtos/update-user.dto';
import { APP_NAME, USER_HABITS } from './user.constants';

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  constructor(
    @Inject(APP_NAME) private APP_NAME: string,
    @Inject(USER_HABITS) private USER_HABITS: string[],
  ) {
    console.log(this.APP_NAME);
    console.log(this.USER_HABITS);
  }
  private users: UserEntity[] = [];

  findUsers(): UserEntity[] {
    return this.users;
  }

  findUserById(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('user not found, please try again ');

    return user;
  }

  createUser(createUserDto: createUserDto): UserEntity {
    const newUser = {
      ...createUserDto,
      id: uuid(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updateUserDto: updateUserDto): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);
    return (this.users[index] = { ...this.users[index], ...updateUserDto });
  }

  deleteUser(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
    // this.users = this.users.filter((user) => user.id !== id);
  }
}
