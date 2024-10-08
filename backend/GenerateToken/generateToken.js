import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (res, status, id) => {
     jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
    });
    res
        .status(status)
        .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        })
       
}
export default generateToken