import { Request, Response } from "express";
import MyList, { ContentType } from "../models/MyList";
import Movie from "../models/Movie";
import TVShow from "../models/TVShow";


export const addToMyList = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; 
    const { contentId, type } = req.body as { contentId: string; type: ContentType };

    if (!["Movie", "TVShow"].includes(type)) {
      return res.status(400).json({ message: "Invalid content type" });
    }

   
    const contentExists =
      (type === "Movie" && (await Movie.findById(contentId))) ||
      (type === "TVShow" && (await TVShow.findById(contentId)));

    if (!contentExists) return res.status(404).json({ message: "Content not found" });

    const myListItem = await MyList.create({ userId, contentId, type });
    return res.status(201).json({ message: "Added to My List", item: myListItem });
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ message: "Item already in My List" });
    return res.status(500).json({ message: "Server error", error });
  }
};


export const removeFromMyList = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;  
    const { contentId } = req.params;   
    const deletedItem = await MyList.findOneAndDelete({ userId, contentId });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in My List" });
    }
    return res.json({ message: "Removed from My List" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};



export const listMyItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; 
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const total = await MyList.countDocuments({ userId });

    const items = await MyList.find({ userId })
      .sort({ addedAt: -1 })
      .skip(skip)
      .limit(limit);

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        let details = null;
        if (item.type === "Movie") details = await Movie.findById(item.contentId);
        if (item.type === "TVShow") details = await TVShow.findById(item.contentId);
        return { type: item.type, addedAt: item.addedAt, details };
      })
    );

    return res.json({
      total,
      page,
      limit,
      items: detailedItems,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


