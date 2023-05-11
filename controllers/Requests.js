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

    const isinvalidId = isInalidMongoDBid(payload._id)
    if (!isinvalidId) {
        //update
        return await Requests.findByIdAndUpdate(
            payload._id,
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
        const reqs = await Requests.find({ requesterId: id, cancelStatus: false })
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
        const reqs = await Requests.find({ requestedId: id, cancelStatus: false })
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

exports.getAllPostAndRequestedReq = async (req, res, next) => {
    const {
        requestedId,
        postId
    } = req.params;

    try {
        const reqs = await Requests.find({ requestedId: requestedId, postId: postId, cancelStatus: false })

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

exports.getAllPostAndRequesterReq = async (req, res, next) => {
    const {
        requesterId,
        postId
    } = req.params;

    try {
        const reqs = await Requests.find({ requesterId: requesterId, postId: postId, cancelStatus: false })

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



