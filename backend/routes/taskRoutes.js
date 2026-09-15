import express from "express";
import {
  createTask,
  deleteTask,
  getoneTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

import {
  createTaskValidation,
  updateTaskValidation,
} from "../middleware/taskValidation.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/api/tasks", protect, createTaskValidation, createTask);
router.get("/api/tasks", protect, getTasks);
router.get("/api/tasks/:id", protect, getoneTask);
router.put("/api/tasks/:id", protect, updateTaskValidation, updateTask);
router.delete("/api/tasks/:id", protect, deleteTask);

export default router;
