import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { passwordDTOSchema, emailDTOSchema } from '#DTO/dto-types.js'

const LoginDTOSchema = Type.Object({
  password: passwordDTOSchema,
  email: emailDTOSchema
}, {
  required: ['password', 'email'],
  additionalProperties: false
})

const ajv = new Ajv()
addFormats(ajv, ['email'])

const validate = ajv.compile(LoginDTOSchema)

const userLoginDTO = (req, res, next) => {
  const isDTOValid = validate(req.body)

  if (!isDTOValid) {
    return res
      .status(400)
      .json({
        message: 'Invalid user login DTO',
        errors: validate.errors
      })
  }

  next()
}

export default userLoginDTO
