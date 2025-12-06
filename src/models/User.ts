import mongoose, { Schema, Document } from "mongoose";


export type Genre =
  | "Action"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Romance"
  | "SciFi";

// User interface
export interface IUser extends Document {
  name: string;         
  email: string;      
  password: string;  
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: {
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }[];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    preferences: {
      favoriteGenres: [{ type: String }],
      dislikedGenres: [{ type: String }],
    },

    watchHistory: [
      {
        contentId: { type: String },
        watchedOn: { type: Date },
        rating: { type: Number },
      },
    ],
  },
  { timestamps: true }
);


export default mongoose.model<IUser>("User", UserSchema);
