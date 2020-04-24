import {observable, action, autorun} from 'mobx';
import axios from 'axios'; //For server calls (credentials)
import AsyncStorage from '../storage/AsyncStorage';
import authService from '../services/authService';
import httpStatus from 'http-status-codes';

//Auth store
export class AuthorizationStore {
    @observable hasToken = null; //If user has token then they can communicate with our server

    @action getAccessToken = async () => {
        try {
            const response  = await axios.post('http://10.0.0.226:3000/auth/token', {
                code: await authService.getAuthorizationCode()
            });
            if(response.data.httpStatus === httpStatus.OK) {
                this.hasToken = true;
            }
        } catch (err) {
            console.log(err.response);
        }
    };
    
    //Persist store to AsyncStorage, we will refer to that later instead
    persistStore = autorun(async ()=>{
        await AsyncStorage.saveToAsyncStorage('token', this.token);
    });
}

