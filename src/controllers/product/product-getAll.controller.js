import Product from '#Models/product.model.js'

/**
 * @api {get} /products Get all products
 * @apiParam {Number} [limit] Limit the number of products returned
 * @apiParam {Number} [page] Page number
*/

const productGetAllController = async (req, res, next) => {
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
}

export default productGetAllController
