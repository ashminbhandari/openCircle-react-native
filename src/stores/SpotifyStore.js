import {observable, action} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import SpotifyService from "../services/SpotifyService";
import env from '../../env';
import AsyncStorage from "../storage/AsyncStorage";

/**/
export class SpotifyStore {
    //List of online users
    @observable onlineUsers = [];

    //Flag set when the user has downloaded users
    @observable hasDownloadedUsers = false;

    //Owner of the current data being shown
    spotifyOF = null;

    topTracks = null;

    topArtists = null;

    recentlyPlayed = null;

    savedTracks = null;

    @observable playbackState = false;

    @observable tracksToSave = [];

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
                Toast.show('Fooosh, online users could not be downloaded right now...', {
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
            Toast.show('Hoopaa, please broadcast yourself before downloading online users', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                containerStyle: {
                    borderWidth: 1,
                    borderColor: 'yellow',
                    marginTop: 20
                }
            });
        }
    }

    @action.bound
    async getUserSpotifyData(user) {
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
            Toast.show('Dingnibit, user data could not be collected right now. Please try again later.', {
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

    @action.bound clearCurrentUserData() {
        this.recentlyPlayed = null;
        this.spotifyOF = null;
        this.topArtists = null;
        this.topTracks = null;
        this.currentlyPlaying = null;
    }

    @action.bound
    async saveTrackForUser(user) {
        try {
            if(this.tracksToSave.length) {
                await axios.post(env.API_URL + '/spotify/saveTracks', {
                    user: user,
                    tracks: this.tracksToSave
                });
            }
        } catch (error) {
            console.debug("Error occured at saveTrack in SpotifyStore", error);
            //Show an error Toast
            Toast.show('Dingnibit, the tracks you selected could not be saved to your Spotify for some reason.', {
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
        }
    }

    @action.bound async addToTracksToSaveList(id) {
        this.tracksToSave.push(id);
    }
}

