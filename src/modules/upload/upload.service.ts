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

  async getImages(query: QueryDto) {
    const { limit } = query;
    const images = await this.prisma.image.findMany({ orderBy: [{ updatedAt: 'desc' }] });
    const totalItems = images.length;
    const collection = images.slice(0, limit);
    return { totalItems, data: collection };
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

  async removeImages(query: QueryDto) {
    const { ids } = query;
    const listIds = ids.split(',');
    const images = await this.prisma.image.findMany({ where: { id: { in: listIds } } });
    if (images && images.length > 0) {
      await Promise.all(images.map(async (file) => await this.cloudinary.destroy(file.publicId)));
      await this.prisma.image.deleteMany({ where: { id: { in: listIds } } });
      throw new HttpException('Removed success', HttpStatus.OK);
    }
    throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
  }
}
