import mongoose from 'mongoose'

const validateProductId = (req, res, next) => {
  const { id } = req.params

  if (!id) {
    return res
      .status(400)
      .json({
        message: 'No product id provided'
      })
  }

  const isValidId = mongoose.isValidObjectId(id)

  if (!isValidId) {
    return res.status(400).json({ message: 'Invalid id' })
  }

  next()
}

export default validateProductId
