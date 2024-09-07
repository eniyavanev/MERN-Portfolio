import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";
import userRoutes from "./Routes/userRoutes.js";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

const port = process.env.PORT;
// app.get("/", (req, res) => {
//  res.send("Hello World eniyavan");
//  throw new Error("Something went wrong");
// });
//console.log(process.env.MONGO_URI);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
