import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface DecodedToken extends JwtPayload {
    id: string;
  }
  
  export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header("Authorization")?.split(" ")[1]; 
    if (!token) {
      res.status(401).json({ message: "No token, authorization denied" });
      return; 
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
  
      console.log("Decoded token:", decoded);
      if (!decoded.id) {
        res.status(400).json({ message: "Invalid token structure: missing user ID" });
        return;
      }
  
      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(404).json({ message: "User not found" }); 
        return; 
      }
  
      (req as any).user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid" });
    }
  };
  