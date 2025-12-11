import mongoose from "mongoose";
import { env } from "../env";

let connected = false;

export async function connectMongo(): Promise<boolean> {
  if (connected && isMongoReady()) return true;
  const uri = env.MONGODB_URI;
  const dbName = env.MONGODB_DB;
  if (!uri) {
    console.warn("MONGODB_URI not set. Falling back to local JSON store.");
    return false;
  }
  try {
    await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 2000 });
    connected = true;
    console.log("MongoDB connected to", dbName);
    return true;
  } catch (e) {
    console.error("Mongo connection error", e);
    return false;
  }
}

export function isMongoReady(): boolean {
  // 1 = connected
  return mongoose.connection?.readyState === 1;
}
