import {observable} from 'mobx';

//Auth store
export class AuthorizationStore {
    @observable isAuthenticated = false; //If the user has toggled on the map i.e. they are online
}

