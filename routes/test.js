var express = require('express');
const { test } = require('../controllers/test');
var router = express.Router();

/* GET users listing. */
router.get('/', test);

module.exports = router;
