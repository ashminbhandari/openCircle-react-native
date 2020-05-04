const httpStatus = require('http-status-codes');
const spotifyService = require('../services/spotifyService');

module.exports = {

    //Goes through the sessions collection and returns a list of online users
    async gatherOnlineUsers(req, res) {
        try {
            let response = await spotifyService.gatherOnlineUsers(req);
            return res.status(response.httpStatus).send(response);
        } catch (err) {
            console.log('Error in gatherOnlineUsers in spotifyController.', err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error gathering  users.');
        }
    },
};