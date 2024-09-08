import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../GenerateToken/generateToken.js";
import jwt from "jsonwebtoken";
import { sendResetPasswordLink } from "../GenerateToken/resetpassword.js";

// Signup handler
const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(new Error("Please add all fields"));
  }

  // Validate password length
  if (password.length < 8) {
    return next(new Error("Password must be at least 8 characters"));
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(email)) {
    return next(new Error("Invalid email format"));
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    if (newUser) {
      generateToken(res, 201, newUser._id);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        message: "User Created Successfully",
      });
    }
  } catch (err) {
    return next(err); // Pass the error to the error handler
  }
});

// Login handler
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return next(new Error("Please add all fields"));
  }

  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.matchPassword(password))) {
    generateToken(res, 200, findUser._id);
    return res.status(200).json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
      isAdmin: findUser.isAdmin,
      message: "Login Successful",
    });
  }
  
  return next(new Error("Invalid Email or Password"));
});

// Logout handler
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logout Successful",
  });
});

// Get single user profile
const getUserProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User1 not found" });
  }

  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  };
  res.status(200).json(user);
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (password && password.length < 8) {
    return next(new Error("Password must be at least 8 characters"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (email && !emailRegex.test(email)) {
    return next(new Error("Invalid email format"));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    user.password = password;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    message: "User updated successfully",
  });
});

// Forget password handler
const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new Error("Please add email"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found with this email"));
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 300,
  });

  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  user.reset_password_token = token;
  user.reset_password_expires = date;
  await user.save();

  const verificationResult = await sendResetPasswordLink(email, user.name, token);

  if (verificationResult.error) {
    return next(new Error("Reset password link failed to send"));
  }

  res.status(200).json({
    success: true,
    message: "Reset password link sent successfully",
  });
});

// Reset password handler
const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) {
    return next(new Error("Please add password"));
  }
  if (!token) {
    return next(new Error("Please add token"));
  }

  const user = await User.findOne({
    reset_password_token: token,
    reset_password_expires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new Error("User not found with this token"));
  }

  user.password = password;
  user.reset_password_token = undefined;
  user.reset_password_expires = undefined;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

export {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgetPassword,
  resetPassword,
};
