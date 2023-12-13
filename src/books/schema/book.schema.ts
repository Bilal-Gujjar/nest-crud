import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
@Schema()
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true, ref: 'User' })
  createdBy: string;

  @Prop({ required: true })
  description: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
