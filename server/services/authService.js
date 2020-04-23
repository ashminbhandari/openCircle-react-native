const fetch = require('node-fetch');
const btoa = require('base-64');

module.exports = {
    //Given an authorization code, gets an access token
    async getAccessToken(authorizationCode) {
        try {
            const credsB64 = btoa.encode(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
            let requestBody = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}` //refresh if token expired
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${credsB64}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: requestBody,
            });

            const responseJson = await response.json();
            if (responseJson.error != undefined) {
                const message = 'Error during authorization code validation';
                console.log(message);
                throw new Error(message);
            }

            return {
                accessToken: responseJson.access_token,
                refreshToken: responseJson.refresh_token,
                expirationTime: new Date().getTime() + responseJson.expires_in * 1000
            }
        } catch (err) {
            throw err;
        }
    }
}

