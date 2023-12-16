import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  constructor(
    private prisma: PrismaClient,
    private model: string,
  ) {
    this.use = this.use.bind(this);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const { accountId, qnaItemId, imageId } = req.query;

    if (!accountId && !qnaItemId && imageId) {
      throw new HttpException('Id is not provided', HttpStatus.BAD_REQUEST);
    }

    const record = await this.prisma[this.model].findUnique({
      where: {
        id: String(accountId || qnaItemId || imageId),
      },
    });

    if (!record) throw new HttpException('Id not match', HttpStatus.NOT_FOUND);
    next();
  }
}
