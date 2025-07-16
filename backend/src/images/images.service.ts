import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
// import { CreateImageDto } from './dto/create-image.dto';
import { UploadImageDto } from './dto/upload-image.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async create(uploadImageDto: UploadImageDto, file: Express.Multer.File) {
    const image = new Image();
    image.filename = file.filename;
    image.filepath = file.path;
    image.filesize = file.size;
    image.user_id = uploadImageDto.user_id;

    return await this.imagesRepository.save(image);
  }

  async findAll(userId: string) {
    return await this.imagesRepository.find({
      where: { user_id: userId },
      order: { upload_time: 'DESC' },
    });
  }

  async findLatest(userId: string) {
    const images = await this.imagesRepository.find({
      where: { user_id: userId },
      order: { upload_time: 'DESC' },
      take: 1,
    });

    if (images.length === 0) {
      throw new HttpException('未找到图片', HttpStatus.NOT_FOUND);
    }

    return images[0];
  }

  // 可选：删除图片
  async remove(id: number, userId: string) {
    const image = await this.imagesRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!image) {
      throw new HttpException('图片不存在', HttpStatus.NOT_FOUND);
    }

    // 删除文件
    try {
      fs.unlinkSync(path.join(process.cwd(), image.filepath));
    } catch (err) {
      console.error('删除文件失败:', err);
    }

    return await this.imagesRepository.remove(image);
  }
}
