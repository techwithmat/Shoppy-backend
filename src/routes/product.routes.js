import { Router } from 'express'
import {
  productGetAllController,
  productSearchController,
  productGetByIdController,
  productCreateController,
  productUpdateController,
  productDeleteController
} from '#Controllers/product/index.js'
import productCreateDTO from '#DTO/product-create.dto.js'
import validateProductId from '#DTO/product-id.dto.js'

const productRouter = Router()

productRouter.get('/', productGetAllController)
productRouter.get('/search', productSearchController)
productRouter.get('/:id', validateProductId, productGetByIdController)
productRouter.post('/', productCreateDTO, productCreateController)
productRouter.patch('/:id', validateProductId, productUpdateController)
productRouter.delete('/:id', validateProductId, productDeleteController)

export default productRouter
