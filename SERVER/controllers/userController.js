import {user} from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config(); 

//generate token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
  };

export const registerUser = async (req,res) => {
const {name, dob, email, password} = req.body;
const userAlreadyExists = await user.findOne({email});

if(!name || !dob  || !email || !password) {
    return res.status(400).json({error: "Please complete all fields"})
}

if (userAlreadyExists) {
    return res.status(400).json({error: "User already exists"})
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


    })
    res.status(201).json({
        id: createUser.id,
        dob: createUser.dob,
        name: createUser.name,
        email: createUser.email,
        workouts: [],
        token: generateToken(createUser.id)
    })
}catch(error) {

    res.status(400).json({error: "user not created"})
}

}

//##### LOGIN USER ####
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
     const findUser = await user.findOne({ email });
  
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      res.json({
        id: findUser.id,
        name: findUser.name,
        email: findUser.email,
        workouts: findUser.workouts,
        token: generateToken(findUser._id),
        
      });
      console.log("logged in");
    } else {
      return res.status(400).json("Invalid user data");
    }
  };