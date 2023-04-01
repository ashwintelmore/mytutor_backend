const Users = require("../models/test");

exports.test = (req, res, next) => {

    const data = {
        name: 'ashwin',
        email: "test@ashwin",
        password: "12345",
    }
    const testNew = new Users(data);

    testNew.save().then(() => {
        console.log('saved')
        res.json({ data })
    }).catch((err) => {
        console.log('error', err)
        res.json({ err })
    });
}

