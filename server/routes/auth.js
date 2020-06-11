const authController = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const httpStatus = require('http-status-codes');

//The scope that we will be asking the user permission for
const scopesArr = ['user-read-email', 'user-read-currently-playing',
    'user-read-recently-played',
    'user-library-read', 'user-library-modify', 'user-top-read',
    'user-read-private'
]; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');

//Get request for Spotify credentials
router.get('/credentials', function (req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const credentials = {clientId, redirectUri, scopes};
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

router.get('/logout', (req,res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if(err) {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("server error - could not clear out session info completely")
            }
            return res.status(httpStatus.OK).send("logged out successfully");
        });
    }
    else {
        if (req.isUnauthenticated()) {
            return res.status(httpStatus.OK).send("logged out successfully");
        }
        else {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("server error - could not log out")
        }
    }
});

router.route('/generateToken').post(authController.generateToken);

router.route('/checkCode').post(authController.checkCode);

router.route('/newPassword').post(authController.newPassword);

module.exports = router;