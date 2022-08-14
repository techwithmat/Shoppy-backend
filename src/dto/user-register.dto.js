import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { nameDTOSchema, passwordDTOSchema, emailDTOSchema } from '#DTO/dto-types.js'

const RegisterDTOSchema = Type.Object({
  name: nameDTOSchema,
  password: passwordDTOSchema,
  email: emailDTOSchema
}, {
  required: ['name', 'password', 'email'],
  additionalProperties: false
})

const ajv = new Ajv()
addFormats(ajv, ['email'])
const validate = ajv.compile(RegisterDTOSchema)

const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)

  if (!isDTOValid) {
    return res
      .status(400)
      .json({
        message: 'Invalid user register DTO',
        errors: validate.errors
      })
  }

  next()
}

export default userRegisterDTO
