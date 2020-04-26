import {action, observable} from 'mobx';
import axios from "axios";
import authService from "../services/AuthorizationService";

//Spotify store
export class SpotifyStore {
    @observable onlineUsers = null;

    @action iAmOnline = async (id, location) => {
        const response  = await axios.post('http://10.0.0.226:3000/spotify/users', {
            id: id,
            location: location
        });
        console.log(response);
    }
}

