const product = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()


const getallproduct = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const allproduct = await product.find()
        res.json({
            product: allproduct
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}
const getproductByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const product = await product.findOne({ _id })
        res.json({ product })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}


const getproductbycategory  = async (req, res) => {
    const { category } = req.query

    try {
        await connect(process.env.MONGO_URI)
        const prod = await product.findOne({ category } )
        res.json({
            prod
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}


const  getproductbybrand = async (req, res) => {

    const { brand } = req.query


    try {
        await connect(process.env.MONGO_URI)
        const product = await product.findOne({ brand })
        res.json({ product })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const createproduct = async (req, res) => {
    const { name,price,category, brand,rating,description,thumbnails, images } = req.body


    if (!name || !images) {
        res.status(400).json({
            message: "Missing Field"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await product.exists({name })

            if (checkExisting) {
                res.status(200).json({
                    message: "Already Exists"
                })
            }

            else {
                await product.create({ name,price,category, brand,rating,description, thumbnails,images })
                const allproduct = await product.find()

                res.json({
                    message: "DB Connected",
                    category: allproduct
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
}

const updateproduct = async (req, res) => {
    const { _id, name} = req.body
    const filter = { _id }
    const update = {name} 
    try{
        await connect(process.env.MONGO_URI)
        await product.findOneAndUpdate(filter, update, {
            new: true
        })

        const prod = await product.find()

        res.status(202).json({
            message: "Success",
            prod
        })
       
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
    

}
   


   

     

const deleteproduct = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URI)
        await product.deleteOne({ _id })
        const product = await product.find()
        res.status(200).json({
            message: "Deleted",
            product
        })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

module.exports = {getproductbycategory , getproductbybrand ,createproduct,updateproduct ,deleteproduct ,getallproduct }