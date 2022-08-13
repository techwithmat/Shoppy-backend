import Product from '#Models/product.model.js'

/**
 * @api {get} /products/search Search products
 * @apiParam {String} [q] Search query
 * @apiParam {Number} [limit] Limit the number of products returned
 * @apiParam {Number} [page] Page number
 * @apiParam {Category} [category] Category to search in
*/

const productSearchController = async (req, res, next) => {
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
}

export default productSearchController
