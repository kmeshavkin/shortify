import {
  Schema, model, Types, Document,
} from 'mongoose';

export interface IUser extends Document {
  username: string,
  password: string,
  links: string[]
}

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
});

export const UserModel = model<IUser>('User', schema);
