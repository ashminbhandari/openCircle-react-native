//Send your location, get all online users and their location
import axios from "axios";

export default {
    async gatherOnlineUsers(myLocation) {
        let response;
        try {
            response = await axios.post('http://10.0.0.226:3000/spotify/users', {
                location: myLocation
            });
            return response.data.data;
        } catch (error) {
            console.log('At gatherOnlineUsers in SpotifyService');
            throw error;
        }
    }
}