const express = require('express')
const router = express.Router()
const { AddBrand, getAllBrands, brandByID,BrandbyName ,updateBrand ,deleteBrand} = require('./controller')

router.post('/add-brand', AddBrand)
router.get('/brandbyid', brandByID)
router.get('/get-all-brands', getAllBrands)
router.get('/getbrandbyname', BrandbyName )
router.delete('/deletebrand', deleteBrand)
router.put('/updatebrand', updateBrand)

module.exports = router