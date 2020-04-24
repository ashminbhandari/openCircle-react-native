var mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    encAccessToken: {
        type: String,
        required: true
    },
    ivAccessToken: {
        type: String,
        required: true
    },
    encRefreshToken: {
        type: String,
        required: true
    },
    ivRefreshToken: {
        type: String,
        required: true
    },
    expirationTime: {
        type: Number,
        required: true
    },
})

module.exports = usersSchema;