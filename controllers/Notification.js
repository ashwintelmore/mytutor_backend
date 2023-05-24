const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Notifications = require('../models/Notification');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');


exports.createNotification = async (req, res) => {
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
    const newData = new Notifications(payload)

    return await newData.save().then(async (data) => {

        res.status(201).json({
            message: 'Notification created successfully',
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

exports.updateNotification = async (req, res, next) => {
    const {
        payload
    } = req.body;

    const {
        id
    } = req.params;

    console.log('req.body', req.body)
    console.log('req.params', req.params)

    const isE = isEmpty(id);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(id)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Notifications.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then(async (data) => {

            return res.status(201).json({
                message: 'Notifications data updated successfully',
                payload: data
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



exports.getNotifications = async (req, res, next) => {
    const {
        id,
        read
    } = req.query;
    console.log('req.query', req.query)
    let findQuery = { recieverId: id }
    if (!isEmpty(read)) {
        findQuery = {
            ...findQuery,
            read: read
        }
    }
    console.log('findQuery', findQuery)
    try {
        const resp = await Notifications.find(findQuery)
            .populate({ path: 'senderId', select: '_id name' })
            .populate({ path: 'recieverId', select: '_id name' })
            .populate({ path: 'requestId', select: '_id' })
            .populate({ path: 'postId', select: '_id postTitle' })
            // .populate('paymentId')
            .sort({ createdAt: -1 })

        if (!resp)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "Favourit not exists"
                }
            })

        return res.status(201).json({
            message: 'Favourit fetch successfully',
            payload: resp
        })

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    }
}

