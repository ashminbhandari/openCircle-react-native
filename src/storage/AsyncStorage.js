//Get and save functions for AsyncStorage storage
import { AsyncStorage } from 'react-native';

export default {
    async saveToAsyncStorage(key,value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log("Error in AsyncStorage...", error);
            throw error;
        }
    },

    async getFromAsyncStorage(key) {
        try {
            let data = await AsyncStorage.getItem(key);
            let parsedData = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.log("Error in AsyncStorage...", error);
            throw error;
        }
    }
}