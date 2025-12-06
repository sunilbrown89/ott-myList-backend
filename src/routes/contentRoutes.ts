import { Router } from "express";
import { listMovies, listTVShows } from "../controllers/contentController";

const router = Router();

router.get("/movies", listMovies);
router.get("/tvshows", listTVShows);

export default router;
