const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const config = require("./config/config.js");
const { host, user, password, port } = config;
const UserRouter = require("./routes/userRoutes.js");

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

app.listen(port, () => {
  console.log("API SERVER IS NOW RUNNING");
});
