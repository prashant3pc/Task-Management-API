import { body, validationResult } from "express-validator";

export const createTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Please enter the title")
    .isLength({ min: 3 })
    .withMessage("Please enter at lest 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Please enter the description")
    .isLength({ min: 3 })
    .withMessage("Please enter at lest 3 characters"),

  body("status")
    .notEmpty()
    .withMessage("Please select the status")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Please select a valid status"),
];

export const updateTaskValidation = [
  body("title")
    .notEmpty()
    .withMessage("Please enter the title")
    .isLength({ min: 3 })
    .withMessage("Please enter at lest 3 characters"),

  body("description")
    .notEmpty()
    .withMessage("Please enter the description")
    .isLength({ min: 3 })
    .withMessage("Please enter at lest 3 characters"),

  body("status")
    .notEmpty()
    .withMessage("Please select the status")
    .isIn(["pending", "in-progress", "completed"])
    .withMessage("Please select a valid status"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      succes: false,
      message: "Error Occured",
      data: errors.array(),
    });
  }
  next();
};
