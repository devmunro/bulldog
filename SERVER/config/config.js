import dotenv from "dotenv"
dotenv.config()

export const config = {
 host: process.env.HOST,
 user: process.env.USER_KEY,
 password: process.env.SECRET_KEY,
 port: process.env.PORT
}


