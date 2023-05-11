var express = require('express');
var router = express.Router();
const { createFavourite, updateFavourite, getFavourites } = require('../controllers/Favourites');

/* GET users listing. */
router.post('/createFavourite', createFavourite)
router.put('/updateFavourite/:id', updateFavourite)

router.get('/getFavourites?', getFavourites)




module.exports = router;
