import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = await Task.create({
    title,
    description,
    status,
  });
  return res.json({
    success: true,
    data: newTask,
  });
});

export const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({});
  res.json({
    success: true,
    message: "All your tasks is here",
    data: tasks,
  });
});

export const getoneTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  res.json({
    success: true,
    message: "your single task is here",
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const id = req.params.id;
  const task = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true },
  );
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  res.json({
    success: true,
    message: "Task updated",
    data: task,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    return res.json({
      success: false,
      message: "Task not found",
    });
  }
  res.json({
    success: true,
    message: "Task deleted successfuly",
    data: task,
  });
});
