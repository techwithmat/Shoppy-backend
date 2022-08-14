import express from 'express'
import cors from 'cors'
import errorHandler from '#Middlewares/errorHandler.middleware.js'
import apiRouter from '#Routes/api.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', apiRouter)
app.use(errorHandler)

export default app
