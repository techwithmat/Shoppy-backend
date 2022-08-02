import mongoose from 'mongoose'

const URL = process.env.MONGO_DB_URL

function connect () {
  mongoose.connection
    .on('error', console.error.bind(console, 'connection error:'))
    .on('connected', () => {
      console.log('Connected to MongoDB')
    })
    .on('disconnected', () => {
      console.log('Disconnected from MongoDB')
    })

  return mongoose.connect(URL)
}

export default connect
