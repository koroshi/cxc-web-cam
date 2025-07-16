import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateTokenDto } from './dto/generate-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 生成测试用 JWT 令牌（无需认证）
  @Post('generate-token')
  generateToken(@Body() generateTokenDto: GenerateTokenDto) {
    return this.authService.generateToken(generateTokenDto);
  }
}
