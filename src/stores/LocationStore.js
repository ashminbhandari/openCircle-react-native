import {observable, autorun} from 'mobx';
import LocationService from "../services/LocationService";

export class LocationStore {
    @observable locationPermission = null;
    @observable userLocation = {coords: {
            latitude: -34.000,
            longitude: 34.000
        }};

    getLocation = autorun(async () => {
        try {
            console.log('location perm ', this.locationPermission);
            if (this.locationPermission) {
                this.userLocation = await LocationService.getUserLocation();
                console.log(this.userLocation);
            }
        } catch (error) {
            console.log("ERROR at getLocation in LocationService");
        }
    });


}