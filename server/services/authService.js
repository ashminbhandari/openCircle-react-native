const fetch = require('node-fetch');
const btoa = require('base-64');
const Users = require('../database/models/users');
const httpStatus = require('http-status-codes');
const encryption = require('../utils/encryption.js');

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

            //Convert to JSON
            const responseJson = await response.json();

            //If error
            if (responseJson.error != undefined) {
                const message = 'Error during authorization code validation';
                console.log(message);
                throw new Error(message);
            }

            //Encrypt the token information
            //Encryption results have format {iv: '', encryptedData:''}
            let encAccessToken = encryption.encrypt(responseJson.access_token);
            let encRefreshToken = encryption.encrypt(responseJson.refresh_token);

            return {
                encAccessToken: encAccessToken.encryptedData,
                ivAccessToken: encAccessToken.iv,
                encRefreshToken: encRefreshToken.encryptedData,
                ivRefreshToken: encRefreshToken.iv,
                expirationTime: new Date().getTime() + responseJson.expires_in * 1000
            }
        } catch (err) {
            throw err;
        }
    },

    async upsertAuthData(authorizationCode) {
        let result = {};
        try {
            //gets token information
            let tokenInfo = await this.getAccessToken(authorizationCode);

            //result
            let result;

            //upsert database
            let upsertedData = await Users.findOneAndUpdate(
                {encAccessToken: tokenInfo.encAccessToken}
                , tokenInfo
                , {upsert: true, new: true},
                function (err, doc) {
                    result = {httpStatus: httpStatus.OK, status: "successful", userID: doc._id};
                });
            return result;
        } catch (error) {
            console.error("Error in upsertAuthData at authService.js..." + error);
            result = {httpStatus: httpStatus.INTERNAL_SERVER_ERROR, status: "failed", errorDetails: error};
            return result;
        }
    },

    getCredentials() {
        let response;
        const clientId = process.env.SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
        const credentials = {clientId, redirectUri};
        response.json(credentials);
        return response;
    }
}

