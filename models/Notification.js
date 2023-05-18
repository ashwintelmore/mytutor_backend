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
    type: {
        type: String,
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
