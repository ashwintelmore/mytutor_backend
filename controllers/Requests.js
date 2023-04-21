const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');


exports.createRequest = async (req, res) => {
    const {
        payload
    } = req.body;
    // slot data should be come from front end as first user need to login 
    // while login data is fetch and store in state send that slot with payload
    // return
    if (!payload)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    const newReq = new Requests(payload)


    return await newReq.save().then(async (data) => {

        res.status(201).json({
            message: 'Request created successfully',
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

exports.updateRequest = async (req, res, next) => {
    const {
        id,
        payload
    } = req.body;

    console.log(req.body)
    const isE = isEmpty(id);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(id)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Requests.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then((request) => {
            if (!request)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "request does not exists"
                    }
                })
            return res.status(201).json({
                message: 'requests data updated successfully',
                payload: request
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



exports.getAllRequesterReqs = async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const reqs = await Requests.find({ requesterId: id })
        if (!reqs)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "requests not exists"
                }
            })

        return res.status(201).json({
            message: 'resqusts fetch successfully',
            payload: reqs
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
exports.getAllRequestedReqs = async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const reqs = await Requests.find({ requestedId: id })
        if (!reqs)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "requests not exists"
                }
            })

        return res.status(201).json({
            message: 'resqusts fetch successfully',
            payload: reqs
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
        postId,
        payload
    } = req.body;

    console.log(req.body)
    const isE = isEmpty(postId);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(postId)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Posts.findByIdAndUpdate(
        postId,
        { ...payload },
        { new: true }).then((post) => {
            if (!post)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "post does not exists"
                    }
                })
            return res.status(201).json({
                message: 'posts data updated successfully',
                payload: post
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

exports.getPost = async (req, res, next) => {
    const postId = req.params.id;

    const isE = isEmpty(postId);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(postId)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)

    try {
        const posts = await Posts.findById({ _id: postId })
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



