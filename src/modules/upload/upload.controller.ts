import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Delete,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/common/config/multer.config';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('api/image')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get('list')
  @HttpCode(HttpStatus.OK)
  getImages(@Query() query: QueryDto) {
    return this.uploadService.getImages(query);
  }

  @Post('upload')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('images', 5, multerOption()))
  imagesUpload(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.imagesUpload(files);
  }

  @Delete('remove')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  removeImages(@Query() query: QueryDto) {
    return this.uploadService.removeImages(query);
  }
}
