var express = require('express');
var router = express.Router();
const { createFavourite, updateFavourite } = require('../controllers/Favourites');

/* GET users listing. */
router.post('/createFavourite', createFavourite)
router.put('/updateFavourite/:id', updateFavourite)


module.exports = router;
