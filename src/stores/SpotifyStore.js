import {observable, action, autorun} from 'mobx';
import axios from 'axios';
import Toast from 'react-native-root-toast';
import SpotifyService from "../services/SpotifyService";

/**/
/*

 SpotifyStore

 NAME

   SpotifyStore - MobX store relating to all the Spotify related stuff

 DESCRIPTION

    This class corresponds to a MobX store that deals with all the Spotify
    related stuff for the application

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
export class SpotifyStore {

    //List of online users
    @observable onlineUsers = [];

    //Flag set when the user has downloaded users
    @observable hasDownloadedUsers = false;

    //The Spotify data for the user whose marker is clicked
    @observable currentUserSpotifyData = null;

    //Owner of the current data being shown
    @observable dataOwner = null;

    /**/
    /*

     gatherOnlineUsers

     NAME

       gatherOnlineUsers - A MobX action that gathers all the online users from the server

     SYNOPSIS

        async gatherOnlineUsers(LocationStore, AuthorizationStore)
            LocationStore -> The MobX location store
            AuthorizationStore -> The MobX authorization store

     DESCRIPTION

        MobX action that sends a GET request to the server to gather all the users that are online

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     getUserSpotify

     NAME

       getUserSpotify - A MobX action that gets a specific user's Spotify information

     SYNOPSIS

        async getUserSpotify(user)
            user -> The user for whom the data is being requested

     DESCRIPTION

        MobX action that gets a user's Spotify information by sending an HTTP request

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

