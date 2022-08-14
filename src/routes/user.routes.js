import { Router } from 'express'
import { userRegisterDTO, userLoginDTO } from '#DTO/index.js'
import {
  userRegisterController,
  userLoginController,
  userProfileController
} from '#Controllers/user/index.js'
import jwtValidator from '#Middlewares/jwt.middleware.js'

const userRouter = Router()

userRouter.post('/register', userRegisterDTO, userRegisterController)
userRouter.post('/login', userLoginDTO, userLoginController)
userRouter.get('/profile', jwtValidator, userProfileController)

export default userRouter
