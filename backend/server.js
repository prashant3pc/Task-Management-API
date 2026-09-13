import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
connectDB();

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
