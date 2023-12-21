import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsEmail , IsString } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
@Schema()
export class User {
  
  @IsString()
  @Prop({ required: true})
  firstName: string;

  @IsString()
  @Prop({ required: true})
  lastName: string;

  @IsString()
  @Prop({ required: true })
  password: string;

  @IsEmail()
  @Prop({ required: true, unique: true })
  email: string;
  @IsString()
  @Prop({ required: true })
  roles: Role[];
 
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
