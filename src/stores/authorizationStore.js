import {observable, action, autorun} from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import AsyncStorage from '../storage/AsyncStorage';
import authService from '../services/authService';
import httpStatus from 'http-status-codes';

//Auth store
export class AuthorizationStore {
    @observable token = null; //If user has token then they can communicate with our server
    @observable isToggled = false; //If the user has toggled on the map i.e. they are online
    @action getAccessToken = async () => {
        try {
            const response  = await axios.post('http://10.0.0.226:3000/auth/token', {
                code: await authService.getAuthorizationCode()
            });
            if(response.data.httpStatus === httpStatus.OK) {
                this.token = response.data.userID;
                console.log("Server successfully saved token. Token: ", this.token);
            }
        } catch (err) {
            console.log("Server could not send token. Status: ",
                err.response.data.httpStatus);
        }
    };

    //Persist store to AsyncStorage, we will refer to that later instead
    persistStore = autorun(async ()=>{
        await AsyncStorage.saveToAsyncStorage('token', this.token);
    });
}

