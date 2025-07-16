// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config(); // 加载 .env 文件（虽然 NestJS 已加载，但这里也需要）

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost', // 添加默认值
  port: parseInt(process.env.DATABASE_PORT || '5432', 10), // 添加默认值
  username: process.env.DATABASE_USERNAME || 'postgres', // 添加默认值
  password: process.env.DATABASE_PASSWORD || 'postgres', // 添加默认值
  database: process.env.DATABASE_NAME || 'cxc_test', // 添加默认值
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // 开发环境使用，生产环境建议关闭
};
