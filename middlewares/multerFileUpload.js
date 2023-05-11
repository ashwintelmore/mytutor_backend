const multer = require('multer');

const storage = multer.diskStorage({
    destination: 'uploads/postsThumbanails',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
module.exports = multer({ storage: storage });

