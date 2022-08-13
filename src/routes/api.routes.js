import { Router } from 'express'
// import productRouter from '#Controllers/product.js'
import productRouter from '#Routes/product.routes.js'

const apiRouter = Router()

apiRouter.use('/product', productRouter)

export default apiRouter
