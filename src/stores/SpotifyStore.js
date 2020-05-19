import {observable, action, autorun} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import SpotifyService from "../services/SpotifyService";

/**/
export class SpotifyStore {

    //List of online users
    @observable onlineUsers = [];

    //Flag set when the user has downloaded users
    @observable hasDownloadedUsers = false;

    //The Spotify data for the user whose marker is clicked
    @observable selectedMarkerSpotifyData = null;

    //Owner of the current data being shown
    @observable selectedMarkerOwner = null;

    @action.bound
    async gatherOnlineUsers(LocationStore, AuthorizationStore) {
        if (LocationStore.userLocation) {
            try {
                let response = await axios.get('https://intense-journey-83343.herokuapp.com/spotify/gatherOnlineUsers');
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
            this.selectedMarkerSpotifyData = response.spotifyData;
            this.selectedMarkerOwner = response.userName;
        } catch (error) {
            console.debug('Error at spotifyStore at getUserSpotify',error);
        }
    }
}

