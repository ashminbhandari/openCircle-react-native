const fetch = require('node-fetch');
const btoa = require('base-64');
const Users = require('../database/models/users');
const httpStatus = require('http-status-codes');
const spotifyApi = require('../spotifyAPI/api');
const encryption = require('../authentication/encryption');

module.exports = {
    //Creates a new user
    async createUser(code, password) {
        let result;
        try {
            //Get the token information
            tokenInfo = await this.getAccessToken(code);

            //Setting spotify API with token
            spotifyApi.setAccessToken(tokenInfo.access_token);

            //Get user information based on access token
            userInfo = await spotifyApi.getMe();

            //Coagulate the user information required
            let user = new Users({
                id: userInfo.body.id,
                name: userInfo.body.display_name,
                email: userInfo.body.email,
                password: encryption.createPasswordHash(password),
                access_token: tokenInfo.access_token,
                refresh_token: tokenInfo.refresh_token,
                expiration_time: tokenInfo.expiration_time,
            });

            user = await user.save();

            if (!user) {
                result = {httpStatus: httpStatus.BAD_REQUEST, status: 'failed', errorDetails: 'Bad request..'};
                return result;
            }

            //Arrived here means we successfully created a new user
            console.log('A new user has been created...');

            //Send back Spotify ID
            result = {
                httpStatus: httpStatus.OK, status: 'success', user: {
                    name: user.name, id: user.id,
                }
            };
            return result;
        } catch (error) {
            console.log("Error creating user...", error);
            return {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: 'The request is invalid...'};
        }
    },

    //Given an authorization code, gets an access token
    async getAccessToken(authorizationCode) {
        console.log('here');
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

            //Convert to JSON
            const responseJson = await response.json();

            console.log("The token info received is..", responseJson);

            //If error
            if (responseJson.error != undefined) {
                const message = 'Error during authorization code validation';
                console.error(message);
                throw new Error(message);
            }

            return {
                access_token: responseJson.access_token,
                refresh_token: responseJson.refresh_token,
                expiration_time: new Date().getTime() + responseJson.expires_in * 1000
            }
        } catch (err) {
            console.error("Error while getting token in getAccessToken in authService");
            throw err;
        }
    },
}

