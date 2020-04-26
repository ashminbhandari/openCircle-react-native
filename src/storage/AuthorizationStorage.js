import AsyncStorage from './AsyncStorage';

export default {
    async hasAuth(value) {
        try {
            await AsyncStorage.saveToAsyncStorage('hasAuth', value);
        } catch (error) {
            console.error('Error at AuthorizationStorage hasAuth saving data');
            throw error;
        }
    },

    async getHasAuth() {
        try {
            let authCode = await AsyncStorage.getFromAsyncStorage('hasAuth');
            return authCode;
        } catch(error) {
            console.error('Error at AuthorizationStorage hasAuth retreiving data...')
        }
    },

    async setAuthCode(value) {
        try {
            await AsyncStorage.saveToAsyncStorage('authCode', value);
        } catch (error) {
            console.error('Error at AuthorizationStorage hasAuth saving data');
            throw error;
        }
    },

    async getAuthCode() {
        try {
            let authCode = await AsyncStorage.getFromAsyncStorage('authCode');
            return authCode;
        } catch(error) {
            console.error('Error at AuthorizationStorage hasAuth retreiving data...')
        }
    },
}