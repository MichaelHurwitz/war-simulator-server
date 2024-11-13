import mongoose, { Schema, Document } from "mongoose";

export interface ILaunchEvent extends Document {
    region: string;
    missileName: string;
    launchedBy: string;
    interceptorName?: string; 
    interceptedBy?: string;
    success?: boolean;
    remainingMissiles?: number; 
    remainingInterceptors?: number; 
    timestamp: Date;
  }
  

const LaunchEventSchema: Schema = new mongoose.Schema({
    region: {
      type: String,
      required: true,
    },
    missileName: {
      type: String,
      required: true,
    },
    launchedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interceptorName: {
      type: String,
    },
    interceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    success: {
      type: Boolean,
    },
    remainingMissiles: {
      type: Number,
      default: null, 
    },
    remainingInterceptors: {
      type: Number,
      default: null, 
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  

const LaunchEvent = mongoose.model<ILaunchEvent>("LaunchEvent", LaunchEventSchema);
export default LaunchEvent;
