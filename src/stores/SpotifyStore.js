import {observable, action, autorun} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import SpotifyService from "../services/SpotifyService";

//Spotify store
export class SpotifyStore {
    @observable onlineUsers = [];

    @observable hasDownloadedUsers = false;

    @observable currentUserSpotifyData = null;

    @observable dataOwner = null;

    @action.bound
    async gatherOnlineUsers(LocationStore, AuthorizationStore) {
        if (LocationStore.userLocation) {
            try {
                let response = await axios.get('http://10.0.0.226:3000/spotify/gatherOnlineUsers');
                this.onlineUsers = response.data.data;

                //Filter online users
                this.onlineUsers = this.onlineUsers.filter((user) => {
                    if (user.id === AuthorizationStore.user.id || !user.latitude || !user.longitude) {
                        return false;
                    } else {
                        return true;
                    }
                });

                this.hasDownloadedUsers = true;

                //Show an error Toast
                Toast.show('Downloaded ' + this.onlineUsers.length + ' users', {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.TOP,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    containerStyle: {
                        borderWidth: 1,
                        borderColor: 'green',
                        marginTop: 20
                    }
                });
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
        } else {
            //Show an error Toast
            Toast.show('Please broadcast yourself before downloading online users', {
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

    @action.bound async getUserSpotify(user) {
        try {
            let response = await SpotifyService.getUserSpotify(user);
            this.currentUserSpotifyData = response.spotifyData;
            this.dataOwner = response.userName;
        } catch (error) {
            console.debug('Error at spotifyStore at getUserSpotify',error);
        }
    }
}

