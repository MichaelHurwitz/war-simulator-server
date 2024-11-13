import { Request, Response } from "express";
import { launchMissile } from "../services/attackService";
import { interceptMissile } from "../services/defenseService";
import { getSocketInstance } from "../sockets/webSocket";

export const launchMissileController = async (req: Request, res: Response): Promise<void> => {
  const { region, missileName } = req.body;

  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const userId = req.user.id;
    const io = getSocketInstance();

    await launchMissile(io, userId, region, missileName);
    res.status(200).json({ message: "Missile launched successfully" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error occurred" });
  }
};

export const interceptMissileController = async (req: Request, res: Response): Promise<void> => {
  const { region, missileName, interceptorName } = req.body;

  try {
    if (!req.user || !req.user.id) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const userId = req.user.id;
    const io = getSocketInstance();

    await interceptMissile(io, userId, region, missileName, interceptorName);
    res.status(200).json({ message: "Interception successful" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error occurred" });
  }
};
