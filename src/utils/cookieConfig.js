//Cookie config header to attach to each API request
import AsyncStorage from "../storage/AsyncStorage";

//Gets the cookie from AsyncStorage, if nothing is present just adds an empty object
export default {
    async getCookieHeader() {
        try {
            let cookie = await AsyncStorage.getFromAsyncStorage('cookie');
            let config = {
                    Cookie: cookie
            };
            return config;
        } catch (error) {
            return {};
        }
    },

    async saveCookie(cookie) {
        try {
            await AsyncStorage.saveToAsyncStorage('cookie', cookie);
        } catch (error) {
            console.log("Error saving cookie to AsyncStorage", error);
        }
    }
}