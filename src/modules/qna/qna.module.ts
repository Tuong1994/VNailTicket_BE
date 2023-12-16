import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { QnAController } from './qna.controller';
import { QnAService } from './qna.service';
import { PrismaService } from '../prisma/prisma.service';
import { CheckIdMiddleware } from 'src/common/middleware/checkId.middleware';

@Module({
  controllers: [QnAController],
  providers: [QnAService],
})
export class QnAModule implements NestModule {
  constructor(private prisma: PrismaService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(new CheckIdMiddleware(this.prisma, 'qnAItem').use).forRoutes(
      {
        path: 'api/qna/detail',
        method: RequestMethod.GET,
      },
      {
        path: 'api/qna/update',
        method: RequestMethod.PUT,
      },
      {
        path: 'api/qna/remove',
        method: RequestMethod.DELETE,
      },
    );
  }
}
