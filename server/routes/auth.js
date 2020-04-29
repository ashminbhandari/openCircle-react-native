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
router.post('/joinServer', passport.authenticate('joinServer'), (req,res,next) => {
    // If this part gets executed, it means authentication was successful
    // Regenerating a new session ID after the user is authenticated
    let temp = req.session.passport;
    req.session.regenerate((err) => {
        req.session.passport = temp;
        req.session.save((err) => {
            res.status(httpStatus.OK).send({
                email: req.user.email,
            });
        })
    });
});

module.exports = router;