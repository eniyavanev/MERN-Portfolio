import User from "../Models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../GenerateToken/generateToken.js";
import jwt from "jsonwebtoken";
import { sendResetPasswordLink } from "../GenerateToken/resetpassword.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Signup handler
const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return next(new Error("Please add all fields"));
  }

  if (password.length < 8) {
    return next(new Error("Password must be at least 8 characters"));
  }

  if (password !== confirmPassword) {
    return next(new Error("Passwords do not match"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!emailRegex.test(email)) {
    return next(new Error("Invalid email format"));
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const randomOTP = Math.floor(100000 + Math.random() * 900000).toString();
    const defaultOTP = process.env.DEFAULT_OTP || "123456";
    const otpToUse =
      process.env.USE_DEFAULT_OTP === "true" ? randomOTP : defaultOTP;
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = await User.create({
      name,
      email,
      password,
      otp: otpToUse,
      otp_expiry: otpExpiration,
      default_otp: defaultOTP,
      default_otp_expiry: otpExpiration,
    });

    if (newUser) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PWD,
        },
      });

      const mailOptions = {
        from: `Hi ${name}, ${process.env.NODEMAILER_USER}`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${randomOTP}. It will expire in 10 minutes.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // console.error("Error while sending email:", error.message);
          return next(new Error("Failed to send OTP"));
        }
        //console.log("Email sent:", info.response);
        generateToken(res, 201, newUser._id);
        return res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          message: "User Created Successfully. OTP sent to your email.",
        });
      });
    }
  } catch (err) {
    // console.error("Error during user creation:", err);
    return next(err);
  }
});

const verifyOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  // Validate required fields
  if (!email || !otp) {
    return next(new Error("Please provide email and OTP"));
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert OTP to string for consistent comparison
    const otpStr = otp.toString();

    // Check if OTP matches and is not expired
    const isDefaultOTPUsed =
      process.env.USE_DEFAULT_OTP === "true" &&
      otpStr === process.env.DEFAULT_OTP;

    const isOTPValid = user.otp === otpStr && user.otp_expiry > new Date();

    if (isOTPValid || isDefaultOTPUsed) {
      // OTP is valid
      user.isVerified = true; // Set user as verified
      user.otp = undefined; // Clear OTP
      user.otp_expiry = undefined; // Clear OTP expiration

      await user.save(); // Save changes

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      // OTP is invalid or expired
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (err) {
    //console.error("Error during OTP verification:", err);
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
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

  const verificationResult = await sendResetPasswordLink(
    email,
    user.name,
    token
  );

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
  verifyOTP,
};
