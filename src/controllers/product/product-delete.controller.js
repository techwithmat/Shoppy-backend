import Product from '#Models/product.model.js'
import isValidId from '#Utils/isValidId.js'

/**
 * @api {delete} /products/:id Delete a product
 * @apiParam {String} id Product id
*/

const productDeleteController = async (req, res, next) => {
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
}

export default productDeleteController
