const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const UserDetails = require('../models/UserDetails');

exports.createPosts = async (req, res) => {
    console.log("new line", req.body)
    const {
        payload
    } = req.body;
    // slot data should be come from front end as first user need to login 
    // while login data is fetch and store in state send that slot with payload
    console.log('r', payload)


    if (!payload)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })

    const newPost = new Posts(payload);

    return await newPost.save().then((data) => {
        res.status(201).json({
            message: 'Post created successfully',
            payload: data
        })
    }).catch((err) => {
        console.log('err', err)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    })
}
exports.getAllPosts = async (req, res, next) => {

    try {
        const posts = await Posts.find()
        if (!posts)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "Posts not exists"
                }
            })

        return res.status(201).json({
            message: 'Posts fetch successfully',
            payload: posts
        })

    } catch (error) {
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    }
}




exports.updatePostsDetails = async (req, res, next) => {
    const {
        postsId,
        payload
    } = req.body;

    const isE = isEmpty(postsId);
    if (isE)
        return res.status(200).json(isE);

    console.log(postsId)
    const isinvalidId = isInalidMongoDBid(postsId)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Posts.findByIdAndUpdate(
        postsId,
        { ...payload },
        { new: true }).then((posts) => {
            if (!posts)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "posts does not exists"
                    }
                })
            return res.status(201).json({
                message: 'posts data updated successfully',
                payload: posts
            })

        }).catch((err) => {
            return res.status(404).json({
                error: {
                    errCode: ERRORS.SOMETHING_WRONG,
                    errMessage: "Something went wrong"
                }
            })
        })
}
exports.deletePost = async (req, res, next) => {

    const postId = req.params.id


    const isE = isEmpty(postId);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(postId)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Posts.findByIdAndDelete(postId).then((posts) => {

        if (!posts)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "posts does not exists"
                }
            })
        return res.status(201).json({
            message: 'posts data deleted successfully',
            payload: postId
        })

    }).catch((err) => {
        return res.status(404).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    })
}





exports.getUserAllPosts = async (req, res, next) => {
    const userId = req.params.id;

    const isE = isEmpty(userId);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(userId)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)

    try {
        const posts = await Posts.find({ createdTutor: userId })
        if (!posts)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "Posts not exists"
                }
            })

        return res.status(201).json({
            message: 'Posts fetch successfully',
            payload: posts
        })

    } catch (error) {
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    }
}