import { Server } from "socket.io";
import User from "../models/user";
import LaunchEvent from "../models/launchEvent";

export const interceptMissile = async (
  io: Server,
  userId: string,
  region: string,
  missileName: string,
  interceptorName: string
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const interceptor = user.missiles.find((m) => m.name === interceptorName);
  if (!interceptor || interceptor.amount <= 0) {
    throw new Error("Insufficient interceptors available");
  }

  const launchEvent = await LaunchEvent.findOne({ region, missileName, success: undefined });
  if (!launchEvent) {
    throw new Error("No active missile found for interception");
  }

  const canIntercept = interceptorName.includes(missileName);
  if (!canIntercept) {
    io.to(region).emit("interception_failed", { region, missileName });
    return;
  }

  interceptor.amount -= 1;
  await user.save();

  launchEvent.interceptorName = interceptorName;
  launchEvent.interceptedBy = userId;
  launchEvent.success = true;
  launchEvent.remainingInterceptors = interceptor.amount; 
  await launchEvent.save();

  io.to(region).emit("interception_result", {
    missileName,
    region,
    result: "Interception successful",
    remainingInterceptors: interceptor.amount,
  });
};
