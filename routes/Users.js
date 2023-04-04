var express = require('express');
const { register, login, getAllUsers, updateUserDetails } = require('../controllers/Users');
var router = express.Router();


/* GET users listing. */
router.post('/register', register)
router.post('/login', login)
router.get('/allUsers', getAllUsers)

router.post('/upadateUserDetails', updateUserDetails)
module.exports = router;
