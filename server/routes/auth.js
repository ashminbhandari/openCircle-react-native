const config = require('../config/config');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/spotifyCredentials', function(req, res, next) {
    const clientID = config.clientID;
    const clientSecret = config.clientSecret;
    const redirectURI = config.redirectURI;
    const spotifyCredentials = { clientID, clientSecret, redirectURI };
    res.json(spotifyCredentials);
});

module.exports = router;
