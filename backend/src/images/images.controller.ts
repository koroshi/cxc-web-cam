import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';
// import { CreateImageDto } from './dto/create-image.dto';               ·········
import { UploadImageDto } from './dto/upload-image.dto'; // 修正导入
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.util';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser, JwtPayload } from '../auth/decorators/get-user.decorator';

// // 在文件顶部添加这个接口扩展
// interface AuthenticatedRequest extends Request {
//   user?: any; // 可以根据你的 user 类型具体定义
// }

@Controller('images')
@UseGuards(AuthGuard('jwt'))
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() uploadImageDto: UploadImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })], // 5MB
      }),
    )
    file: Express.Multer.File,
    @GetUser() user: JwtPayload, // 使用自定义装饰器获取用户信息
  ) {
    console.log(user); // 输出用户信息，便于调试
    uploadImageDto.user_id = user.userId; // 从 JWT 中获取用户 ID
    return this.imagesService.create(uploadImageDto, file);
  }

  @Get()
  findAll(@GetUser() user: JwtPayload) {
    console.log(user); // 输出用户信息，便于调试
    return this.imagesService.findAll(user.userId);
  }

  @Get('latest')
  findLatest(@GetUser() user: JwtPayload) {
    return this.imagesService.findLatest(user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: JwtPayload) {
    return this.imagesService.remove(+id, user.userId);
  }
}
