//Send your location, get all online users and their location
import axios from "axios";

export default {

    /**/
    /*

     gatherOnlineUsers

     NAME

       gatherOnlineUsers - Gathers all the online users

     SYNOPSIS

        async gatherOnlineUsers(location)

            location -> The location of the user

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
    async gatherOnlineUsers(myLocation) {
        try {
            let response = await axios.post('http://10.0.0.226:3000/spotify/users', {
                location: myLocation
            });
            return response.data.data;
        } catch (error) {
            console.log('At gatherOnlineUsers in SpotifyService');
            throw error;
        }
    },

    /**/
    /*

     getUserSpotify

     NAME

       getCredentials - Gets a user's Spotify data

     SYNOPSIS

        async getUserSpotify(user)

            user-> The userID for which to get the Spotify data for

     DESCRIPTION

        Gets the Spotify data for the user by sending an appropriate HTTP request to the server

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
            let response = await axios.post('http://10.0.0.226:3000/spotify/getUserSpotify', {
                user: user
            });

            let returnObj = {
                userName: response.data.userName,
                spotifyData: response.data.spotifyData
            };

            //Return the gathered Spotify data
            return returnObj;
        } catch(error) {
            console.debug('Error at getSpotifyUser at SpotifyService', error);
        }
    }
}