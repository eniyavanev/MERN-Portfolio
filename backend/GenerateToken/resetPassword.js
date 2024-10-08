import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();



const currentFilepath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilepath));
// console.log("file url",fileURLToPath(currentFilepath));
// console.log("current directory",currentDirectory);

const mail = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
});

async function sendResetPasswordLink(email, name, token) {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../Template/reset_pwd.ejs`,
      { name, token }
    );

    const mailOptions = {
      from: `Hi ${name}, ${process.env.NODEMAILER_USER}`,
      to: email,
      subject: "Reset Password",
      html: renderedContent,
    };

    const verificationInfo = await mail.sendMail(mailOptions);

    return verificationInfo;
  } catch (error) {
    console.log(error);
  }
}

export { sendResetPasswordLink };
