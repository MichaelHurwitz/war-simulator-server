import LaunchEvent from "../models/launchEvent";
import User from "../models/user";
import { Server } from "socket.io";

export const launchMissile = async (
  io: Server,
  userId: string,
  region: string,
  missileName: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const missile = user.missiles.find((m) => m.name === missileName);
  if (!missile || missile.amount <= 0) {
    throw new Error("Insufficient missiles available");
  }

  missile.amount -= 1;
  await user.save();

  const launchEvent = new LaunchEvent({
    region,
    missileName,
    launchedBy: userId,
    remainingMissiles: missile.amount, 
  });
  await launchEvent.save();

  io.to(region).emit("missile_launched", {
    missileName,
    region,
    remainingMissiles: missile.amount,
  });
};
