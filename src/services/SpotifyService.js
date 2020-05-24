//Send your location, get all online users and their location
import axios from "axios";
import env from '../../env'

export default {
    async getUserSpotifyData(user) {
        try {
            let response = await axios.post(env.API_URL + '/spotify/getUserSpotifyData', {
                user: user
            });

            let returnObj = {
                userName: response.data.userName,
                topTracks: response.data.topTracks,
                topArtists: response.data.topArtists,
                recentlyPlayed: response.data.recentlyPlayed
            };

            //Return the gathered Spotify data
            return returnObj;
        } catch(error) {
            console.debug('Error at getSpotifyUser at SpotifyService', error);
        }
    }
}