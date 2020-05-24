//Send your location, get all online users and their location
import axios from "axios";
import env from '../../env'

export default {
    async getTopTracks(user) {
        try {
            let response = await axios.post(env.API_URL + '/spotify/getTopTracks', {
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