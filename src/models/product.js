import moongose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const { model, Schema } = moongose

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  characteristics: {
    type: Array,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
})

ProductSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

ProductSchema.plugin(mongooseUniqueValidator)

const Product = model('Product', ProductSchema)

export default Product
