import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto } from './dto/generate-token.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 生成测试用 JWT 令牌
  generateToken(generateTokenDto: GenerateTokenDto) {
    const { userId, role } = generateTokenDto;

    // 构建令牌 payload
    const payload = { userId, role };

    // 生成令牌
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      expires_in: process.env.JWT_EXPIRES_IN,
    };
  }
}
