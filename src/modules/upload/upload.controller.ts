import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from 'src/common/config/multer.config';
import { QueryDto } from 'src/common/dto/query.dto';

@Controller('api/image')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('upload')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('images', multerOption('./assets/image/product')))
  @HttpCode(HttpStatus.OK)
  imagesUpload(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadService.imagesUpload(files);
  }

  @Delete('remove')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  removeImage(@Query() query: QueryDto) {
    return this.uploadService.removeImage(query);
  }
}
