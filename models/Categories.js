const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({

    catName: {
        type: String,
        trim: true,
        // unique: true
        default: ''
    },
    imgUrl: {
        type: String,
        default: ''
    },
    priority: {//high number high priority
        type: Number,
        default: 0
    },
    image: {
        data: {
            type: Buffer,
            default: []
        },
        contentType: {
            type: String,
            default: ''
        },
    },
}, { timestamps: true });


module.exports = mongoose.model('Categorie', categorySchema);
