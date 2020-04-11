import Credentials from './Credentials';
import { setData } from './AsyncStorage';
import { getData } from './AsyncStorage';
import { encode as btoa } from 'base-64';
import Tokens from './Tokens';

export const RefreshTokens = async () => {
    try {
        const credentials = await Credentials();
        const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
        const refreshToken = await getData('refreshToken');
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });
        const responseJson = await response.json();
        if (responseJson.error) {
            await Tokens();
        } else {
            const {
                access_token: newAccessToken,
                refresh_token: newRefreshToken,
                expires_in: expiresIn,
            } = responseJson;

            const expirationTime = new Date().getTime() + expiresIn * 1000;
            await setData('accessToken', newAccessToken);
            if (newRefreshToken) {
                await setData('refreshToken', newRefreshToken);
            }
            await setData('expirationTime', expirationTime);
        }
    } catch (err) {
        console.error(err)
    }
}