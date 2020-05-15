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

    /**/
    /*

     getCredentials

     NAME

       getCredentials - Gets the Spotify client credentials

     SYNOPSIS

        async getCredentials()

     DESCRIPTION

        Gets the Spotify client credentials by sending an appropriate HTTP request to the server

     RETURNS

        Javascript object containing Spotify credentials

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Get Spotify credentials from the server to initiate an auth session
    async getCredentials() {
        try {
            const res = await axios.get('http://10.0.0.226:3000/auth/credentials');
            const credentials = res.data;
            return credentials;
        } catch (error) {
            console.error("Error at getCredentials in AuthorizationService...", error);
            throw error;
        };
    },

    /**/
    /*

     getAuthorizationCode

     NAME

       getAuthorizationCode - Gets the user's Spotify authorization code

     SYNOPSIS

        async getAuthorizationCode()

     DESCRIPTION

        Gets the user's Spotify authorization code by initiating a expo auth-session

     RETURNS

        Authorization code as a string

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     joinServer

     NAME

       joinServer - Lets the user join the server

     SYNOPSIS

        async joinServer()

     DESCRIPTION

        Sends a post request along with a user's email and password to the server to
        authenticate them into the application

     RETURNS

        HTTP response object relating to the request sent

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Join server call, takes in the user email and password
    async joinServer(email, password) {
        try {
            let response = await axios.post('http://10.0.0.226:3000/auth/joinServer', {
                email: email,
                password: password
            });
            return response;
        } catch (error) {
            console.log("Error at joinServer in AuthorizationService..", error);
            throw error;
        }
    },

    /**/
    /*

     getCookie

     NAME

       getCookie - Gets the cookie from AsyncStorage

     SYNOPSIS

        async getCookie()

     DESCRIPTION

        Gets the cookie which is stored in the in-phone persistent AsyncStorage

     RETURNS

        The cookie string

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Get cookie from AsyncStorage
    async getCookie() {
        try {
            let cookie = await AsyncStorage.getFromAsyncStorage('cookie');
            return cookie;
        } catch (error) {
            return '';
        }
    },

    /**/
    /*

     saveCookie

     NAME

       saveCookie - Saves a cookie to AsyncStorage

     SYNOPSIS

        async saveCookie(cookie)
            cookie -> The cookie to be saved (string)

     DESCRIPTION

        Saves the cookie passed in to the persistent AsyncStorage

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Save cookie to AsyncStorage
    async saveCookie(cookie) {
        try {
            await AsyncStorage.saveToAsyncStorage('cookie', cookie);
        } catch (error) {
            console.log("Error saving cookie to AsyncStorage", error);
        }
    },

    /**/
    /*

     checkCookie

     NAME

       checkCookie - Checks cookie against server

     SYNOPSIS

        async checkCookie(cookie)
            cookie -> The cookie to be checked

     DESCRIPTION

        Sends the cookie to be checked over to the checkCookie endpoint on
        the openCircle server

     RETURNS

        Javascript response object or throws an error object if one

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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





