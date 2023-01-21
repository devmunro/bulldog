import express from "express"


export const exerciseRoutes = () => {

   const  exerciseRoute= express()

   exerciseRoute.get("/", getAllExercises)


   return exerciseRoute

}