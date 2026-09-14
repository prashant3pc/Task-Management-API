import User from "../models/User.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  return res.json({
    success: true,
    message: "User created successfully",
    data: user,
  });
};

const loginUser = async (req, res) => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
};
