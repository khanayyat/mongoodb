
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const cors = require('cors')
const port = process.env.SERVER_PORT 



// const port = 3000


app.use(express.json())
app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/Products/router'))
app.use('/api', require('./api/brands/router'))
app.use('/api', require('./api/Category/router'))
// mongoose.connect(process.env.MONGO_URI).then(()=>
// console.log("DB Connected"))
// .catch((Error) => console.log("Something went wrong"))




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
