import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import myListRoutes from "./routes/myListRoutes";
import contentRoutes from "./routes/contentRoutes";
// import { insertSeedData } from "./data/seed";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/myList", myListRoutes);
app.use("/api/v1/content", contentRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  await connectDB();
  // await insertSeedData();
  console.log(`Server running on port ${PORT}`);
});
