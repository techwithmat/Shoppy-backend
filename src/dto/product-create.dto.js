import Ajv from 'ajv'
import { Type } from '@sinclair/typebox'
import {
  priceDTOSchema,
  characteristicsDTOSchema,
  imagesDTOSchema,
  categoryDTOSchema,
  stockDTOSchema
} from '#DTO/dto-types.js'

const ProductDTOSchema = Type.Object({
  name: Type.String(),
  price: priceDTOSchema,
  characteristics: characteristicsDTOSchema,
  images: imagesDTOSchema,
  category: categoryDTOSchema,
  stock: stockDTOSchema
}, {
  additionalProperties: false,
  required: ['name', 'price', 'characteristics', 'images', 'category', 'stock']
})

const ajv = new Ajv()
const validate = ajv.compile(ProductDTOSchema)

const productCreateDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)

  if (!isDTOValid) {
    return res
      .status(400)
      .json({
        message: 'Invalid product DTO',
        errors: validate.errors
      })
  }

  next()
}

export default productCreateDTO
