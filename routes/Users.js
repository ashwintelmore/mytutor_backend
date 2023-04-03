var express = require('express');
const { register, login, getAllUsers } = require('../controllers/Users');
var router = express.Router();


/* GET users listing. */
router.post('/register', register)
router.post('/login', login)
router.get('/allUsers', getAllUsers)
module.exports = router;
