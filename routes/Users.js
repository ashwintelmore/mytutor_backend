var express = require('express');
const { register, login, getAllUsers, updateUserDetails, getUserData, resendVerification, forgetPassword, verifyEmail } = require('../controllers/Users');
var router = express.Router();


/* GET users listing. */
router.post('/register', register)
router.post('/login', login)


router.get('/verify/:email/:token', verifyEmail)
router.post('/resendVerification', resendVerification)
router.post('/forgetPassword', forgetPassword)



router.get('/allUsers', getAllUsers)
router.get('/getUser/:id', getUserData)

router.post('/upadateUserDetails', updateUserDetails)
module.exports = router;
