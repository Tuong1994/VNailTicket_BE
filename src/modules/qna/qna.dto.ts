import { IsNotEmpty } from 'class-validator';

export class QnAItemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}
