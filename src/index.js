import 'dotenv/config'
import express from 'express'
import cors from 'cors'

// Database
import connect from './db.js'

// Routes
import apiRouter from './controllers/api.js'

// Middleware
import errorHandler from './middleware/errorHandler.js'

console.clear()

const PORT = process.env.PORT || 3010
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)
app.use(errorHandler)

connect()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
