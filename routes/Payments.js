var express = require('express');
const { createRequest, getAllRequesterReqs, getAllRequestedReqs, updateRequest, getAllPostAndRequestedReq, getAllPostAndRequesterReq } = require('../controllers/Requests');
var router = express.Router();
const multer = require('multer');

/* GET users listing. */
router.post('/createrequest', createRequest)
router.put('/updaterequest/:postId?', updateRequest)
router.get('/getAllRequesterReqs/:id', getAllRequesterReqs)

router.get('/getAllRequestedReqs/:id', getAllRequestedReqs)
router.get('/getAllPostAndRequestedReq/:postId/:requestedId', getAllPostAndRequestedReq)
router.get('/getAllPostAndRequesterReq/:postId/:requesterId', getAllPostAndRequesterReq)


module.exports = router;
