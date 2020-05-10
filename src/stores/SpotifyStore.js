import {observable, action} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';

//Spotify store
export class SpotifyStore {
    @observable onlineUsers = [];

    @action.bound async gatherOnlineUsers() {
        try {
            let response = await axios.get('http://10.0.0.226:3000/spotify/gatherOnlineUsers');
            this.onlineUsers = response.data.data;

            console.log(response.data.data);
        } catch (error) {
            console.log("Error gathering users at SpotifyStore", error);

            //Show an error Toast
            Toast.show('Sorry, online users could not be downloaded right now...', {
                duration: Toast.durations.LONG,
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
}

