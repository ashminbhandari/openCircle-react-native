import {observable, action} from 'mobx';
import AuthorizationService from "../services/AuthorizationService";
import Toast from "react-native-root-toast";

export class AuthorizationStore {
    @observable isAuthenticated = false; //If the user has toggled on the map i.e. they are online
    @observable user = null; //Current user of the app
    @observable authorizedUser = null;
    @observable codeSent = null;
    @observable codeVerified = null;
    @observable passwordResetFlag = null;

    @action.bound async checkCookie() {
        try {
            let cookie = await AuthorizationService.getCookie();

            //checkCookie returns the user ID
            let response = await AuthorizationService.checkCookie(cookie);

            //Set the active user
            this.user = {
                id: response.data
            };

            //If we reach here means, the cookie is valid
            this.isAuthenticated  = true;

        } catch (error) {
            console.log("Cookie not valid. User has to log in.");
        }
    }

    @action.bound async logout() {
        try {
            let res = await AuthorizationService.logout();
            if(res.status == 200) {
                this.isAuthenticated = false;
            }
            else {
                throw new Error(res.data);
            }
        } catch (error) {
            console.debug(error);
            //Show an error Toast
            Toast.show('Dingnibit, the tracks you selected could not be saved to your Spotify for some reason.', {
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                containerStyle: {
                    borderWidth: 1,
                    borderColor: 'red',
                    marginTop: 20
                }
            });
        }
    }

    @action.bound async sendPasswordResetCode(email) {
        try {
            let response = await AuthorizationService.sendPasswordResetCode(email);
            if(response.status == 200) {
                this.codeSent = true;
            }
        } catch (error) {
            throw error;
        }
    }

    @action.bound async createNewPassword(email, password) {
        try {
            let response = await AuthorizationService.createNewPassword(email, password);
            if(response.status == 200) {
                this.passwordResetFlag = true;
            }
        } catch (error) {
            throw error;
        }
    }

    @action.bound async checkCode(email, code) {
        try {
            let response = await AuthorizationService.checkCode(email, code);
            if(response.status == 200) {
                this.codeVerified = true;
            }
        } catch (error) {
            throw error;
        }
    }
}

