import { Router } from 'express'
import productRouter from '#Routes/product.routes.js'
import userRouter from '#Routes/user.routes.js'

const apiRouter = Router()

apiRouter.use('/product', productRouter)
apiRouter.use('/user', userRouter)

export default apiRouter
