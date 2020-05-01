const spotifyController = require('../controllers/spotifyController');
const express = require('express');
const passportAuth = require('../authentication/passportAuth');
const httpStatus = require('http-status-codes');
const router = express.Router();

router.use(passportAuth.isAuthenticated);

router.route('/users').post(spotifyController.iAmOnline)

//App sends a request here to check whether or not the user is currently logged in
router.get('/checkCookie', (req,res) => {
   //If we reach here, cookie is valid
   return res.status(httpStatus.OK).send('isAuthenticated');
});

module.exports = router;