const mongoose = require('mongoose');
const connection = mongoose.connection; //Get the database connection
const httpStatus = require('http-status-codes');
const User = require('../database/models/users');
const spotifyApi = require('../spotifyAPI/api');
const axios = require('axios');

//Extracting the user id
//
module.exports = {

    /**/
    /*

     updateSessionLocation

     NAME

       updateSessionLocation - updates a user's session location

     SYNOPSIS

        async updateSessionLocation()

     DESCRIPTION

        Updates a user' session location in the MongoDB sessions database

     RETURNS

        HTTP response object with status code

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    async updateSessionLocation(req) {
        let result;
        try {
            //Gather information from the request object
            let user = req.session.passport.user; //User ID
            let latitude = req.body.location.coords.latitude; //User's latitude
            let longitude = req.body.location.coords.longitude; //User's longitude

            //Add the location to user's session
            req.session.latitude = latitude;
            req.session.longitude = longitude;

            //If we reach here means the update was without trouble
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
            };

            return result;
        } catch (error) {
            console.log('Error at updateSessionLocation in spotifyService', error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'Session location could not be updated...'
            };
            return result;
        }
    },

    /**/
    /*

     gatherOnlineUsers

     NAME

       gatherOnlineUsers - Gathers all the online users

     SYNOPSIS

        async gatherOnlineUsers()

     DESCRIPTION

        Gets all the online users as an array

     RETURNS

        List of all online users

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    async gatherOnlineUsers() {
        let result;
        try {
            //Get the session collection
            let sessionColl = await connection.collection('sessions');

            //Get a sample of 100 users
            let sample = await sessionColl.aggregate({$sample: {size: 100}});

            //Convert the sample cursor object into an array
            let sampleArray = await sample.toArray();

            //Map into an array of user ID's and their location
            let userArray = sampleArray.map(user => {
                return {
                    id: JSON.parse(user.session).passport.user,
                    latitude: JSON.parse(user.session).latitude,
                    longitude: JSON.parse(user.session).longitude
                }
            });

            //If we reached here means everything went OK, so construct the response object
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
                data: userArray
            };

            return result;
        } catch (error) {
            console.log(error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'User data could not be gathered.'
            };
            return result;
        }
    },

    /**/
    /*

     getUserSpotify

     NAME

       getUserSpotify - Gets a user's Spotify data

     SYNOPSIS

        async getUserSpotify(user)

            user-> The userID for which to get the Spotify data for

     DESCRIPTION

        Gets the Spotify data for the user by sending an appropriate HTTP response to the client

     RETURNS

        Javascript object containing Spotify data as well as the name of the user who requested the data

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    async getUserSpotify(user) {
        try {
            //Find the user by their ID
            let theUser = await User.findById(user);

            //Refresh the access token
            spotifyApi.setRefreshToken(theUser.refresh_token);
            let response = await spotifyApi.refreshAccessToken();
            let accessToken = response.body.access_token;

            spotifyApi.setAccessToken(accessToken);

            let topTracks = await spotifyApi.getMyTopTracks({
               time_range: 'long_term',
                limit: 5
            });

            let filterTopTracks = topTracks.body.items.map((track) => {
                return ({
                    trackName: track.name,
                    albumName: track.album.name,
                    image: track.album.images[0].url,
                    artist: track.artists[0].name,
                })
            });

            let result = {
                httpStatus: httpStatus.OK,
                status: 'success',
                userName: theUser.name,
                spotifyData: filterTopTracks
            };
            return result;
        } catch (error) {
            console.debug('Error at getUserSpotify in spotifyService', error);
            return {httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status:'failed', errorDetails:'INTERNAL SERVER ERROR'}
        }
    }
};