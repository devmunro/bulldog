import express from "express"
import {createWorkout} from  "../controllers/workoutController.js"


 export const WorkoutRouter =() => {

    const workoutRouter = express();

    workoutRouter.post("/createworkout", createWorkout)
   
    return workoutRouter
}

