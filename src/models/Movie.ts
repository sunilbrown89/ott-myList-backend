import mongoose, { Schema, Document } from "mongoose";

export type Genre = "Action" | "Comedy" | "Drama" | "Fantasy" | "Horror" | "Romance" | "SciFi";

export interface IMovie extends Document {
  title: string;
  description: string;
  genres: Genre[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  genres: [{ type: String, enum: ["Action", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "SciFi"] }],
  releaseDate: { type: Date, required: true },
  director: { type: String, default: "" },
  actors: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IMovie>("Movie", MovieSchema);
