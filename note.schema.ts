import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import * as mongoose from 'mongoose';
export type NoteDocument = mongoose.HydratedDocument<Note>;
@Schema()
export class Note {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  deleted: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
