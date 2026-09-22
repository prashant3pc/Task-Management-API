console.log("TEST SETUP LOADED");
import "dotenv/config";
import { beforeAll, afterAll } from "vitest";
import mongoose from "mongoose";
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});
