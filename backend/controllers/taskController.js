import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";

export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const newTask = await Task.create({
    title,
    description,
    status,
    user: req.user.id,
  });
  return res.json({
    success: true,
    data: newTask,
  });
});

// filtering + sorting + pagination
export const getTasks = asyncHandler(async (req, res) => {
  const filter = { user: req.user.id };
  const sort = {};

  // Sorting
  if (req.query.sort === "newest") {
    sort.createdAt = -1;
  }

  if (req.query.sort === "oldest") {
    sort.createdAt = 1;
  }

  // Filtering
  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.title) {
    filter.title = req.query.title;
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter).sort(sort).skip(skip).limit(limit);

  return res.json({
    success: true,
    message: "All your tasks are here",
    page,
    limit,
    data: tasks,
  });
});

// writing sorting
// export const getTasks = asyncHandler(async (req, res) => {
//   const filter = { user: req.user.id };

//   const sort = {};

//   if (req.query.sort === "newest") {
//     sort.createdAt = -1;
//   }

//   if (req.query.sort === "oldest") {
//     sort.createdAt = 1;
//   }

//   if (req.query.status) {
//     filter.status = req.query.status;
//   }

//   if (req.query.title) {
//     filter.title = req.query.title;
//   }

//   const tasks = await Task.find(filter).sort(sort);

//   return res.json({
//     success: true,
//     message: "All your tasks is here",
//     data: tasks,
//   });
// });

//ownership+filter by status + filter by search
// export const getTasks = asyncHandler(async (req, res) => {
//   const filter = { user: req.user.id };

//   if (req.query.status) {
//     filter.status = req.query.status;
//   }
//   if (req.query.title) {
//     filter.title = req.query.title;
//   }
//   const tasks = await Task.find(filter);
//   return res.json({
//     success: true,
//     message: "All your tasks is here",
//     data: tasks,
//   });
// });

//OWNERSHIP ONLY THIS
// export const getTasks = asyncHandler(async (req, res) => {

//   const tasks = await Task.find({
//     user: req.user.id,
//   });

//   return res.json({
//     success: true,
//     message: "All your tasks is here",
//     data: tasks,
//   });

// });

//filter by searchfilter only
// export const getSearch = asyncHandler(async (req, res) => {
//   const searchFilter = { user: req.user.id };

//   if (req.query.title) {
//     searchFilter.title = req.query.title;
//   }
//   const tasks = await Task.find(searchFilter);
//   return res.json({
//     success: true,
//     message: "Your search title is here",
//     data: tasks,
//   });
// });

//filter by status
// export const getTasks = asyncHandler(async (req, res) => {

//   const filter = { user: req.user.id };

//   if (req.query.status) {
//     filter.status = req.query.status;
//   }

//   const tasks = await Task.find(filter);

//   return res.json({
//     success: true,
//     message: "All your tasks is here",
//     data: tasks,
//   });

// });

export const getoneTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  if (task.user.toString() === req.user.id) {
    return res.json({
      success: true,
      message: "your single task is here",
      data: task,
    });
  } else {
    return res.status(403).json({
      success: false,
      message: "id doesnt match",
    });
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, status },
    { new: true },
  );
  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  if (task.user.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  const deletedTask = await Task.findByIdAndDelete(id);
  res.json({
    success: true,
    message: "Task deleted successfuly",
    data: deletedTask,
  });
});
