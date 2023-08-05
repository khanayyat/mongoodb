const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./schema')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { connect } = require('mongoose')



const Signup = async (req, res) => {
    const { username, password, email } = req.body;
    console.log({ username, password, email })
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "Already Exist"
            })
        }

        else {
            await User.create({ username, email, password: await hash(password, 12) })
            console.log("User Created")
            res.status(201).json({
                message: "Successfully"
            })
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const Login = async (req, res) => {

    const { password, email } = req.body;

    try {
        await mongoose.connect(process.env.MONGO_URI)
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }

        else {

            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email, 
                        profile : existingUser.profile,
                        role : existingUser.role

                        
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Login",
                    token: token
                })
            }

            else {
                res.json({
                    message: "invalid value"
                })
            }





        }

    }
    catch (error) {
        res.json({
            message: error.message
        })

    }
}

const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.find()
        res.json(
            {
                Users: Users
                
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error
            }
        )

    }
}


const getUserbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error
            }
        )

    }
}
const getUserbyid = async (req, res) => {

    const { _id } = req.query


    try {
        await connect(process.env.MONGO_URI)
        const users = await User.findOne({ _id })
        res.json({ users })
    }


    catch (error) {
        res.status(400).json({
            message: error.message
        })
    } 

}


const updateProfile = async (req, res) => {

const { _id, email, username, profile } = req.body

const filter = { _id };
const update = { email, username, profile };

try {
await connect(process.env.MONGO_URI)
const updated = await User.findOneAndUpdate(filter, update, {
    new: true
})

res.json({
    message: "successs",
    user: updated
})
}

catch (error) {
res.json({
    message: error.message
})
}

}

const deleteUser = async (req, res) => {

const { _id } = req.body

try {
await connect(process.env.MONGO_URI)
await User.deleteOne({ _id })
const users = await User.find()
res.json({ message: "User Deleted ", 
users})
}

catch (error) {
res.json({
    message: error.message
})
}
}


module.exports = { Signup, Login, allUsers, getUserbyEmail, getUserbyid ,updateProfile ,deleteUser }