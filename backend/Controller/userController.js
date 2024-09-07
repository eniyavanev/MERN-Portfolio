import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../GenerateToken/generateToken.js";

// Signup handler
const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Helper function for sending error responses
  // const sendErrorResponse = (statusCode, message) => {
  //   res.status(statusCode);
  //   return next(new Error(message));
  // };

  // Validate required fields
  if (!name || !email || !password) {
    return next(new Error("Please add all fields"));
  }

  // Validate password length
  if (password.length < 8) {
    return next(new Error("Password must be at least 8 characters"));
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}$/;
  if (!emailRegex.test(email)) {
    return next(new Error("Invalid email format"));
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new Error("User Already Exists"));
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    if (newUser) {
      generateToken(res, 201, newUser._id);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        message: "User Created Successfully",
      });
    }
  } catch (err) {
    // Handle server errors
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
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
  } else {
    return next(new Error("Invalid Email or Password"));
  }

  // Send response
  res.status(200).json({
    _id: findUser._id,
    name: findUser.name,
    email: findUser.email,
    isAdmin: findUser.isAdmin,
    message: "Login Successful",
  });
});

//logout handler
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logout Successful",
  });
});

//get single user profile
const getUserProfile = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "User not found" });
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
const updateUserProfile = asyncHandler(async (req, res) => {
  // Destructure values from the request body
  const { name, email, password } = req.body;
  // Validate password length
  if (password.length < 8) {
    return next(new Error("Password must be at least 8 characters"));
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}$/;
  if (!emailRegex.test(email)) {
    return next(new Error("Invalid email format"));
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  // Update fields if provided
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

export { createUser, loginUser, logoutUser, getUserProfile, updateUserProfile };
