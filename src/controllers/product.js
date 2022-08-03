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

productRouter.get('/search', async (req, res, next) => {
  const { query } = req

  const page = query.page || 1
  const category = query.category || ''
  const price = query.price || ''

  const categoryFilter = category ? { category } : {}

  const priceFilter = price
    ? { price: { $gte: price.split('-')[0], $lte: price.split('-')[1] } }
    : {}

  try {
    const products = await Product.find({
      ...categoryFilter,
      ...priceFilter
    })
      .skip((page - 1) * 10)
      .limit(10)

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

productRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

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

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.status(200).json({
      message: 'Product deleted',
      product
    })
  } catch (error) {
    next(error)
  }
})

export default productRouter
