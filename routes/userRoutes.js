import express from "express"
import {getUserWorkouts, registerUser} from "../controllers/userController.js"
import { loginUser, getUser } from "../controllers/userController.js";
import {protectRoute} from "../middleware/authmiddleware.js"

 export const UserRouter =() => {

    const userRouter = express();

    userRouter.post("/signup", registerUser)
    userRouter.post("/login", loginUser);
    userRouter.get("/profile", protectRoute, getUser)
    userRouter.get("/getUserWorkouts", getUserWorkouts);

    return userRouter
}

