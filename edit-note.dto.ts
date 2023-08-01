import { IsString } from 'class-validator';

export class EditNoteDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
