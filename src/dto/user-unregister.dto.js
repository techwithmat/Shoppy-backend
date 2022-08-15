import Ajv from 'ajv'
import { Type } from '@sinclair/typebox'
import { passwordDTOSchema } from '#DTO/dto-types.js'

const UnregisterDTO = Type.Object({
  password: passwordDTOSchema
}, {
  additionalProperties: false,
  required: ['password']
})

const ajv = new Ajv()
const validate = ajv.compile(UnregisterDTO)

const userUnregisterDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)

  if (!isDTOValid) {
    return res
      .status(400)
      .json({
        message: 'Invalid user DTO',
        errors: validate.errors
      })
  }

  next()
}

export default userUnregisterDTO
