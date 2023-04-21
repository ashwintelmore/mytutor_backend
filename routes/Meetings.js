var express = require('express');
var router = express.Router();
const { createMeeting, getUserAllMeeting } = require('../controllers/Meetings');

/* GET users listing. */
router.post('/createmeeting', createMeeting)
router.get('/getuserallmeetings/:id', getUserAllMeeting)


module.exports = router;
