import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Passenger {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ type: Date, required: false })
  deletedAt: Date;

  @Prop()
  userId: string;

  @Prop()
  squareId: string;
}

export type PassengerDocument = HydratedDocument<Passenger>;

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
