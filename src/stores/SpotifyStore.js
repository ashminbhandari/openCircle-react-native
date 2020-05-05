import axios from 'axios';
import {observable} from 'mobx';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import randomGen from "../utils/randomGen";

//Spotify store
export class SpotifyStore {
    @observable onlineUsers = [];

    userLocation = null;

    locationPermission = null;

    //Send your location, get all online users and their location
    async gatherOnlineUsers(myLocation) {
        let response;
        try {
            response = await axios.post('http://10.0.0.226:3000/spotify/users', {
                location: myLocation
            });
            this.onlineUsers = response.data.data;
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
            response = 'failed';
            return response;
        }
    }

    async getLocationPermission () {
        if (!this.locationPermission) {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                this.locationPermission = true;
            } else {
                let longitude = randomGen(-180, 180, 3);
                let latitude = randomGen(-90, 90, 3);
                let location = {
                    coords: {
                        latitude: latitude,
                        longitude: longitude
                    }
                };
                this.userLocation = location;
            }
        }
    }

    async getUserLocation() {
        //If there is a permission then get the user location and set it in state
            let location = await Location.getCurrentPositionAsync();
            this.userLocation = location;
    }

}

