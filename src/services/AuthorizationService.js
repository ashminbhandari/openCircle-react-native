import axios from "axios";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "../storage/AsyncStorage";

//The scope that we will be asking the user permission for
const scopesArr = ['user-read-email', 'user-read-currently-playing', 'user-follow-read',
    'app-remote-control', 'user-read-recently-played', 'streaming',
    'user-follow-modify', 'user-library-read', 'playlist-modify-public', 'user-top-read',
    'user-read-private', 'user-read-playback-position', 'ugc-image-upload'
]; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');

export default {

    //Get Spotify credentials from the server to initiate an auth session
    async getCredentials() {
        try {
            const res = await axios.get('https://intense-journey-83343.herokuapp.com/auth/credentials');
            const credentials = res.data;
            return credentials;
        } catch (error) {
            console.error("Error at getCredentials in AuthorizationService...", error);
            throw error;
        };
    },

    //AuthCode from session
    async getAuthorizationCode() {
        try {
            //Spotify credentials from the server
            const credentials = await this.getCredentials();

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
    },

    //Join server call, takes in the user email and password
    async joinServer(email, password) {
        try {
            let response = await axios.post('https://intense-journey-83343.herokuapp.com/auth/joinServer', {
                email: email,
                password: password
            });
            return response;
        } catch (error) {
            console.log("Error at joinServer in AuthorizationService..", error);
            throw error;
        }
    },

    //Get cookie from AsyncStorage
    async getCookie() {
        try {
            let cookie = await AsyncStorage.getFromAsyncStorage('cookie');
            return cookie;
        } catch (error) {
            return '';
        }
    },

    //Save cookie to AsyncStorage
    async saveCookie(cookie) {
        try {
            await AsyncStorage.saveToAsyncStorage('cookie', cookie);
        } catch (error) {
            console.log("Error saving cookie to AsyncStorage", error);
        }
    },

    //Checks if cookie is valid by making a request to the server
    async checkCookie(cookie) {
        //Make the axios call
        try {
            let response = await axios.request({
                url: 'http://10.0.0.226:3000/spotify/checkCookie',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            });
            return response;
        } catch(error) {
            throw error;
        }
    }
};





