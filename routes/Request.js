var express = require('express');
const { createRequest, getAllRequesterReqs, getAllRequestedReqs, updateRequest } = require('../controllers/Requests');
var router = express.Router();
const multer = require('multer');

/* GET users listing. */
router.post('/createrequest', createRequest)
router.put('/updaterequest', updateRequest)
router.get('/getAllRequesterReqs/:id', getAllRequesterReqs)
router.get('/getAllRequestedReqs/:id', getAllRequestedReqs)


module.exports = router;
