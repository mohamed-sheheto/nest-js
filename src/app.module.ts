import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './common/config/orm.config';
import omrConfigProd from './common/config/orm.config.prod';
// import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.dev.env' : '.stage.env',
      load: [ormConfig, omrConfigProd],
    }),

    // TypeOrmModule.forRootAsync({
    //   useFactory:
    //     process.env.NODE_ENV === 'development' ? ormConfig : omrConfigProd,
    // }),
    UsersModule,
    CommonModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users/:id', method: RequestMethod.PATCH })
      .forRoutes('users');
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: '', method: RequestMethod.GET });
    // .forRoutes(UsersController);
  }
}
