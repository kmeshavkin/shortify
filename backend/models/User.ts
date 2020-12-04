import { Schema, model, Types, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  googleId: string;
  links: string[];
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

export const UserModel = model<IUser>('User', schema);
