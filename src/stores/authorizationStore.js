import {observable, action, autorun} from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import AuthStorage from '../storage/AuthorizationStorage';
import authService from '../services/authService';
import httpStatus from 'http-status-codes';


//Auth store
export class AuthorizationStore {
    authCode = null;
    token = null; //If user has token then they can communicate with our server
    password = null;
    @observable isToggled = false; //If the user has toggled on the map i.e. they are online
    @observable hasAuth = 'false';

    @action getAuthCode = async () => {
        try {
            this.authCode = await authService.getAuthorizationCode();

            //Log
            console.log('Received AuthCode: ', this.authCode);

            if(this.authCode !== null) {
                this.hasAuth = 'true';
            }
        } catch(error) {
            console.error("Error in getAuthCode action in AuthorizationStore.js", error);
            this.hasAuth = 'false';
            throw error;
        }
    };

    getAccessToken = async () => {
        try {
            const response  = await axios.post('http://10.0.0.226:3000/auth/token', {
                code: await authService.getAuthorizationCode()
            });
            if(response.data.httpStatus === httpStatus.OK) {
                this.token = response.data.userID;
                console.log("Server successfully saved token. Token: ", this.token);
            }
        } catch (err) {
            console.log("Server could not send token. Status: ",
                err.response.data.httpStatus);
        }
    };

    persistToAsync = autorun(() => {
        AuthStorage.hasAuth(this.hasAuth);
        AuthStorage.setAuthCode(this.authCode);
    })

}

