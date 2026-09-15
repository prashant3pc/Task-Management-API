import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import {
  registerValidation,
  loginValidation,
} from "../middleware/userValidation.js";

const router = express.Router();

router.post("/api/users/register", registerValidation, registerUser);
router.post("/api/users/login", loginValidation, loginUser);

export default router;
