import { Router } from "express";
import { addToMyList, listMyItems, removeFromMyList } from "../controllers/myListController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/addToMyList", protect, addToMyList);
router.delete("/:contentId", protect, removeFromMyList);
router.get("/showAll", protect, listMyItems);

export default router;
