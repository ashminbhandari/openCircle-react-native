import {observable, action, autorun} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import SpotifyService from "../services/SpotifyService";
import env from '../../env';
/**/
export class SpotifyStore {
    //List of online users
    @observable onlineUsers = [];

    //Flag set when the user has downloaded users
    @observable hasDownloadedUsers = false;

    //Owner of the current data being shown
    @observable spotifyOF = null;

    @observable topTracks = null;

    @observable topArtists = null;

    @observable recentlyPlayed = null;

    @observable saveTracks = null;

    @action.bound
    async gatherOnlineUsers(LocationStore, AuthorizationStore) {
        if (LocationStore.userLocation) {
            try {
                let response = await axios.get(env.API_URL + '/spotify/gatherOnlineUsers');
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

                //Show a success toast
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

    @action.bound async getUserSpotifyData(user) {
        try {
            let response = await SpotifyService.getUserSpotifyData(user);
            this.topTracks = response.topTracks;
            this.recentlyPlayed = response.recentlyPlayed;
            this.topArtists = response.topArtists;
            this.spotifyOF = response.userName;
            this.currentlyPlaying = response.currentlyPlaying;
            this.savedTracks = response.savedTracks;
        } catch (error) {
            //Show an error Toast
            Toast.show('User data could not be collected right now. Please try again later.', {
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                containerStyle: {
                    borderWidth: 1,
                    borderColor: 'red',
                    marginTop: 20
                }
            });
            throw error;
        }
    }

    @action.bound clearCurrentUserData () {
        this.recentlyPlayed = null;
        this.spotifyOF = null;
        this.topArtists = null;
        this.topTracks = null;
        this.currentlyPlaying = null;
    }
}

