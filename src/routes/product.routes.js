import { Router } from 'express'
import {
  productGetAllController,
  productSearchController,
  productGetByIdController,
  productCreateController,
  productUpdateController,
  productDeleteController
} from '#Controllers/product/index.js'
import { productCreateDTO, validateProductId } from '#DTO/index.js'

const productRouter = Router()

productRouter.get('/', productGetAllController)
productRouter.get('/search', productSearchController)
productRouter.get('/:id', validateProductId, productGetByIdController)
productRouter.post('/', productCreateDTO, productCreateController)
productRouter.patch('/:id', validateProductId, productUpdateController)
productRouter.delete('/:id', validateProductId, productDeleteController)

export default productRouter
