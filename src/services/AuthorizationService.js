import axios from "axios";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "../storage/AsyncStorage";
import env from '../../env';
import {action} from "mobx";



export default {
    //Get Spotify credentials from the server to initiate an auth session
    async getCredentials() {
        try {
            const res = await axios.get(env.API_URL + '/auth/credentials');
            const credentials = res.data;
            return credentials;
        } catch (error) {
            console.log("Error at getCredentials in AuthorizationService...", error);
            throw error;
        }
    },

    //AuthCode from session
    async getAuthorizationCode() {
        try {
            //Spotify credentials from the server
            const credentials = await this.getCredentials();

            //Session redirect URL
            const redirectUrl = credentials.redirectUri

            //Auth session
            const sessionResult = await AuthSession.startAsync({
                authUrl:
                    'https://accounts.spotify.com/authorize' +
                    '?response_type=code' +
                    '&client_id=' +
                    credentials.clientId +
                    (credentials.scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
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
            let response = await axios.post(env.API_URL + '/auth/joinServer', {
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
                url: env.API_URL + '/spotify/checkCookie',
                method: 'get',
                headers: {
                    Authorization: `Bearer ${cookie}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    //Log out
    async logout() {
        try {
            let response = await axios.get(env.API_URL + '/auth/logout');
            return response;
        } catch (error) {
            console.debug("At authorization service failed to logout", error);
        }
    },

    //Send password reset code
    async sendPasswordResetCode(email) {
        try {
            let response = await axios.post(env.API_URL + '/auth/generateToken', {
                email: email
            });
            return response;
        } catch (error) {
            throw error;
        }
    },

    async createNewPassword(email, password) {
        try {
            let response = await axios.post(env.API_URL + '/auth/newPassword', {
                email: email,
                password: password,
            });
            return response;
        } catch (error) {
            console.log('At createNewPassword in authService', error);
        }
    },

    @action.bound async checkCode(email, code) {
        try {
            let response = await axios.post(env.API_URL + '/auth/checkCode', {
                email: email,
                code: code
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
};





