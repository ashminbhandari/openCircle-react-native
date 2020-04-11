import { encode as btoa } from 'base-64';
import AuthorizationCode from "./AuthorizationCode";
import Credentials from "./Credentials";
import { setData } from './AsyncStorage';

const Tokens = async () => {
    try {
        const authorizationCode = await AuthorizationCode();
        const credentials = await Credentials() //we wrote this function above (could also run this outside of the functions and store the credentials in local scope)
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri
            }`,
        });
        const responseJson = await response.json();

        // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson;

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await setData('accessToken', accessToken);
        await setData('refreshToken', refreshToken);
        await setData('expirationTime', expirationTime);
    } catch (err) {
        console.error(err);
    }
};

export default Tokens;