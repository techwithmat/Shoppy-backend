import Product from '#Models/product.model.js'
import isValidId from '#Utils/isValidId.js'

/**
 * @api {get} /products/:id Get product by id
 * @apiParam {String} id Product id
*/

const productGetByIdController = async (req, res, next) => {
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
}

export default productGetByIdController
