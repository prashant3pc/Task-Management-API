import "dotenv/config";
import connectDB from "./config/db.js";
import app from "./app.js";

connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
