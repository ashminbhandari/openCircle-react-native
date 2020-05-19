//Send your location, get all online users and their location
import axios from "axios";

export default {
    async getUserSpotify(user) {
        try {
            let response = await axios.post('https://intense-journey-83343.herokuapp.com/spotify/getUserSpotify', {
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