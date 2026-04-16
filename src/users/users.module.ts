import { Injectable, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { APP_NAME } from './user.constants';
import { USER_HABITS } from './user.constants';

abstract class ConfigService {}
class ProductionConfigService extends ConfigService {}
class DevelopmentConfigService extends ConfigService {}

@Injectable()
class UserHabitsFactory {
  getHabits() {
    return ['eat', 'sleep', 'code'];
  }
}

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    UserHabitsFactory,
    {
      provide: APP_NAME,
      useValue: 'DEMO',
    },
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'production'
          ? ProductionConfigService
          : DevelopmentConfigService,
    },
    {
      provide: USER_HABITS,
      useFactory: (userHabits: UserHabitsFactory) => userHabits.getHabits(),
      inject: [UserHabitsFactory],
    },
  ],
})
export class UsersModule {}
