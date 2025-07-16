import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 验证环境变量加载
  console.log('数据库配置:', {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
  });

  // 全局启用参数验证（用于 DTO 验证）
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤掉未在 DTO 中定义的属性
      forbidNonWhitelisted: true, // 对未定义的属性抛出错误
    }),
  );

  // 允许跨域（适配前端调用）
  app.enableCors({
    origin: 'http://localhost:3000', // 前端地址
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
  console.log(`后端服务运行在: http://localhost:${process.env.PORT || 3001}`);
}
void bootstrap();
