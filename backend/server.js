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

// 
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for port 465, false for other ports
//   auth: {
//     user: process.env.NODEMAILER_USER,
//     pass: process.env.NODEMAILER_PWD,
//   },
// });

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: process.env.NODEMAILER_USER, // sender address
//     to: process.env.NODEMAILER_USER, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
