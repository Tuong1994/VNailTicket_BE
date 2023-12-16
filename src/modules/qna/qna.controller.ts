import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QnAService } from './qna.service';
import { QueryDto } from 'src/common/dto/query.dto';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { QnAItemDto } from './qna.dto';

@Controller('api/qna')
export class QnAController {
  constructor(private qnaService: QnAService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  getQnAItems() {
    return this.qnaService.getQnAItems();
  }

  @Get('detail')
  @HttpCode(HttpStatus.OK)
  getQnAItem(@Query() query: QueryDto) {
    return this.qnaService.getQnAItem(query);
  }

  @Post('create')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  createQnAItem(@Body() qnaItem: QnAItemDto) {
    return this.qnaService.createQnAItem(qnaItem);
  }

  @Put('update')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  updateQnAItem(@Query() query: QueryDto, @Body() qnaItem: QnAItemDto) {
    return this.qnaService.updateQnAItem(query, qnaItem);
  }

  @Delete('remove')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  removeQnAItem(@Query() query: QueryDto) {
    return this.qnaService.removeQnAItem(query);
  }
}
