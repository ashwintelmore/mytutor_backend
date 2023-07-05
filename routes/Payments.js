var express = require('express');
const { createRequest, getAllRequesterReqs, getAllRequestedReqs, updateRequest, getAllPostAndRequestedReq, getAllPostAndRequesterReq } = require('../controllers/Requests');
var router = express.Router();
const { createPayment, updatePayment, getAllPayments, getPayment } = require('../controllers/Payments');
const uploads = require('./../middlewares/multerFileUpload')

/* GET users listing. */
router.post('/createPayment', uploads.single('qrCode'), createPayment)
router.put('/updatePayment/:id?', uploads.single('qrCode'), updatePayment)
router.get('/getPayment/:id?', getPayment)
router.get('/getAllpayments?', getAllPayments)


module.exports = router;
