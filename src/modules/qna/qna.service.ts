import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { QnAItemDto } from './qna.dto';

@Injectable()
export class QnAService {
  constructor(private prisma: PrismaService) {}

  async getQnAItems() {
    const qnaItems = await this.prisma.qnAItem.findMany({ orderBy: [{ updatedAt: 'desc' }] });
    return qnaItems;
  }

  async getQnAItem(query: QueryDto) {
    const { qnaItemId } = query;
    const qnaItem = await this.prisma.qnAItem.findUnique({ where: { id: qnaItemId } });
    return qnaItem;
  }

  async createQnAItem(qnaItem: QnAItemDto) {
    const { title, content } = qnaItem;
    const newQnAItem = await this.prisma.qnAItem.create({ data: { title, content } });
    return newQnAItem;
  }

  async updateQnAItem(query: QueryDto, qnaItem: QnAItemDto) {
    const { qnaItemId } = query;
    const { title, content } = qnaItem;
    await this.prisma.qnAItem.update({ where: { id: qnaItemId }, data: { title, content } });
    throw new HttpException('Updated success', HttpStatus.OK);
  }

  async removeQnAItem(query: QueryDto) {
    const { qnaItemId } = query;
    await this.prisma.qnAItem.delete({ where: { id: qnaItemId } });
    throw new HttpException('Removed success', HttpStatus.OK);
  }
}
