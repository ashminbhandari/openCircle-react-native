import {observable, action} from 'mobx';
import AuthorizationService from "../services/AuthorizationService";

export class AuthorizationStore {
    @observable isAuthenticated = false; //If the user has toggled on the map i.e. they are online
    @observable user = null; //Current user of the app

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

}

