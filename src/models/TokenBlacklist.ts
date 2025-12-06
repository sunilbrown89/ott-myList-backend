import mongoose, { Schema, Document } from "mongoose";

export interface IBlacklistedToken extends Document {
  token: string;
  expiresAt: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model<IBlacklistedToken>("TokenBlacklist", TokenBlacklistSchema);
