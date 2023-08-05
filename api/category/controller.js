const Category = require('./scheema')
const { connect } = require('mongoose')
require('dotenv').config()

const getallcategory = async (req, res) => {

    try {
        await connect(process.env.MONGO_URI)
        const allCategories = await category.find()
        res.json({
            category: allCategories
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}


const getcategoryByID = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const category = await Category.findOne({ _id })
        res.json({ category })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    }


   

}

const createcategory = async (req, res) => {
    const { CategoryName, CategoryImage } = req.body

    if (!CategoryName || !CategoryImage) {
        res.status(403).json({
            message: "Field Missing "
        })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await Category.exists({ CategoryName })

            if (checkExisting) {
                res.status(200).json({
                    message: "Already Exists"
                })
            }

            else {
                await category.create({ CategoryName, CategoryImage })
                const allCategories = await category.find()

                res.json({
                    message: "DB Connected",
                    category: allCategories
                })

            }
        }


        catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
}

const getcategorybyname  = async (req, res) => {
    const { CategoryName } = req.query
    try {
        await connect(process.env.MONGO_URI)
        const category = await Category.findOne({ CategoryName })
        res.json({ category })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}



const updatecategory = async (req, res) => {
    const { _id, CategoryName, CategoryImage } = req.body

    const filter = { _id };
    const update = { CategoryName, CategoryImage };

    try {
        await connect(process.env.MONGO_URI)

        await category.findOneAndUpdate(filter, update, {
            new: true
        });

        const category = await category.find()

        res.status(200).json({
            message: "Success",
            category
        })

    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

const deletecategory = async (req, res) => {

    const { _id } = req.body


    try {
        await connect(process.env.MONGO_URI)
        await Category.deleteOne({ _id })
        const category = await Category.find()
        res.status(200).json({
            message: "Deleted",
            category
        })
    }


    catch (error) {
        res.status(400).json({
            message: error
        })
    }

}

module.exports = { getallcategory , getcategoryByID ,createcategory , getcategorybyname ,updatecategory ,deletecategory} 