const app = require('express')
const router = app.Router()

const { Signup,  Login ,allUsers , getUserbyEmail,getUserbyid ,deleteUser,updateProfile } = require('./controller')



router.post('/signup', Signup)
router.post('/login', Login)
router.get('/getallusers', allUsers )
router.get('/userbyemail/:email',getUserbyEmail )
router.get('/getuserbyid' , getUserbyid ) 
router.delete('/getdeleteuser' ,deleteUser ) 
router.put('/update-profile' ,updateProfile ) 




module.exports = router