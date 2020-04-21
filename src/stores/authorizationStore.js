import { observable, action } from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import * as AuthSession from "expo-auth-session";
import {encode as btoa} from "base-64";

//Get the user credentials from the server
const getCredentials = async () => {
    const res = await axios.get('http://192.168.1.138:3000/auth/spotifyCredentials');
    const Credentials = res.data;
    return Credentials;
};

//The scope that we are going to be asking access for
const scopesArr = ['user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-library-modify',
    'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'playlist-modify-public',
    'playlist-modify-private', 'user-read-recently-played', 'user-top-read']; //This is the scope of accessing that we will be asking for from the user
const scopes = scopesArr.join(' ');

//Gets the authorization code from Spotify (required for access tokens)
const getAuthorizationCode = async () => {
    try {
        const credentials = await getCredentials();
        const redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                credentials.clientId +
                (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
                '&redirect_uri=' +
                encodeURIComponent(redirectUrl),
        })
        return result.params.code;
    } catch (err) {
        console.error(err)
    }
};

//Auth store
export class AuthorizationStore {
    @observable isLogged = false;
    @observable accessToken = null;
    @observable refreshToken = null;
    @observable expirationTime = null;

    @action getAccessToken = async () => {
        try {
            const authorizationCode = await getAuthorizationCode();
            const credentials = await getCredentials();
            const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
            let requestBody = `grant_type=refresh_token&refresh_token=${refreshToken}`;
            if (!this.expirationTime || new Date().getTime() > this.expirationTime) {
                requestBody = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}` //refresh if token expired
            }
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: requestBody,
            });
            const responseJson = await response.json();
            const {
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: expiresIn,
            } = responseJson;
            const expirationTime = new Date().getTime() + expiresIn * 1000;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.expirationTime = expirationTime;
            console.log("The access token: ", accessToken);
            console.log("The refresh token ", refreshToken);
            console.log("The expiration time ", expirationTime);
        } catch (err) {
            console.error(err);
        }
    }
}


