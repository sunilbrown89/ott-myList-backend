import mongoose, { Schema, Document } from "mongoose";

export type ContentType = "Movie" | "TVShow";

export interface IMyList extends Document {
  userId: string;
  contentId: string;
  type: ContentType;
  addedAt: Date;
}

const MyListSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    contentId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["Movie", "TVShow"], required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

MyListSchema.index({ userId: 1, contentId: 1 }, { unique: true });

export default mongoose.model<IMyList>("MyList", MyListSchema);
