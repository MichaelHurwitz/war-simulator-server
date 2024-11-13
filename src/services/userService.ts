import bcrypt from "bcrypt";
import User from "../models/user";
import organizations from "../data/organizations.json"; 
import { getMissilesForOrganization } from "../utils/helperFuncs";

export const registerUser = async ({ username, password, organization, region }: any) => {
    const orgData = organizations.find((org) => org.name === organization);
    if (!orgData) {
      throw new Error("Invalid organization");
    }
  
    if (organization.startsWith("IDF") && !region) {
      throw new Error("Region is required for IDF organizations");
    }
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("Username already taken");
    }
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const allowedMissiles = getMissilesForOrganization(organization);
  
    const missiles = allowedMissiles.map((missileName) => ({
      name: missileName,
      amount: 0,
    }));
  
    const newUser = new User({
      username,
      password: hashedPassword,
      organization,
      region,
      missiles,
    });
  
    await newUser.save();
    return newUser;
  };

export const loginUser = async ({ username, password }: any) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  return user;
};

export const updateUserMissiles = async (userId: string, missileName: string, amount: number) => {
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const allowedMissiles = getMissilesForOrganization(user.organization);
  
      if (!allowedMissiles.includes(missileName)) {
        throw new Error(`Missile ${missileName} is not allowed for organization ${user.organization}`);
      }
  
      const missile = user.missiles.find((m) => m.name === missileName);
  
      if (missile) {
        missile.amount += amount;
  
        if (missile.amount < 0) {
          throw new Error("Missile count cannot be negative");
        }
      } else {
        user.missiles.push({ name: missileName, amount });
      }
  
      await user.save();
  
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };