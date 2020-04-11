const config = require('../config/config');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/spotifyCredentials', function(req, res, next) {
    const clientID = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectURI = process.env.SPOTIFY_REDIRECT_URI;
    const spotifyCredentials = { clientID, clientSecret, redirectURI };
    res.json(spotifyCredentials);
});

module.exports = router;
