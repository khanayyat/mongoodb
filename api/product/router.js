const express = require('express')
const router = express.Router()

const {getproductbycategory , getproductbybrand ,createproduct,updateproduct ,deleteproduct} = require('./controller')

router.get('/getproductbycategory', getproductbycategory)
router.get('/getproductbybrand', getproductbybrand)
router.post('/create-product', createproduct)
router.put('/updateproduct', updateproduct)
router.delete('/deleteproduct', deleteproduct)



module.exports = router