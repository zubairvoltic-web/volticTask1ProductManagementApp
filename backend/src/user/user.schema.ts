import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['admin', 'manager'],
    default: 'manager',
  })
  role: string;

  // 👇 only for Managers → which Admin they belong to
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  admin: Types.ObjectId | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
