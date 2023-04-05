const { ERRORS } = require("../helper/constants");
const Categories = require("../models/Categories");
const { isEmpty } = require('../helper/helper')


exports.createCategory = async (req, res, next) => {
    const { catName, imgUrl } = req.body;

    const isE = isEmpty(catName);
    if (isE)
        return res.status(200).json(isE);

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
        catName, imgUrl
    }
    const newCat = new Categories(data)

    newCat.save().then((responce) => {
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