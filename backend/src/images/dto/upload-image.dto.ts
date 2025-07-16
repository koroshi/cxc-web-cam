// src/images/dto/upload-image.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UploadImageDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_id: string;
}
