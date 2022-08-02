import moongose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'
const { model, Schema } = moongose

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  price: Number,
  description: String,
  images: Array,
  categories: Array,
  stock: Number
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
