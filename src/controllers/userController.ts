import { Request, Response } from "express";
import { registerUser, loginUser, updateUserMissiles } from "../services/userService";


export const register = async (req: Request, res: Response) => {
  const { username, password, organization, region } = req.body;

  try {
    const newUser = await registerUser({ username, password, organization, region });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred during registration" });
    }
  }
};


export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const token = await loginUser({ username, password });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "An unknown error occurred during login" });
    }
  }
};


export const updateUserMissilesController = async (req: Request, res: Response): Promise<void> => {
    const { missileName, amount } = req.body;
  
    try {
      const userId = req.user?.id; 
  
      if (!userId) {
        res.status(401).json({ message: "User not authenticated" });
        return; 
      }
  
      const updatedUser = await updateUserMissiles(userId, missileName, amount);
      res.status(200).json({ message: "Missiles updated successfully", user: updatedUser });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred while updating missiles" });
      }
    }
  };
