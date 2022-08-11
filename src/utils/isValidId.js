import mongoose from 'mongoose'

const isValidId = (id) => mongoose.isValidObjectId(id)

export default isValidId
