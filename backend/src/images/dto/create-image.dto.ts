// src/images/dto/create-image.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
