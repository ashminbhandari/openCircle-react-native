import {observable, autorun} from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import AuthorizationStore from './AuthorizationStore';

//Spotify store
export class SpotifyStore {
    @observable isToggled = false; //If the user has toggled on the map i.e. they are online

    //Let server know that user toggled the app
    userHasToggled = autorun(async () => {
        try {
            const response = await axios.post('http://10.0.0.226:3000/spotify/', {
                id: AuthorizationStore.token
            });
        } catch (error) {

        }
    });
}

