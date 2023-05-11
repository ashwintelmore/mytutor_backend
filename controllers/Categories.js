const { ERRORS } = require("../helper/constants");
const Categories = require("../models/Categories");
const fs = require('file-system');
const { isEmpty, isInalidMongoDBid } = require('../helper/helper')


exports.createCategory = async (req, res, next) => {
    const { catName, imgUrl } = req.body;

    // var encode_image = img.toString('base64');
    // var finalImg = Buffer.from(encode_image, 'base64');
    // return res.json({ "okay": "test" })

    const isE = isEmpty(catName);
    if (isE)
        return res.status(200).json(isE);

    //check already exits of not
    try {
        const cat = await Categories.findOne({ catName: { $regex: catName, $options: 'i' } })
        if (cat) {
            return res.status(208).json({
                error: {
                    errCode: ERRORS.ALREADY_EXIST,
                    errMessage: "Category name already exists"
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
        catName,
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

    const newCat = new Categories(data)

    newCat.save().then((responce) => {
        res.status(201).json({
            message: 'Category created successfully',
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
exports.updateCategory = async (req, res, next) => {
    const { catName, imgUrl } = req.body;
    const { id } = req.params;

    const isE = isEmpty(id);
    if (isE)
        return res.status(200).json(isE);

    const isinvalidId = isInalidMongoDBid(id)
    if (isinvalidId)
        return res.status(200).json(isinvalidId)

    let data = {
        catName,
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

    return await Categories.findByIdAndUpdate(
        id,
        { ...data },
        { new: true }).then((cat) => {
            if (!cat)
                return res.status(404).json({
                    error: {
                        errCode: ERRORS.NOT_FOUND,
                        errMessage: "cat does not exists"
                    }
                })
            return res.status(201).json({
                message: 'cats data updated successfully',
                payload: cat
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
exports.getAllCategories = async (req, res, next) => {


    const cats = await Categories.find()

    if (!cats || cats.length <= 0)
        return res.status(404).json({
            error: {
                errCode: ERRORS.NOT_FOUND,
                errMessage: "Catagories not found"
            }
        })

    return res.status(201).json({
        message: 'category fetch successfully successfully',
        payload: cats
    })
}

exports.getCategory = async (req, res, next) => {

    const {
        id
    } = req.params;

    let findQuery = {}
    if (id != '') {
        findQuery = { _id: id }
    }


    const cats = await Categories.find(findQuery)

    if (!cats || cats.length <= 0)
        return res.status(404).json({
            error: {
                errCode: ERRORS.NOT_FOUND,
                errMessage: "Catagories not found"
            }
        })

    return res.status(201).json({
        message: 'category fetch successfully successfully',
        payload: cats
    })
}