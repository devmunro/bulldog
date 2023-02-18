import express from "express"
import {createWorkout, findworkouts, addExercise, findSingleWorkout} from  "../controllers/workoutController.js"


 export const WorkoutRouter =() => {

    const workoutRouter = express();
// full route example /api/workout/createworkout
    workoutRouter.post("/createworkout", createWorkout) //
    workoutRouter.get("/findworkouts", findworkouts) //
    workoutRouter.get("/findsingleworkout", findSingleWorkout) //
    workoutRouter.put("/addexercise", addExercise) //

    return workoutRouter
}

