import mongoose, { Schema, Document } from "mongoose";
import { OrganizationEnum } from "./organizationEnum";

export interface Missile {
  name: string;
  amount: number;
}

export interface IUser extends Document {
  username: string;
  password: string;
  organization: OrganizationEnum;
  region?: string;
  missiles: Missile[];
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    organization: {
      type: String,
      enum: Object.values(OrganizationEnum),
      required: true,
    },
    region: {
      type: String,
      required: function (this: IUser) {
        return this.organization.startsWith("IDF");
      },
    },
    missiles: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        organization: string;
        region?: string;
      };
    }
  }
}


const User = mongoose.model<IUser>("User", UserSchema);
export default User;
