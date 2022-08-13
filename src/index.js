import 'dotenv/config'
import httpServer from '#Config/http.js'
import connectDB from '#Config/db.js'

console.clear()

const { MONGODB_URL, MONGODB_URL_TEST, PORT, NODE_ENV } = process.env

export const bootstrap = async () => {
  await connectDB(NODE_ENV === 'test' ? MONGODB_URL_TEST : MONGODB_URL)

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

bootstrap()
