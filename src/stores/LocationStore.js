import {observable, action, autorun} from 'mobx';
import LocationService from "../services/LocationService";
import Toast from 'react-native-root-toast';
import axios from 'axios';

export class LocationStore {
    @observable userLocation = '';
    @observable sessionLocation = '';

    @action.bound async setupLocation() {
        try {
            //Get location permission first
            await LocationService.getLocationPermission();

            //If location permission is granted, gather the location
            let location = await LocationService.getUserLocation();

            //Set the location for the front-end
            this.userLocation = location;

            //Set the location for current session (to be sent to the server)
            if(!this.sessionLocation) {
                this.sessionLocation = location;
            }
        } catch (error) {
            console.log("Location could not be established at LocationStore", error);

            //Show an error Toast
            Toast.show('Go to Settings > openCircle > Location and allow location access', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                containerStyle: {
                    borderWidth: 1,
                    borderColor: 'white',
                    marginTop: 20
                }
            });
        }
    }

    //Runs automatically when the location for the session is updated
    updateSessionLocation = autorun(async () => {
        if(this.sessionLocation) {
            await axios.post('https://intense-journey-83343.herokuapp.com/spotify/updateSessionLocation', {
                location: this.sessionLocation
            })
        }
    });
}