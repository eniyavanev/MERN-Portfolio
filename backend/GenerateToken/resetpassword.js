import ejs from "ejs";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

// Get current file path and directory
const currentFilePath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilePath));
console.log(currentDirectory, "Current Directory");

// Config for nodemailer
const mail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PWD,
  },
});
//console.log(process.env.NODEMAILER_USER);

async function sendResetPasswordLink(email, name, token) {
  try {
    // Render the EJS template
    const templatePath = `${currentDirectory}/../Template/reset_pwd.ejs`;
    //console.log(templatePath), "Template Path";

    const renderedContent = await ejs.renderFile(templatePath, { token, name });

    // Log the rendered content for debugging
    //console.log("Rendered Content: ", renderedContent);

    // Mail options
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Reset Password",
      html: renderedContent,
    };

    // Send mail
    const verificationMail = await mail.sendMail(mailOptions);
    console.log("Email sent: ", verificationMail);

    return verificationMail;
  } catch (error) {
    // Log error details
    console.error("Error sending email: ", error);
    return error;
  }
}

export { sendResetPasswordLink };
