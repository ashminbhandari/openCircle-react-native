const authController = require('../controllers/authController');
var express = require('express');
var router = express.Router();

//Get request for Spotify credentials
router.get('/credentials', function (req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const credentials = {clientId, redirectUri};
    res.json(credentials);
});

router.route('/createUser').post(authController.createUser);

module.exports = router;