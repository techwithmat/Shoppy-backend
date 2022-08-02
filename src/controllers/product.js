import { Router } from 'express'
import Product from '../models/product.js'

const productRouter = Router()

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({})

    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

productRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

productRouter.patch('/', async (req, res, next) => {
  const { body } = req

  if (Object.keys(body).length !== 6) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    const product = new Product(body)
    const productSaved = await product.save()

    res.status(201).json({
      message: 'Product created',
      product: productSaved
    })
  } catch (error) {
    next(error)
  }
})

productRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findByIdAndDelete(id)

    res.status(200).json({
      message: 'Product deleted',
      product
    })
  } catch (error) {
    next(error)
  }
})

export default productRouter
