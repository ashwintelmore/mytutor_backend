var express = require('express');
const { createCategory, getAllCategories, getCategory, updateCategory } = require('../controllers/Categories');
const upload = require('../middlewares/multerFileUpload');
var router = express.Router();


/* GET users listing. */
router.post('/createCategory', upload.single('catImg'), createCategory)
router.put('/updateCategory/:id', upload.single('catImg'), updateCategory)

router.get('/getallCategory', getAllCategories)
router.get('/getCategory/:id', getCategory)
module.exports = router;
