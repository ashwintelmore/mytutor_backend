var express = require('express');
const { createRequest, getAllRequesterReqs, getAllRequestedReqs, updateRequest, getAllPostAndRequestedReq, getAllPostAndRequesterReq } = require('../controllers/Requests');
var router = express.Router();
const multer = require('multer');
const { createPayment, updatePayment, getAllPayments, getPayment } = require('../controllers/Payments');

/* GET users listing. */
router.post('/createPayment', createPayment)
router.put('/updatePayment/:id?', updatePayment)
router.get('/getPayment/:id', getPayment)
router.get('/getAllpayments?', getAllPayments)


module.exports = router;
