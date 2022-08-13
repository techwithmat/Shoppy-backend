import Product from '#Models/product.model.js'

/**
 * @api {post} /products Create a new product
 * @apiParam {String} name Product name
 * @apiParam {Array of Strings} characteristics Product characteristics
 * @apiParam {Number} price Product price
 * @apiParam {Array of Strings} images Product images
 * @apiParam {String} category Product category
 * @apiParam {Number} stock Product stock
*/

const productCreateController = async (req, res, next) => {
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
}

export default productCreateController
