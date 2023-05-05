const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');
const Payments = require('../models/Payments');


exports.createPayment = async (req, res) => {
    const {
        payload
    } = req.body;
    // slot data should be come from front end as first user need to login 
    // while login data is fetch and store in state send that slot with payload
    // return

    console.log('req.body', req.body)
    if (!payload)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })

    const newData = new Payments(payload)

    return await newData.save().then(async (data) => {

        res.status(201).json({
            message: 'Payment created successfully',
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

exports.updatePayment = async (req, res, next) => {
    const {
        payload
    } = req.body;
    const {
        id
    } = req.params;
    const isE = isEmpty(id);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(id)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)


    return await Payments.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then((Payment) => {
            if (!Payment)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "Payment does not exists"
                    }
                })
            return res.status(201).json({
                message: 'Payments data updated successfully',
                payload: Payment
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



exports.getAllPayments = async (req, res, next) => {
    const {
        tutorId,
        learnerId,
        postId,
        requestId,
    } = req.query;

    let findQuery = {}
    if (postId != '' && requestId != '') {
        findQuery = { postId: postId, requestId: requestId }
    } else if (postId != '' && tutorId != '') {
        findQuery = { postId: postId, tutorId: tutorId }
    } else if (postId != '' && learnerId != '') {
        findQuery = { postId: postId, learnerId: learnerId }
    } else if (tutorId != '') {
        findQuery = { tutorId: tutorId }
    } else if (learnerId != '') {
        findQuery = { learnerId: learnerId }
    } else if (postId != '') {
        findQuery = { postId: postId }
    } else {
        return res.status(404).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Input parameter not given"
            }
        })
    }



    try {
        const resp = await Payments.find(findQuery)
        if (!resp)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "Payments does not exists"
                }
            })

        return res.status(201).json({
            message: 'Payments fetch successfully',
            payload: resp
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

