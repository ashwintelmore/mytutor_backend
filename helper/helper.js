
const mongoose = require('mongoose');
const { ERRORS } = require("./constants");

exports.isEmpty = (...args) => {

    for (let index = 0; index < args.length; index++) {
        const e = args[index];
        if (e == '')
            return {
                error: {
                    errCode: ERRORS.ITS_EMPTY,
                    errMessage: "Input Field Should not empty"
                }
            };
    }
    return 0;
};


exports.isInalidMongoDBid = (id) => {
    if (mongoose.Types.ObjectId.isValid(id))
        return 0;
    return {
        error: {
            errCode: ERRORS.SOMETHING_WRONG,
            errMessage: "user id is not valid or not found"
        }
    };
}