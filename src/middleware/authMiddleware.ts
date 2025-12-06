import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/TokenBlacklist";

interface JwtPayload {
  id: string;
  email: string;
}
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ message: "Token is invalidated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
