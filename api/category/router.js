const app = require('express')
const router = app.Router()
const {getallcategory , getcategoryByID ,createcategory,  getcategorybyname ,updatecategory , deletecategory} = require('./controller')

router.get('/get-all-categories',getallcategory )
router.get('/get-category-by-id', getcategoryByID)
router.post('/create-category', createcategory)
router.get('/getcategorybyname', getcategorybyname )
router.put('/update-category', updatecategory)
router.delete('/delete-category', deletecategory)



module.exports = router