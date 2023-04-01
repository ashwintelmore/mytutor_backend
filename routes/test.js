var express = require('express');
const { test } = require('../controllers/test');
var router = express.Router();

/* GET users listing. */
router.get('/test', test)

module.exports = router;
