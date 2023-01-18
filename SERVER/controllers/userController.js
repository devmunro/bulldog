const user = require('../models/userSchema.js')
const express = require ('express');
const bcrypt = require ('bcrypt')

const registerUser = async (req,res) => {
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
    })
}catch(error) {

    res.status(400).json({error: "user not created"})
}

}

module.exports = registerUser