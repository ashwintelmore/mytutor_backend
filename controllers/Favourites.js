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


        //find tutor by id in favourite database
        let allFavOfTutor = await Favourites.find({ tutorId: data.tutorId, isFavourite: true });

        //update that tutor with array
        const userData = await UserDetails.findById({ _id: data.tutorId });

        const userDatatobeUpdated = {
            analytics: {
                ...userData.analytics,
                favorite: allFavOfTutor.length
            }
        }
        const updatedUserData = await UserDetails.updateOne(
            { _id: data.tutorId },
            { ...userDatatobeUpdated }
            , { new: true })

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


    return await Favourites.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then(async (data) => {


            console.log('data', data)

            //find tutor by id in favourite database
            let allFavOfTutor = await Favourites.find({ tutorId: data.tutorId, isFavourite: true });

            //update that tutor with array
            const userData = await UserDetails.findById({ _id: data.tutorId });

            const userDatatobeUpdated = {
                analytics: {
                    ...userData.analytics,
                    favorite: allFavOfTutor.length
                }
            }
            await UserDetails.updateOne(
                { _id: data.tutorId },
                { ...userDatatobeUpdated }
                , { new: true })

            if (!data)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "Favourite does not exists"
                    }
                })
            return res.status(201).json({
                message: 'Favourites data updated successfully',
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



exports.getFavourites = async (req, res, next) => {
    const {
        tutorId,
        learnerId,
    } = req.query;
    let findQuery = {}
    if (tutorId != '' && learnerId != '') {
        findQuery = { tutorId: tutorId, learnerId: learnerId }
    } else if (tutorId != '') {
        findQuery = { tutorId: tutorId, isFavourite: true }
    } else if (learnerId != '') {
        findQuery = { learnerId: learnerId, isFavourite: true }
    }
    console.log('findQuery', findQuery)
    try {
        const resp = await Favourites.find(findQuery)
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
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    }
}

