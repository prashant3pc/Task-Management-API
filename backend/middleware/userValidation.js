import { body, validationResult } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a name")
    .isLength({ min: 3 })
    .withMessage("Please enter a name at least 3 characters"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .notEmpty()
    .withMessage("Please enter a email"),

  body("password")
    .notEmpty()
    .withMessage("Please enter a password")
    .isLength({ min: 8 })
    .withMessage("Please enter at least 8 characters"),
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Please enter an email")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Please enter a password")
    .isLength({ min: 8 })
    .withMessage("Please enter at least 8 characters"),
];

export const validate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      success: false,
      message: "Validation Failed",
      data: errors.array(),
    });
  }
  next();
};
