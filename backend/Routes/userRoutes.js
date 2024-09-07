import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../Controller/userController.js";
import { checkToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

//endpoint for signup
router.route("/").post(createUser);

//endpoint for login
router.route("/login").post(loginUser);

//endpoint for logout
router.route("/logout").post(logoutUser);

//endpoint for profile
router.route("/profile").get(checkToken, getUserProfile);

//endpoint for profile update
router.route("/profile").put(checkToken, updateUserProfile);

export default router;
