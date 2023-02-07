import express from "express"
import {createWorkout} from  "../controllers/workoutController.js"


 export const WorkoutRouter =() => {

    const workoutRouter = express();
// full route example /api/workout/createworkout
    workoutRouter.post("/createworkout", createWorkout) // full route example
   
    return workoutRouter
}

