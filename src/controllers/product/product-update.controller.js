import Product from '#Models/product.model.js'

/**
 * @api {patch} /products/:id Update a product
 * @apiParam {String} id Product id
 * @apiBody {properties} Product properties to update
*/

const productUpdateController = async (req, res, next) => {
  const { id } = req.params
  const { body } = req

  try {
    const product = await Product.findByIdAndUpdate(id, body)

    res.json({
      message: 'Product updated',
      product
    })
  } catch (error) {
    next(error)
  }
}

export default productUpdateController
