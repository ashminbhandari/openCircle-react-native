var mongoose = require('mongoose');

let spotifySchema = new mongoose.Schema({
    auth_code: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
    },
    refresh_token: {
        type: String,
    },
    expirationTime: {
        type: Number,
    },
})

module.exports = spotifySchema;