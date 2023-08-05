const { Schema, model } = require('mongoose')

const categorySchema = new Schema(
    {
        CategoryName: {
            type: String,
            unique: true,
            required: true
        },
        CategoryImage: {
            type: String,
            required: true
        }
    }
)

const Category = model('category', categorySchema)
module.exports = Category