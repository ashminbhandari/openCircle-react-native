var mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    spotify_id: {
        type: String,
        required: true
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
})

module.exports = usersSchema;