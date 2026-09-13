import mongoose from "mongoose";

const taskschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 2,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskschema);
export default Task;
