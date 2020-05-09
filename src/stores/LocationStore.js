import {observable, action} from 'mobx';
import LocationService from "../services/LocationService";
import Toast from 'react-native-root-toast';

export class LocationStore {
    @observable userLocation = '';

    @action.bound async setupLocation() {
        try {
            //Get location permission first
            await LocationService.getLocationPermission();

            //If location permission is granted, gather the location
            let location = await LocationService.getUserLocation();

            this.userLocation = location;
        } catch (error) {
            console.log("Location could not be established at LocationStore", error);
            Toast.show('Go to Settings > openCircle > Location and allow location access', {
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                containerStyle: {
                    borderWidth: 1,
                    borderColor: 'white',
                    marginTop: 5
                }
            });
        }
    }


}