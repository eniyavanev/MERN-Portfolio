import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const checkToken = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  if (token) {
   // console.log("Token:", token);
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //console.log("Decoded token:", decoded); // Log the decoded token

      req.user = await User.findById(decoded.id).select("-password");
      //console.log("User found:", req.user); // Log the user found by ID

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized, user not found" });
      }

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
});

export { checkToken };
