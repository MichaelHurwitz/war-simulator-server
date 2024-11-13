import organizations from "../data/organizations.json";
import User, { Missile } from "../models/user";


export const getMissilesForOrganization = (organizationName: string): string[] => {
    const organization = organizations.find((org) => org.name === organizationName);
  
    if (!organization) {
      throw new Error(`Organization ${organizationName} not found`);
    }
  
    const missileNames = organization.resources.map((resource: any) => {
      return typeof resource === "string" ? resource : resource.name;
    });
  
    return missileNames;
  };
  

  export const updateMissileCount = async (
    userId: string,
    missileName: string,
    change: number
  ): Promise<void> => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const missile = user.missiles.find((m: Missile) => m.name === missileName);
    if (!missile) {
      throw new Error(`Missile ${missileName} not found in user's inventory`);
    }
  
    if (missile.amount + change < 0) {
      throw new Error(`Not enough missiles of type ${missileName}`);
    }
  
    missile.amount += change;
    await user.save();
  };

  export const getMissileCount = async (
    userId: string,
    missileName: string
  ): Promise<number> => {
    const user = await User.findById(userId);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const missile = user.missiles.find((m: Missile) => m.name === missileName);
    return missile ? missile.amount : 0;
  };
  