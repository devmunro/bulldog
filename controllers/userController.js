import { user } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  const { name, dob, email, password } = req.body;
  const userAlreadyExists = await user.findOne({ email });

  if (!name || !dob || !email || !password) {
    return res.status(400).json({ error: "Please complete all fields" });
  }

  if (userAlreadyExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user

  try {
    const createUser = await user.create({
      name,
      dob,
      email,
      password: hashedPassword,
    });
    res.status(204);
  } catch (error) {
    res.status(400).json({ error: "user not created" });
  }
};

//##### LOGIN USER ####
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password fields are present
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide both email and password" });
  }

  // Find user in database by email
  const findUser = await user.findOne({ email });
  if (!findUser) {
    return res
      .status(400)
      .json({ error: "User with provided email not found" });
  }
  // Compare provided password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, findUser.password);
  if (!isMatch) {
    console.log("password incorrect");
    return res.status(403).json({ error: "Password is incorrect" });
  }

  // Generate JWT token
  const token = generateToken(findUser._id);

  if (findUser && (await bcrypt.compare(password, findUser.password))) {
    res.json({
      token: generateToken(findUser._id),
    });
  } else {
    return res.status(400).json("Invalid user data");
  }
};

//GET USER PROFILE

export const getUser = async (req, res) => {
  res.status(200).json(req.user);
};

// get user workouts

export const getUserWorkouts = async (req, res) => {
  const { _id } = req.body;
  console.log(req.body);
  try {
    console.log(userID);
    const findUser = await user.findById({ userID });
    console.log(findUser, "stuff");
    res.json({
      workouts: findUser.workouts,
    });
  } catch (error) {
    console.log("cant get workouts");
  }
};
