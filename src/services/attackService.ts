import { Server } from "socket.io";
import { updateMissileCount, getMissileCount } from "../utils/helperFuncs";

export const launchMissile = async (
  io: Server,
  userId: string,
  region: string,
  missileName: string
) => {
  const missileCount = await getMissileCount(userId, missileName);

  if (missileCount <= 0) {
    throw new Error(`No ${missileName} missiles available for launch`);
  }

  await updateMissileCount(userId, missileName, -1);

  io.to(region).emit("missile_launched", { region, missileName });

  const impactTime = 10;
  setTimeout(() => {
    io.to(region).emit("missile_impact", { region, missileName });
  }, impactTime * 1000);
};
