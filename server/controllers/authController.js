const httpStatus = require('http-status-codes')
const authService = require('../services/authService')
const jwt = require('jsonwebtoken');

module.exports = {
    async getAccessToken(req,res,next) {
        let response;
        try {
            let spotifyAccessToken = await authService.getAccessToken(req.body.code);

            //Sign with JWT and send
            jwt.sign(spotifyAccessToken, process.env.JWT_SECRET_KEY, (err, token) => {
                return res.status(httpStatus.CREATED).json({
                    token
                })
            });
        } catch(err) {
            console.log('Error in authController while creating token.');
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error creating tokens.');
        }
    }
}
