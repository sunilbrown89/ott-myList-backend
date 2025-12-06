import { Router } from "express";
import { registerUser, loginUser, logoutUser, userProfile } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect,userProfile);
router.post("/logout", protect, logoutUser);

export default router;
