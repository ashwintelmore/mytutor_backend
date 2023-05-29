const { ERRORS } = require('../helper/constants');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper');
const Posts = require('../models/Posts');
const Requests = require('../models/Requests');
const Notifications = require('../models/Notification');
const Meetings = require('../models/Meeting');
const UserDetails = require('../models/UserDetails');
const multer = require('multer');

const FRONTEND_END_POINT = process.env.FRONTEND_END_POINT
const SENDER_GMAIL = process.env.SENDER_GMAIL

const transporter = require('../middlewares/SendMail')

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

        const user = await UserDetails.findById({ '_id': data.recieverId })

        console.log('data', data)
        console.log('user', user)
        if (data.type === 'request' && data.message === 'REQUEST_ACCEPTED') {

            console.log("sended mail ")

            let info = await transporter.sendMail({
                from: `MyTutor ${SENDER_GMAIL}`, // sender address
                to: `${user.email} , ${SENDER_GMAIL}`,
                subject: "Yeh! Your Request Accepted", // Subject line
                html: `Hey! There, Your Request Accepted by tutor 
                <br>
                <b>check out now : </b> ${FRONTEND_END_POINT}/postcontent/${data.postId} <br>
                <br><br>Thanks`, // html body
            });
        }



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

            const user = await UserDetails.findById({ '_id': data.recieverId })

            console.log('data', data)
            console.log('user', user)
            if (data.type === 'request' && data.message === 'REQUEST_ACCEPTED') {

                console.log("sended mail ")

                let info = await transporter.sendMail({
                    from: `MyTutor ${SENDER_GMAIL}`, // sender address
                    to: `${user.email} , ${SENDER_GMAIL}`,
                    subject: "Yeh! Your Request Accepted", // Subject line
                    html: `Hey! There, Your Request Accepted by tutor 
                    <br>
                    <b>check out now : </b> ${FRONTEND_END_POINT}/postcontent/${data.postId} <br>
                    <br><br>Thanks`, // html body
                });
            } else if (data.type === 'request' && data.message === 'REQUEST_REJECTED') {

                console.log("sended mail ")

                let info = await transporter.sendMail({
                    from: `MyTutor ${SENDER_GMAIL}`, // sender address
                    to: `${user.email} , ${SENDER_GMAIL}`,
                    subject: "Ohh! Your Request rejected", // Subject line
                    html: `Hey! There, Your Request rejected by tutor 
                    <br>
                    <b>check out now : </b> ${FRONTEND_END_POINT}/postcontent/${data.postId} <br>
                    <br><br>Thanks`, // html body
                });
            }





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

