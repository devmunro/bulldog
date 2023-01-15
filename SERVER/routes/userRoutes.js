const expire = require ('express');
const registerUser = require('../controllers/userController');


 const UserRouter =() => {

    const userRouter = express();

    userRouter.post("signup", registerUser)

    return userRouter
}

module.exports = UserRouter