import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateNoteDto } from './dto';

@Controller({ version: '1', path: 'notes' })
@UseGuards(JwtAuthGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  getNotes(@Req() req) {
    return this.noteService.findAllNotes(req);
  }
  @Get('/:id')
  getNoteById(@Param('id') id: string, @Req() req) {
    const note = this.noteService.findOne(id, req);

    if (!note) {
      throw new NotFoundException();
    }
    return note;
  }
  @Post('/')
  async createNote(
    @Body() NoteData: CreateNoteDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    const newNote = await this.noteService.store(NoteData, id, req);

    return { newNote };
  }
  @Put('/:id')
  async updateNote(
    @Body() NoteData: CreateNoteDto,
    @Param('id') id: string,
    @Req() req,
  ) {
    const note = await this.noteService.updateOne(NoteData, id, req);

    return { note };
  }
  @Delete('/:id')
  async hardDeleteNote(@Req() req, @Param('id') id: string) {
    await this.noteService.hardDeleteOne(id, req);
    return { massage: 'the note has been deleted ' };
  }
}
