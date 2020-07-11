import { Schema, model, Types, Document } from 'mongoose';

export interface ILink extends Document {
  from: string;
  to: string;
  code: string;
  date: Date;
  clicksLeft: number;
  owner: string;
}

const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicksLeft: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' },
});

export const LinkModel = model<ILink>('Link', schema);
