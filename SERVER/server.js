import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import {config} from "./config/config.js";
import {UserRouter} from "./routes/userRoutes.js"
import { exerciseRoutes } from "./routes/exerciseRoutes.js";
import path from "path";


const { host, user, password, port } = config;

const dbConnect = `mongodb+srv://${user}:${password}@${host}`;
mongoose.set("strictQuery", true);

const app = express();

const connectToMongo = async () => {
  try {
    await mongoose.connect(dbConnect);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", UserRouter());
app.use("/api/exercises", exerciseRoutes());

//Serve frontend

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('../bulldog/frontend/build')));
 app.get('*', (req,res) => (
  res.sendFile(path.resolve('../bulldog/frontend', 'build', 'index.html'))

 ))
}


app.listen(port, () => {
  console.log(`API SERVER IS NOW RUNNING on port: ${port}`);
});
