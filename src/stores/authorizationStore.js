import {observable, action} from 'mobx';
import AuthorizationService from "../services/AuthorizationService";

//Auth store
export class AuthorizationStore {
    @observable isAuthenticated = false; //If the user has toggled on the map i.e. they are online

    @action async checkCookie() {
        try {
            let cookie = await AuthorizationService.getCookie();
            await AuthorizationService.checkCookie(cookie);

            //If we reach here means, the cookie is valid
            this.isAuthenticated  = true;

        } catch (error) {
            console.log(error);
        }
    }

}

