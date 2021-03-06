import {observable, action, autorun} from 'mobx';
import LocationService from "../services/LocationService";
import Toast from 'react-native-root-toast';
import axios from 'axios';
import env from '../../env';
import {getRandomInRange} from "../utils/randomizer";

export class LocationStore {
    @observable userLocation = '';
    @observable sessionLocation = '';

    @action.bound
    async setupLocation() {
        try {
            //Randomly generate location
            let latitude = getRandomInRange(-90, 90, 3);
            let longitude = getRandomInRange(-180, 180, 3);
            let location = {
                coords: {
                    latitude,
                    longitude
                }
            }

            //Set the location for the front-end
            this.userLocation = location;

            //Set the location for current session (to be sent to the server)
            if (!this.sessionLocation) {
                this.sessionLocation = location;
            }
        } catch (error) {
            console.log("Location could not be randomly created at LocationStore", error);

            //Show an error Toast
            Toast.show('Poopypoo, could not create location randomly', {
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
        if (this.sessionLocation) {
            await axios.post(env.API_URL + '/spotify/updateSessionLocation', {
                location: this.sessionLocation
            })
        }
    });
}