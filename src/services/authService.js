import axios from "axios";
import * as AuthSession from "expo-auth-session";

//The scope that we will be asking the user permission for
const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read']; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');


export default {

    //Get Spotify credentials from the server to initiate an auth session
    async getCredentials() {
        const res = await axios.get('http://10.0.0.226:3000/auth/credentials');
        const credentials = res.data;
        return credentials;
    },

    //AuthCode from session
    async getAuthorizationCode() {
        try {
            //Spotify credentials from the server
            const credentials = await getCredentials();

            //Session redirect URL
            const redirectUrl = AuthSession.getRedirectUrl();

            //Auth session
            const sessionResult = await AuthSession.startAsync({
                authUrl:
                    'https://accounts.spotify.com/authorize' +
                    '?response_type=code' +
                    '&client_id=' +
                    credentials.clientId +
                    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                    '&redirect_uri=' +
                    encodeURIComponent(redirectUrl),
            });

            //Send back authorization code
            return sessionResult.params.code;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}





