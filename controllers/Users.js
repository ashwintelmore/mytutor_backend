const { ERRORS } = require("../helper/constants");
const Users = require("../models/Users")

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ email: email })
    if (user) {
        return res.status(208).json({
            error: {
                errCode: ERRORS.ALREADY_EXIST,
                errMessage: "Email id already exists"
            }
        })
    }
    let data = {
        name, email, password
    }
    const newUser = new Users(data)

    newUser.save().then((someting) => {
        console.log('someting :>> ', someting);
        res.status(201).json({
            message: 'User created successfully',
            payload: data
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

    const user = await Users.findOne({ email: email })

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