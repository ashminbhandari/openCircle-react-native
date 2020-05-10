const spotifyController = require('../controllers/spotifyController');
const express = require('express');
const passportAuth = require('../authentication/passportAuth');
const httpStatus = require('http-status-codes');
const router = express.Router();

//This moudle uses authentication
router.use(passportAuth.isAuthenticated);

//App sends a request here to check whether or not the user is currently logged in
router.get('/checkCookie', (req,res) => {
   //If we reach here, cookie is valid, send back active user ID
   return res.status(httpStatus.OK).send(req.session.passport.user);
});

//Session location update for the user
router.route('/updateSessionLocation').post(spotifyController.updateSessionLocation);

//Gather all the online users
router.route('/gatherOnlineUsers').get(spotifyController.gatherOnlineUsers);

module.exports = router;