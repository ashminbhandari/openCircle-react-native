const fetch = require('node-fetch');
const btoa = require('base-64');
const Users = require('../database/models/users');
const httpStatus = require('http-status-codes');
const spotifyApi = require('../spotifyAPI/api');
const encryption = require('../authentication/encryption');
const CryptoJS = require('crypto-js');
const moment = require('moment');
const sgMail = require('@sendgrid/mail');

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
                access_token: CryptoJS.AES.encrypt(tokenInfo.access_token, process.env.TOKENS_HASHER),
                refresh_token: CryptoJS.AES.encrypt(tokenInfo.refresh_token, process.env.TOKENS_HASHER),
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

    async generateToken(email) {
        let result;

        try {
            //Generate the reset token
            let resetToken = Math.floor(Math.random() * 90000) + 10000;

            let user = await Users.findOne({email: email});

            if (user) {
                await Users.updateOne({email: email}, {
                    passwordResetToken: resetToken,
                    passwordResetTokenExpirationTime: moment().format()
                });

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);

                const msg = {
                    to: email,
                    from: 'opencircle.services@gmail.com',
                    subject: 'Your openCircle password reset code',
                    text: 'Hey openCircle user,\n\nSeems like you requested a password request code for your openCircle account.\n\nYour 5 digit code is: ' + resetToken + '\n\nThank you for using openCircle. Happy Discovering!',
                };

                await sgMail.send(msg);

                //Send back Spotify ID
                result = {
                    httpStatus: httpStatus.OK, status: 'success'
                };
                return result;
            } else throw new Error('Could not find user');
        } catch (error) {
            console.log(error);
            return {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: error};
        }
    },

    async checkCode(email, code) {
        let result;

        try {
            let user = await Users.findOne({email: email});

            if (user) {
                let passedTimeAfterTokenSent = moment().diff(user.passwordResetTokenExpirationTime, 'minutes');

                if (passedTimeAfterTokenSent < 10 && user.passwordResetToken == code) {
                    //Send back Spotify ID
                    result = {
                        httpStatus: httpStatus.OK, status: 'success'
                    };
                    return result;
                } else throw new Error('Code did not match');
            } else throw new Error('Could not find user');
        } catch (error) {
            console.log(error);
            return {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: error};
        }
    },

    async newPassword(email, password) {
        let result;

        try {
            let updated = await Users.updateOne({email: email}, {
                password: encryption.createPasswordHash(password)
            });

            if(updated.nModified == 1) {
                result = {
                    httpStatus: httpStatus.OK, status: 'success'
                };
                return result;
            } else throw new Error('Could not change password');
        } catch (error) {
            console.log(error);
            return {httpStatus: httpStatus.BAD_REQUEST, status: "failed", errorDetails: error};
        }
    }
}



