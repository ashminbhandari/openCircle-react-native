const spotifyController = require('../controllers/spotifyController');
const express = require('express');
const passportAuth = require('../authentication/passportAuth');
const httpStatus = require('http-status-codes');
const router = express.Router();

router.use(passportAuth.isAuthenticated);

router.route('/users').post(spotifyController.iAmOnline)

router.get('/checkCookie', (req,res) => {
   //If we reach here, cookie is valid
   return res.status(httpStatus.OK);
});

module.exports = router;