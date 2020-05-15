import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

export default {

    /**/
    /*

     getLocationPermission

     NAME

       getLocationPermission - Asks user for location permission

     SYNOPSIS

        async getLocationPermission()

     DESCRIPTION

        Asks the user for location permission with the help of the
        expo-permissions package

     RETURNS

        True if success or throws an error if error

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    async getLocationPermission() {
        try {
            let {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                return true;
            }
            else {
                throw new Error('Location access not granted.');
            }
        } catch (error) {
            console.log("Error getting locationPermission ", error);
            throw error;
        }
    },

    /**/
    /*

     getUserLocation

     NAME

       getUserLocation - Gets the user's current location

     SYNOPSIS

        async getUserLocation()

     DESCRIPTION

        Gets the user's current location with the help of the
        'expo-location' package

     RETURNS

        User location JS object if success and error if not

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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
}