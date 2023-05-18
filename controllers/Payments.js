const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');
const Payments = require('../models/Payments');
const fs = require('file-system');


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

    let data = {
        ...JSON.parse(payload),
    }

    if (req.file) {
        data = {
            ...data,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            }
        }
    }


    const newData = new Payments(data)

    return await newData.save().then(async (_data) => {

        res.status(201).json({
            message: 'Payment created successfully',
            payload: _data
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


    let data = {
        ...JSON.parse(payload),
    }

    if (req.file) {
        data = {
            ...data,
            image: {
                data: fs.readFileSync(req.file.path),
                contentType: req.file.mimetype
            }
        }
    }


    return await Payments.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }).then(async (payment) => {

            if (payment.paymentStatus.isCompletd) {
                //update tutordata
                await UserDetails.findByIdAndUpdate({ _id: payment.tutorId }, { $inc: { 'analytics.lectures': 1 } }, { new: true }).then((data) => {
                    // console.log('user data', data)
                })

                await Requests.findByIdAndUpdate({ _id: payment.requestId }, { isPaymentComplete: true })
                    .then((data) => {
                        // console.log('request data', data)
                    })
            }

            if (!payment)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "payment does not exists"
                    }
                })
            console.log("updated")
            return res.status(201).json({
                message: 'payments data updated successfully',
                payload: payment
            })

        }).catch((err) => {
            console.log('err', err)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.SOMETHING_WRONG,
                    errMessage: "Something went wrong"
                }
            })
        })
}



exports.getPayment = async (req, res, next) => {
    const {
        id
    } = req.params;

    console.log('req.params', req.params)


    try {
        const resp = await Payments.findById({ _id: id })
        console.log('req.params', resp)
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

