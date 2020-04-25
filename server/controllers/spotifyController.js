const httpStatus = require('http-status-codes');
const spotifyService = require('../services/spotifyService');

module.exports = {
    async iAmOnline(req, res) {
        try {
            let response = await spotifyService.iAmOnline(req.body.id, req.body.location);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in iAmOnline in spotifyController.');
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error saving user as online.');
        }
    },
};