import { Router } from 'express'
import userRegisterDTO from '#DTO/user-register.dto.js'
import userLoginDTO from '#DTO/user-login.dto.js'

const userRouter = Router()

userRouter.post('/register', userRegisterDTO)
userRouter.post('/login', userLoginDTO)
userRouter.get('/profile')

export default userRouter
