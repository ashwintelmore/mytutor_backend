const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recieverId: {//who will recieved request
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails'
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        default: null
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        default: null
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    type: {
        type: String,
        enum: ['request', 'canceled', 'normal', 'accepted', 'payment', 'favourite'],
        default: 'normal'
    },
    extraInfo: {
        type: Object,
        default: {}
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
