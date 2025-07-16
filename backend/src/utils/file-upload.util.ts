import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
}

// fileFilter 回调类型
type FileFilterCallback = (error: Error | null, acceptFile: boolean) => void;
// filename 回调类型
type FilenameCallback = (error: Error | null, filename: string) => void;

export const imageFileFilter = (
  req: Request,
  file: File,
  callback: FileFilterCallback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException('只允许上传图片文件!', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (
  req: Request,
  file: File,
  callback: FilenameCallback,
) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
