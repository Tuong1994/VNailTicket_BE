import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import utils from 'src/utils';

@Injectable()
export class UploadService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getImages() {
    const images = await this.prisma.image.findMany({ orderBy: [{ updatedAt: 'desc' }] });
    return images;
  }

  async imagesUpload(files: Express.Multer.File[]) {
    if (!files || !files.length) throw new HttpException('Files are not provided', HttpStatus.NOT_FOUND);

    const images = await Promise.all(
      files.map(async (file) => {
        const result = await this.cloudinary.upload(file.path);
        return utils.generateImage(result);
      }),
    );

    files.forEach((file) => utils.removeFile(file.path));

    await this.prisma.image.createMany({ data: images });

    throw new HttpException('Uploaded success', HttpStatus.OK);
  }

  async removeImage(query: QueryDto) {
    const { imageId } = query;
    const image = await this.prisma.image.findUnique({ where: { id: imageId } });
    await this.cloudinary.destroy(image.publicId);
    await this.prisma.image.delete({ where: { id: imageId } });
    throw new HttpException('Removed success', HttpStatus.OK);
  }
}
