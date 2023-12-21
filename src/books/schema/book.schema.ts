import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types} from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  createdBy: Types.ObjectId[];
}

export const BookSchema = SchemaFactory.createForClass(Book);