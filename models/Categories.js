const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({

    catName: {
        type: String,
        trim: true,
    },
    imgUrl: {
        type: String,
        trim: true
    }
});


module.exports = mongoose.model('Categorie', categorySchema);
