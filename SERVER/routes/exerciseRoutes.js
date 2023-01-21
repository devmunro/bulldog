import express from "express"
import { getExercisesByType } from "../controllers/exerciseController.js"


export const exerciseRoutes = () => {

   const  exerciseRoute= express()

   exerciseRoute.get("/", getExercisesByType)


   return exerciseRoute

}