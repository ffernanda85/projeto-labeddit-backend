import express from 'express'
import { UserController } from '../../controller/user/UserController'
import { UserBusiness } from '../../business/user/UserBusiness'
import { UserDatabase } from '../../database/user/UserDatabase'
import { IdGenerator } from '../../services/IdGenerator'
import { TokenManager } from '../../services/TokenManager'
import { HashManager } from '../../services/HashManager'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)

userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)