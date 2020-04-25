const spotifyController = require('../controllers/spotifyController');
var express = require('express');
var router = express.Router();

router.route('/users').post(spotifyController.iAmOnline)

module.exports = router;