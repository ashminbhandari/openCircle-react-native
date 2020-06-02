var mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    expiration_time: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number
    },
    passwordResetToken: {
        type: Number
    },
    passwordResetTokenExpirationTime: {
        type: String
    }
})

module.exports = usersSchema;