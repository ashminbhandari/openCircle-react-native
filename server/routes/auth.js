const authController = require('../controllers/authController');
var express = require('express');
var router = express.Router();

router.route('/credentials').get(authController.getCredentials);

router.route('/token').post(authController.upsertAuthData);

module.exports = router;