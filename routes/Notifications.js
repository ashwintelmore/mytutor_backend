var express = require('express');
var router = express.Router();
const { getNotifications, updateNotification, createNotification } = require('../controllers/Notification');

/* GET users listing. */
router.post('/createNotification', createNotification)
router.put('/updateNotification/:id', updateNotification)

router.get('/getNotifications?', getNotifications)




module.exports = router;
