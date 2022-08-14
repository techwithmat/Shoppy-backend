import { Type } from '@sinclair/typebox'

export const nameDTOSchema = Type.String({
  minLength: 3,
  maxLength: 20
})

export const passwordDTOSchema = Type.String({
  minLength: 8,
  maxLength: 20
})

export const emailDTOSchema = Type.String({
  format: 'email'
})

export const priceDTOSchema = Type.Number()

export const characteristicsDTOSchema = Type.Array(Type.String())

export const imagesDTOSchema = Type.Array(Type.String())

export const categoryDTOSchema = Type.String({
  minLength: 3,
  maxLength: 25
})

export const stockDTOSchema = Type.Number()
