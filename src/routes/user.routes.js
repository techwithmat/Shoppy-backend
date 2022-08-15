import { Router } from 'express'
import { userRegisterDTO, userLoginDTO, userUnregisterDTO } from '#DTO/index.js'
import {
  userRegisterController,
  userLoginController,
  userProfileController,
  userUnregisterController
} from '#Controllers/user/index.js'
import jwtValidator from '#Middlewares/jwt.middleware.js'

const userRouter = Router()

userRouter.post('/register', userRegisterDTO, userRegisterController)
userRouter.post('/login', userLoginDTO, userLoginController)
userRouter.get('/profile', jwtValidator, userProfileController)
userRouter.delete('/unregister', jwtValidator, userUnregisterDTO, userUnregisterController)

export default userRouter
