import { Router } from 'express'
import {
  productGetAllController,
  productSearchController,
  productGetByIdController,
  productCreateController,
  productUpdateController,
  productDeleteController
} from '#Controllers/product/index.js'

const productRouter = Router()

productRouter.get('/', productGetAllController)
productRouter.get('/search', productSearchController)
productRouter.get('/:id', productGetByIdController)
productRouter.post('/', productCreateController)
productRouter.patch('/:id', productUpdateController)
productRouter.delete('/:id', productDeleteController)

export default productRouter
