const spotifyController = require('../controllers/spotifyController');
const express = require('express');
const passportAuth = require('../authentication/passportAuth');

const router = express.Router();

router.use(passportAuth.isAuthenticated);

router.route('/users').post(spotifyController.iAmOnline)

module.exports = router;