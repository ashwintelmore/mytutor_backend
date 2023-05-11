const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const UserDetails = require('../models/UserDetails');



exports.createPosts = async (req, res) => {
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

    // const newPost = new Posts({
    //     ...payload,
    //     thumbnailUrl: {
    //         data: req.file.filename,
    //         contentType: 'image/png'
    //     }
    // });
    const newPost = new Posts(payload)

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
        payload
    } = req.body;
    const {
        postId
    } = req.params;


    console.log('payload', payload)

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


exports.searchPost = async (req, res, next) => {


    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || '';
    const search = req.query.search || "";
    const type = req.query.type || 'posts'; // - user or - post by default
    const postType = req.query.postType || '';
    const category = req.query.category || '';
    let sort = req.query.sort || {};//
    let tags = req.query.tags || "All";

    if (sort === 'l2h') {
        sort = { charges: 1 }
    } else if (sort === 'h2l') {
        sort = { charges: -1 }
    } else if (sort === 'recent') {
        sort = { createdAt: -1 }
    } else if (sort === 'older') {
        sort = { createdAt: 1 }
    }


    console.log('req.query', req.query)

    let findQuery = { postTitle: { $regex: search, $options: "i" }, }
    if (postType != '') {
        findQuery = {
            postTitle: { $regex: search, $options: "i" },
            postType: postType,
        }
    }
    if (category != '') {
        findQuery = {
            ...findQuery,
            category: category
        }
    }
    console.log('findquery', findQuery)

    let result;
    if (type === 'posts') {
        result = await Posts.find(findQuery)
            // .skip(page)
            .sort(sort)
            .limit(limit)

    } else if (type === "users") {
        //user
        result = await UserDetails.find({ name: { $regex: search, $options: "i" } }).limit(limit)
    }


    if (!result)
        return res.status(404).json({
            error: {
                errCode: ERRORS.NOT_FOUND,
                errMessage: "Posts not exists"
            }
        })
    return res.status(200).json({
        message: 'Posts fetch successfully',
        payload: result
    })
}



