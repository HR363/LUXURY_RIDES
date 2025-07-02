import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'vehicles' },
        (error: Error | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (result) return resolve(result.secure_url);
          reject(new Error('Unknown Cloudinary error'));
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
} 