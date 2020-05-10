const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const httpStatus = require('http-status-codes');

//Get request for Spotify credentials
router.get('/credentials', function (req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const credentials = {clientId, redirectUri};
    res.json(credentials);
});

//Create a new user
router.route('/createUser').post(authController.createUser);

//Join the server
router.post('/joinServer', passport.authenticate('login'), (req,res) => {
    // If this part gets executed, it means authentication was successful
    // Regenerating a new session ID after the user is authenticated
    let temp = req.session.passport;
    req.session.regenerate(() => {
        req.session.passport = temp;
        req.session.save(() => {
            res.status(httpStatus.OK).send({
                name: req.user.name,
                id: req.user._id,
            });
        })
    });
});

module.exports = router;