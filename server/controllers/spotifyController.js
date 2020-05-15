const httpStatus = require('http-status-codes');
const spotifyService = require('../services/spotifyService');

module.exports = {

    /**/
    /*

     updateSessionLocation

     NAME

       updateSessionLocation - updates session location for the user

     SYNOPSIS

        const updateSessionLocation(req, res)

            req -> request object
            res -> response object

     DESCRIPTION

        Forwards request over to service

     RETURNS

       Response object with status code and message

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     gatherOnlineUsers

     NAME

       gatherOnlineUsers - gather online users controller

     SYNOPSIS

        const gatherOnlineUsers(req, res)

            req -> request object
            res -> response object

     DESCRIPTION

        Forwards request over to service

     RETURNS

       Response object with status code and message

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     getUserSpotify

     NAME

       getUserSpotify - get user Spotify controller

     SYNOPSIS

        const getUserSpotify(req, res)

            req -> request object
            res -> response object

     DESCRIPTION

        Forwards request over to service

     RETURNS

       Response object with status code and message

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Gets the users Spotify data
    async getUserSpotify(req,res) {
        try {
            let response = await spotifyService.getUserSpotify(req.body.user);
            return res.status(response.httpStatus).send(response);
        } catch (error) {
            console.log("Error in getUserSpotify in SpotifyController", error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Error, getting user Spotify information...');
        }
    }
};