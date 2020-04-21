var express = require('express');
var router = express.Router();

/* GET Spotify credentials*/
router.get('/spotifyCredentials', function(req, res, next) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const spotifyCredentials = { clientId, clientSecret, redirectUri };
    res.json(spotifyCredentials);
});

module.exports = router;
