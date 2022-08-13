import express from 'express'
import cors from 'cors'
import errorHandler from '#Middlewares/errorHandler.js'
import apiRouter from '#Routes/api.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler)

export default app
