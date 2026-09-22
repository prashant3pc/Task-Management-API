import express from "express";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";
import notfoundError from "./middleware/notfoundError.js";

const app = express();

app.use(express.json());

app.use(logger);

app.use(userRoutes);
app.use(taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(notfoundError);
app.use(errorHandler);

export default app;
