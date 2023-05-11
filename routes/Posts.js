var express = require('express');
const { createPosts, getAllPosts, getUserAllPosts, updatePostsDetails, deletePost, getPost, searchPost } = require('../controllers/Posts');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/postsThumbanails' })

/* GET users listing. */
router.get('/getallposts', getAllPosts)
router.get('/getAllposts/:id', getUserAllPosts)

router.get('/getPost/:id', getPost)


router.post('/createpost', createPosts)

router.put('/updatePosts/:postId', updatePostsDetails)
router.delete('/deletePosts/:id', deletePost)

router.get('/search', searchPost)


module.exports = router;
