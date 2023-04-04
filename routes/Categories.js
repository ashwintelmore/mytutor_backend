var express = require('express');
const { createCategory, getAllCategories } = require('../controllers/Categories');
var router = express.Router();


/* GET users listing. */
router.post('/createCategory', createCategory)
router.get('/allCategory', getAllCategories)
module.exports = router;
