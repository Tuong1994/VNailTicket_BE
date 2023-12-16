import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIdMiddleware } from 'src/common/middleware/checkId.middleware';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule implements NestModule {
  constructor(private prisma: PrismaService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(new CheckIdMiddleware(this.prisma, 'image').use).forRoutes({
      path: 'api/image/remove',
      method: RequestMethod.DELETE,
    });
  }
}
