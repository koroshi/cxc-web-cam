import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// 定义用户类型（根据你的 JWT payload 结构调整）
export interface JwtPayload {
  userId: string;
  username?: string;
  // 其它字段...
}
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?:
    | {
        userId: string;
        username?: string;
        // 其它字段...
      }
    | undefined; // 用户信息由 JwtStrategy.validate() 方法设置
}

// 从请求中提取用户信息（在控制器中使用 @GetUser() 获取）
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user as JwtPayload | undefined; // 用户信息由 JwtStrategy.validate() 方法设置
  },
);
