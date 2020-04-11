var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/spotifyCredentials', function(req, res, next) {
    const clientId = '08d55a470aef4302b9b3a82d93aa3f05';
    const clientSecret = 'c8dabbabf9fb4dfcb835dc3b8e8f26fb';
    const redirectUri = 'https://auth.expo.io/@abhandar/openCircle';
    const spotifyCredentials = { clientId, clientSecret, redirectUri };
    res.json(spotifyCredentials);
});

module.exports = router;
