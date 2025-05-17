import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Square {
  @Prop({ required: true })
  guildId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  otp: string;
}

export type SquareDocument = HydratedDocument<Square>;

export const SquareSchema = SchemaFactory.createForClass(Square);
