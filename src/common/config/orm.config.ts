import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.HOST,
  database: process.env.DATABASE,
  synchronize: true,
});
