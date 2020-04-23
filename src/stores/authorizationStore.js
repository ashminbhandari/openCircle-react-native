import {observable, action} from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import * as AuthSession from "expo-auth-session";

//Get the user credentials from the server
const getCredentials = async () => {
    const res = await axios.get('http://10.0.0.226:3000/spotify/credentials');
    const credentials = res.data;
    return credentials;
};

//The scope that we are going to be asking access for
const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read']; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
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
    } catch(err) {
        console.log(err);
        throw err;
    }
}

//Auth store
export class AuthorizationStore {
    @observable accessToken = null;

    @action getAccessToken = async () => {
            const authCode = await getAuthorizationCode();
            try {
                const response  = await axios.post('http://10.0.0.226:3000/spotify/token', {
                    code: authCode
                });
                this.accessToken = response.data.token;
                console.log("Access token received: " + this.accessToken);
            } catch (err) {
                console.log(err.response);
            }
    }
}


