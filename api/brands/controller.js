const { Brand } = require('./schema')
const { connect } = require('mongoose')
require('dotenv').config()

const AddBrand = async (req, res) => {

    const { BrandName, BrandImage } = req.body

    if (!BrandName || !BrandImage) {
        res.json({
            message: "Please insert values"
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            console.log("DB Connected")

            await Brand.create({ BrandName, BrandImage })
            const brands = await Brand.find()
            res.status(201).json({
                message: "Created Successfully",
                brands: brands
            })
        }

        catch (error) {
            res.json({
                message: error
            })
        }
    }
}

const brandByID = async (req, res) => {
    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        const brands = await Brand.findOne({ _id })
        res.json({ brands })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }

}

const getAllBrands = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")

        const brands = await Brand.find()
        res.status(200).json({
            brands
        })
    }

    catch (error) {
        res.json({
            message: error
        })
    }

}
const BrandbyName = async (req, res) => {

    const { Name } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const brand = await Brand.findOne({ Name })
        res.json({ brand })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
const updateBrand = async (req, res) => {

    const { _id, Brandname, Brandimage } = req.body

    const filter = { _id };
    const update = { Brandname, Brandimage };

    try {
        await connect(process.env.MONGO_URI)
        const updated = await Brand.findOneAndUpdate(filter, update, {
            new: true
        })
       

        res.json({
            message: "Success",
            brands: updated
        })

    }

    catch (error) {
        res.json({
            message: error.message,
        })
    }
}
const deleteBrand = async (req, res) => {
    const { Brandname } = req.body
    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        await Brand.deleteOne({ Brandname })
        const brands = await Brand.find()
        res.json({
             message: "Success",
             brands
    
    })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}



module.exports = { AddBrand, brandByID, getAllBrands,BrandbyName ,deleteBrand,updateBrand }