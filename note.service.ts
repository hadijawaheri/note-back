import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { Note, NoteDocument } from './Note.schema';
import { CreateNoteDto } from './dto/create-Note.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel(Note.name)
    private NoteModel: Model<NoteDocument>,
  ) {}

  async findAllNotes(@Req() req) {
    const Note = await this.NoteModel.find({
      user: req.user._id,
      deleted: false,
    });
    return Note;
  }
  async findOne(NoteId: string, @Req() req) {
    const Note = await this.NoteModel.findOne({
      _id: NoteId,
      user: req.user._id,
      deleted: false,
    });
    if (!Note) {
      throw new NotFoundException('The note not found');
    }

    return Note;
  }

  async store(NoteData: CreateNoteDto, NoteId: string, @Req() req) {
    const newNote = new this.NoteModel({
      _id: NoteId,
      user: req.user._id,
      title: NoteData.title,
      description: NoteData.description,
    });
    await newNote.save();

    return newNote;
  }
  async updateOne(NoteData: CreateNoteDto, NoteId: string, @Req() req) {
    let Note = await this.NoteModel.findOne({
      _id: NoteId,
      user: req.user._id,
      deleted: false,
    });
    if (!Note) {
      throw new NotFoundException('The Note not found');
    }

    await Note.updateOne({
      $set: {
        title: NoteData.title,
      },
    });

    Note = await this.NoteModel.findOne({
      _id: NoteId,
      user: req.user._id,
      deleted: false,
    });

    return Note;
  }
  async hardDeleteOne(NoteId: string, @Req() req) {
    const Note = await this.NoteModel.findOne({
      _id: NoteId,
      user: req.user._id,
    });
    if (!Note) {
      throw new NotFoundException('the Note not found');
    }
    await this.NoteModel.deleteOne({
      _id: NoteId,
      user: req.user._id,
    });
  }
}
