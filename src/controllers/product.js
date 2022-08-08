import { Router } from 'express'
import Product from '../models/product.js'

const productRouter = Router()

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await Product.find({})

    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

productRouter.get('/search', async (req, res, next) => {
  const { page, category, q, price } = req.query
  const pageNumber = parseInt(page) || 1

  const query = {
    name: { $regex: q || '', $options: 'i' },
    price: { $lte: parseInt(price) || 1000 },
    category: { $regex: category || '', $options: 'i' }
  }

  try {
    const products = await Product.find(query)
      .skip((pageNumber - 1) * 10)
      .limit(10)

    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

productRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json(product)
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

    return res.status(201).json({
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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    return res.status(200).json({
      message: 'Product deleted',
      product
    })
  } catch (error) {
    next(error)
  }
})

export default productRouter
