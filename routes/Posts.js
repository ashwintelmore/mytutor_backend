var express = require('express');
const { createPosts, getAllPosts, getUserAllPosts, updatePostsDetails, deletePost } = require('../controllers/Posts');
var router = express.Router();

/* GET users listing. */
router.get('/getallposts', getAllPosts)
router.get('/getAllposts/:id', getUserAllPosts)
router.post('/createpost', createPosts)
router.put('/updatePosts', updatePostsDetails)
router.delete('/deletePosts/:id', deletePost)

module.exports = router;
