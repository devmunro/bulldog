import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import { config } from "./config/config.js";
import { UserRouter } from "./routes/userRoutes.js";
import { exerciseRoutes } from "./routes/exerciseRoutes.js";
import { WorkoutRouter } from "./routes/workoutRoutes.js";
import { WorkoutStatsRouter } from "./routes/workoutStatsRoutes.js";
import { bodyStatRoutes } from "./routes/bodyStatRoutes.js";

const { host, user, password, port } = config;

const dbConnect = `mongodb+srv://${user}:${password}@${host}`;
mongoose.set("strictQuery", true);

const app = express();

app.use(
  cors({
    origin: ["https://bulldog-two.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const connectToMongo = async () => {
  try {
    await mongoose.connect(dbConnect);
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

connectToMongo();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", UserRouter());
app.use("/api/exercises", exerciseRoutes());
app.use("/api/workout", WorkoutRouter());
app.use("/api/workoutStats", WorkoutStatsRouter());
app.use("/api/bodyStats", bodyStatRoutes());

app.listen(port, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`API SERVER IS NOW RUNNING on port: ${port}`);
  }
});

export default app;

export { connectToMongo };
