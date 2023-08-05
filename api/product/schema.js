const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        rating: {
            type: String,
            required: true
        },
        description: {
            type: String,
            
            required: true
        }
        ,
        thumbnail: {
            type: String,
         
        }
        ,
        images : [
            {
                type: String,
                required: true
            }
        ]
        
    }
)

const Product = model('product', ProductSchema)
module.exports = Product