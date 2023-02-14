import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { user } from "../models/userSchema.js";

dotenv.config();


export const protectRoute = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        let token = req.headers.authorization.split(" ")[1];
console.log(token)
      // Verify token
      console.log("verifing start")
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log('decoded', decoded);

      // Get user from the token
      const founduser = await user.findById(decoded.userId).select("-password");

      console.log('user', founduser);

      if (!founduser) {
        throw new Error('User not found');
      }

      req.user = founduser;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).send({ message: "NOT authorized " });
    }
  }
};
