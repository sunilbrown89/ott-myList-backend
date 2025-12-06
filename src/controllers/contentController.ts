import { Request, Response } from "express";
import Movie from "../models/Movie";
import TVShow from "../models/TVShow";


export const listMovies = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await Movie.countDocuments();

    const movies = await Movie.find()
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({ total, page, limit, movies });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};







export const listTVShows = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const total = await TVShow.countDocuments();

    const tvShows = await TVShow.find()
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit);

    return res.json({ total, page, limit, tvShows });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
