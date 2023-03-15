import express from "express"
import { getAllExercises, getExercisesByType } from "../controllers/exerciseController.js"


export const exerciseRoutes = () => {

   const  exerciseRoute= express()

   exerciseRoute.get("/", getExercisesByType)
   exerciseRoute.get("/getallexercises", getAllExercises)

   return exerciseRoute

}