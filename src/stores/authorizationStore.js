import {observable, action} from 'mobx';
import AuthorizationService from "../services/AuthorizationService";

/**/
/*

 AuthorizationStore

 NAME

   AuthorizationStore - MobX store relating to authorization stuff

 DESCRIPTION

    This class corresponds to a MobX store that deals with all the authorization
    related stuff for the application

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
export class AuthorizationStore {
    @observable isAuthenticated = false; //If the user has toggled on the map i.e. they are online
    @observable user = null; //Current user of the app

    /**/
    /*

     checkCookie

     NAME

       checkCookie - A MobX action that checks whether or not a cookie is valid

     SYNOPSIS

        async checkCookie()

     DESCRIPTION

        MobX action that gets the cookie saved in AsyncStorage and sends that over to the
        AuthorizationService so that it can be sent over to the server to
        check whether or not the cookie is valid. This way we know
        if the user session is still valid or not.

        It sets the isAuthenticated and user members of this class as a result

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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
            console.log(error);
        }
    }

}

