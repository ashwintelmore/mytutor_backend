const { ERRORS } = require("../helper/constants");
const { isEmpty, isInalidMongoDBid } = require("../helper/helper");
const UserDetails = require("../models/UserDetails")

const jwt = require('jsonwebtoken');
const JWT_KEY_MAIL = process.env.JWT_KEY_MAIL
const FRONTEND_END_POINT = process.env.FRONTEND_END_POINT
const SENDER_GMAIL = process.env.SENDER_GMAIL

const transporter = require('../middlewares/SendMail')


exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const isE = isEmpty(name, email, password);
    if (isE)
        return res.status(200).json(isE);



    const token = jwt.sign({
        data: `Token Data`,
    }, JWT_KEY_MAIL,
        { expiresIn: '10m' }
    );

    try {
        let info = await transporter.sendMail({
            from: `MyTutor ${SENDER_GMAIL}`, // sender address
            to: `${email} , ${SENDER_GMAIL}`, // list of receivers
            subject: "Verify email ✔", // Subject line
            text: `Hi! There, You have recently visited 
                our website and entered your email.
                Please follow the given link to verify your email
                ${FRONTEND_END_POINT}/${email}/${token} 
                Thanks`, // html body
        });


    } catch (error) {
        console.log('error', error)
        return res.status(500).json({
            error: {
                errCode: ERRORS.SOMETHING_WRONG,
                errMessage: "We are facing some issue to send verification mail. Please contact support"
            }
        })
    }

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
exports.resendVerification = async (req, res, next) => {
    const { name, email, } = req.body;

    console.log('req.body', req.body)
    const isE = isEmpty(name, email);
    if (isE)
        return res.status(200).json(isE);

    try {
        const user = await UserDetails.findOne({ email: email })
        if (!user)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "User not exists"
                }
            })
        if (user) {
            const token = jwt.sign({
                data: `Token Data`,
            }, JWT_KEY_MAIL,
                { expiresIn: '10m' }
            );

            try {
                let info = await transporter.sendMail({
                    from: `MyTutor ${SENDER_GMAIL}`, // sender address
                    to: `${email} , ${SENDER_GMAIL}`, // list of receivers
                    subject: "Verify email ✔", // Subject line
                    text: `Hi! There, You have recently visited 
                        our website and entered your email.
                        Please follow the given link to verify your email
                        ${FRONTEND_END_POINT}/${email}/${token} 
                        Thanks`, // html body
                });
                return res.status(201).json({
                    message: 'Verification mail sended successfully',
                    payload: user
                })

            } catch (error) {
                console.log('error', error)
                return res.status(500).json({
                    error: {
                        errCode: ERRORS.SOMETHING_WRONG,
                        errMessage: "We are facing some issue to send verification mail. Please contact support"
                    }
                })
            }
        }

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


exports.verifyEmail = async (req, res) => {
    const { token, email } = req.params;

    // Verifying the JWT token 
    console.log('req.params', req.params)
    jwt.verify(token, JWT_KEY_MAIL, async function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(404).json({
                error: {
                    errCode: ERRORS.SOMETHING_WRONG,
                    errMessage: "Email verification failed, possibly the link is invalid or expired"
                }
            })
        }
        else {
            const user = await UserDetails.findOne({ email: { $regex: email, $options: 'i' } })
            const data = {
                ...user._doc,
                isVerified: true
            }

            if (!user)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "User not exists"
                    }
                })

            if (user.isVerified)
                return res.status(201).json({
                    message: 'Already verified',
                    payload: user
                })

            console.log('data', data)
            console.log('user', user)
            return await UserDetails.findByIdAndUpdate(
                data._id,
                { ...data },
                { new: true }).then((user) => {
                    console.log('user', user)
                    if (!user)
                        return res.status(404).json({
                            error: {
                                errCode: ERRORS.NOT_FOUND,
                                errMessage: "User does not exists or possibly the link is invalid or expired"
                            }
                        })
                    return res.status(201).json({
                        message: 'Your Email verifyed successfully',
                        payload: data
                    })

                }).catch((err) => {
                    console.log(err)
                    return res.status(404).json({
                        error: {
                            errCode: ERRORS.SOMETHING_WRONG,
                            errMessage: "Something went wrong"
                        }
                    })
                })
        }
    });
};

exports.forgetPassword = async (req, res, next) => {
    const { email, } = req.body;

    console.log('req.body', req.body)
    const isE = isEmpty(email);
    if (isE)
        return res.status(200).json(isE);

    try {
        const user = await UserDetails.findOne({ email: { $regex: email, $options: 'i' } })
        if (!user)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "User does not exist"
                }
            })
        if (user) {
            try {
                let info = await transporter.sendMail({
                    from: `MyTutor ${SENDER_GMAIL}`, // sender address
                    to: `${email} , ${SENDER_GMAIL}`,
                    subject: "Hello , Here is your credential ✔", // Subject line
                    html: `Hi! There, Here is your credential
                    <br>
                    <b>Email : </b> ${user.email} <br>
                    <b>Password : </b> ${user.password} 
                    <br><br>Thanks`, // html body
                });
                return res.status(201).json({
                    message: 'Password mail sended successfully',
                    payload: {}
                })

            } catch (error) {
                console.log('error', error)
                return res.status(500).json({
                    error: {
                        errCode: ERRORS.SOMETHING_WRONG,
                        errMessage: "We are facing some issue to send verification mail. Please contact support"
                    }
                })
            }
        }

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


exports.login = async (req, res, next) => {

    const { email, password } = req.body;
    console.log('req.body :>> ', req.body);

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

    return res.status(200).json({
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
                errMessage: error
            }
        })
    }
}

exports.getUserData = async (req, res, next) => {
    const {
        id
    } = req.params;

    const isE = isEmpty(id);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(id)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)

    return await UserDetails.findById(id).then((user) => {
        if (!user)
            return res.status(404).json({
                error: {
                    errCode: ERRORS.NOT_FOUND,
                    errMessage: "User not exists"
                }
            })
        return res.status(201).json({
            message: 'User fetch successfully',
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

