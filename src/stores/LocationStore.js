import {observable, action, autorun} from 'mobx';
import LocationService from "../services/LocationService";
import Toast from 'react-native-root-toast';
import axios from 'axios';

/**/
/*

 LocationStore

 NAME

    LocationStore - MobX store relating to all location related data

 DESCRIPTION

    This class corresponds to a MobX store that deals with all the location
    related stuff for the application

 AUTHOR

    Ashmin Bhandari

 DATE

    05/14/2020

 */
/**/
export class LocationStore {
    @observable userLocation = '';
    @observable sessionLocation = '';

    /**/
    /*

     setupLocation

     NAME

       setupLocation - A MobX action that sets up the user location

     SYNOPSIS

        async setupLocation()

     DESCRIPTION

        MobX action that sets up the user location by utilizing LocationService.
        Asks for location permission first and then sets the user location.
        Sets the userLocation and sessionLocation members of this class.

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
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

    /**/
    /*

     updateSessionLocation

     NAME

       updateSessionLocation - A MobX action that checks whether or not a cookie is valid

     SYNOPSIS

        async updateSessionLocation()

     DESCRIPTION

        A MobX autorun: when the session location member of this class changes then
        this function "autoruns" to send a post request to the server
        to set the location for this current session of the user.
        Only one location per session, no live updates.

     RETURNS

        Nothing

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    //Runs automatically when the location for the session is updated
    updateSessionLocation = autorun(async () => {
        if(this.sessionLocation) {
            await axios.post('http://10.0.0.226:3000/spotify/updateSessionLocation', {
                location: this.sessionLocation
            })
        }
    });
}