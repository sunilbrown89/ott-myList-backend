import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlacklistedToken from "../models/TokenBlacklist";


export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      preferences: {
        favoriteGenres: [],
        dislikedGenres: [],
      },
      watchHistory: [],
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Server error", error });
  }
};





export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
};
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    
    const decoded: any = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

   
    await BlacklistedToken.create({ token, expiresAt });

    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};