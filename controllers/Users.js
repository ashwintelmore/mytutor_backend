const { ERRORS } = require("../helper/constants");
const { isEmpty, isInalidMongoDBid } = require("../helper/helper");
const UserDetails = require("../models/UserDetails")




exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const isE = isEmpty(name, email, password);
    if (isE)
        return res.status(200).json(isE);

    try {
        const user = await UserDetails.findOne({ email: email })

        if (user) {
            return res.status(208).json({
                error: {
                    errCode: ERRORS.ALREADY_EXIST,
                    errMessage: "Email id already exists"
                }
            })
        }

    } catch (error) {
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    }

    let data = {
        name, email, password
    }
    const newUser = new UserDetails({ ...data })

    newUser.save().then((responce) => {
        console.log('responce :>> ', responce);
        res.status(201).json({
            message: 'User created successfully',
            payload: responce
        })
    }).catch((err) => {
        console.log('err :>> ', err);
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "Something went wrong"
            }
        })
    })
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    const isE = isEmpty(email, password);
    if (isE)
        return res.status(200).json(isE);

    const user = await UserDetails.findOne({ email: { $regex: email, $options: 'i' } })

    if (!user)
        return res.status(404).json({
            error: {
                errCode: ERRORS.NOT_FOUND,
                errMessage: "User not exists"
            }
        })

    if (user.password != password)
        return res.status(401).json({
            error: {
                errCode: ERRORS.NOT_MATCH,
                errMessage: "Invalid Password"
            }
        })

    return res.status(201).json({
        message: 'User login successfully',
        payload: user
    })
}

exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await UserDetails.find()

        if (!users)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "Users not exists"
                }
            })

        return res.status(201).json({
            message: 'Users fetch successfully',
            payload: users
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

exports.updateUserDetails = async (req, res, next) => {
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

    return await UserDetails.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true }).then((user) => {
            if (!user)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "Users not exists"
                    }
                })
            return res.status(201).json({
                message: 'User data updated successfully',
                payload: user
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

