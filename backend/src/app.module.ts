// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from './config/typeorm.config';
// import { ImagesModule } from './images/images.module';
// import { AuthModule } from './auth/auth.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: '.env',
//       isGlobal: true,
//     }),
//     TypeOrmModule.forRoot(typeOrmConfig),
//     ImagesModule,
//     AuthModule,
//     ServeStaticModule.forRoot({
//       rootPath: join(__dirname, '..', 'uploads'),
//       serveRoot: '/uploads',
//     }),
//   ],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 引入配置模块
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 配置模块 - 加载 .env 文件
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // 全局可用
      cache: true, // 缓存提高性能
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    ImagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
