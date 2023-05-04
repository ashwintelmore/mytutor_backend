const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Favourites = require('../models/Favourite');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');


exports.createFavourite = async (req, res) => {
    const {
        payload
    } = req.body;
    if (!payload)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    const newData = new Favourites(payload)

    return await newData.save().then(async (data) => {

        res.status(201).json({
            message: 'Favourite created successfully',
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

exports.updateFavourite = async (req, res, next) => {
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


    return await Favourites.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then((Favourite) => {
            if (!Favourite)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "Favourite does not exists"
                    }
                })
            return res.status(201).json({
                message: 'Favourites data updated successfully',
                payload: Favourite
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



