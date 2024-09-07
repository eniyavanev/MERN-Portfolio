import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets it as a cookie in the response.
 *
 * @param {Object} res - The response object from Express.
 * @param {number} statusCode - The HTTP status code to set in the response.
 * @param {string} id - The user ID to include in the token payload.
 */
// Corrected generateToken function definition
const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d", // Token expiration time
  });

  // Set the response status code
  if (statusCode) {
    res.status(statusCode);
  }

  // Set the token as a cookie in the response
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export default generateToken;
