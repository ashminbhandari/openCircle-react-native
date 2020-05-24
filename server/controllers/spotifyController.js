const httpStatus = require('http-status-codes');
const spotifyService = require('../services/spotifyService');

module.exports = {
    //Update session location for the user
    async updateSessionLocation(req, res) {
      try {
          let response = await spotifyService.updateSessionLocation(req);
          return res.status(response.httpStatus).send(response);
      } catch(error) {
          console.log("Error in updateSessionLocation in spotifyController", error);
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error updating session location of the user.');
      }
    },
    
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

    //Gets the users Spotify data
    async getUserSpotifyData(req,res) {
        try {
            let response = await spotifyService.getUserSpotifyData(req.body.user);
            return res.status(response.httpStatus).send(response);
        } catch (error) {
            console.log("Error in getUserSpotify in SpotifyController", error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error, getting user Spotify information...');
        }
    }
};