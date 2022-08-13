import { Router } from 'express'
import Product from '#Models/product.js'
import isValidId from '#Utils/isValidId.js'

const productRouter = Router()

/**
 * @api {get} /products Get all products
 * @apiParam {Number} [limit] Limit the number of products returned
 * @apiParam {Number} [page] Page number
*/

productRouter.get('/', async (req, res, next) => {
  let { limit, page } = req.query

  limit = parseInt(limit) || 10
  page = parseInt(page) || 1

  try {
    const startIndex = (page - 1) * limit
    const totalPages = Math.ceil(await Product.countDocuments() / limit)

    const products = await Product.find({})
      .limit(limit)
      .skip(startIndex)

    return res.status(200).json({
      page,
      totalPages,
      result: products
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @api {get} /products/search Search products
 * @apiParam {String} [q] Search query
 * @apiParam {Number} [limit] Limit the number of products returned
 * @apiParam {Number} [page] Page number
 * @apiParam {Category} [category] Category to search in
*/

productRouter.get('/search', async (req, res, next) => {
  let { q, limit, page, category } = req.query

  limit = parseInt(limit) || 10
  page = parseInt(page) || 1
  q = q || ''
  category = category || ''

  try {
    const startIndex = (page - 1) * limit
    const totalPages = Math.ceil(await Product.countDocuments({
      name: { $regex: q, $options: 'i' },
      category: { $regex: category, $options: 'i' }
    }) / limit)

    const products = await Product.find({
      name: { $regex: q, $options: 'i' },
      category: { $regex: category, $options: 'i' }
    })
      .limit(limit)
      .skip(startIndex)

    return res.status(200).json({
      page,
      totalPages,
      previusPage: (page - 1) > 0 ? (page - 1) : null,
      nextPage: (page < totalPages) ? page + 1 : null,
      result: products
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @api {get} /products/:id Get product by id
 * @apiParam {String} id Product id
*/

productRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params

  if (!id || !isValidId(id)) {
    return res.status(400).json({
      message: 'Invalid id'
    })
  }

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

/**
 * @api {post} /products Create a new product
 * @apiParam {String} name Product name
 * @apiParam {Array of Strings} characteristics Product characteristics
 * @apiParam {Number} price Product price
 * @apiParam {Array of Strings} images Product images
 * @apiParam {String} category Product category
 * @apiParam {Number} stock Product stock
*/

productRouter.post('/', async (req, res, next) => {
  const { name, price, characteristics, images, category, stock } = req.body

  if (!name || !price || !characteristics || !images || !category || !stock) {
    return res.status(400).json({
      message: 'Missing required fields'
    })
  }

  try {
    const product = new Product({
      name,
      price,
      characteristics,
      images,
      category,
      stock
    })

    const productSaved = await product.save()

    return res.status(201).json({
      message: 'Product created',
      product: productSaved
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @api {patch} /products/:id Update a product
 * @apiParam {String} id Product id
 * @apiBody {properties} Product properties to update
*/

productRouter.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  const { body } = req

  if (!id || !isValidId(id)) {
    return res.status(400).json({ message: 'Invalid id' })
  }

  try {
    const product = await Product.findByIdAndUpdate(id, body)

    res.json({
      message: 'Product updated',
      product
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @api {delete} /products/:id Delete a product
 * @apiParam {String} id Product id
*/

productRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  if (!id || !isValidId(id)) {
    return res.status(400).json({ message: 'Invalid id' })
  }

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
