import { AsyncStorage } from 'react-native';

//Saves key, value pair to AsyncStorage
export async function setData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log("Something went wrong saving data in AsyncStorage: ", error);
    }
}

export async function getData(key) {
    try {
        let userData = await AsyncStorage.getItem(key);
        return JSON.parse(userData);
    } catch (error) {
        console.log("Something went wrong retrieving data from AsyncStorage: ", error);
    }
}
