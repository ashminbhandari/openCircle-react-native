//Send your location, get all online users and their location
import axios from "axios";

export default {
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