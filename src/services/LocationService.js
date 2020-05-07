import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import randomGen from "../utils/randomGen";

export default {
    async getLocationPermission() {
        try {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                return true;
            }
        } catch (error) {
            console.log("Error getting locationPermission ", error);
            throw error;
        }
    },

    async getUserLocation() {
        try {
            //If there is a permission then get the user location and set it in state
            let location = await Location.getCurrentPositionAsync();
            return location;
        } catch (error) {
            console.log("Error getting user location at getUserLocation in LocationService", error);
            throw error;
        }
    },

    async getRandomLocation() {
        let longitude = randomGen(-180, 180, 3);
        let latitude = randomGen(-90, 90, 3);
        return {
            coords: {
                latitude: latitude,
                longitude: longitude
            }
        }
    }


}