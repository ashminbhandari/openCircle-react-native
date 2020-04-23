const authController = require('../controllers/authController');
var express = require('express');
var router = express.Router();

//Get request for Spotify credentials
router.get('/credentials', function (req, res) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    const credentials = {clientId, redirectUri};
    res.json(credentials);
});

router.route('/token').post(authController.getAccessToken);
//POST request once user obtains their Spotify authorization code
// router.post('/token', (req, res) => {
//
//     //Authorization code is sent as a request
//     const authCode = req.body.code;
//
//     //Get the access token information
//     getAccessToken(authCode)
//         .then(val => {
//             let tokenData = {
//                 code: authCode,
//                 accessToken: val.accessToken,
//                 refreshToken: val.refreshToken,
//                 expirationTime: val.expirationTime
//             };
//
//             //Logs
//             console.log("Token data for online user generated: ");
//             console.log(tokenData);
//
//             //Sign with JWT and send
//             jwt.sign(tokenData, process.env.JWT_SECRET_KEY, (err, token) => {
//                 res.json({
//                     token
//                 })
//             });
//         }).catch((err) => {
//             console.log(err);
//             res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Sorry, error getting token.');
//     });
// });
//
// //Given an authorization code, gets an access token
// const getAccessToken = async (authorizationCode) => {
//     try {
//         const credsB64 = btoa.encode(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
//         let requestBody = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}` //refresh if token expired
//         const response = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Basic ${credsB64}`,
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: requestBody,
//         });
//
//         const responseJson = await response.json();
//         if (responseJson.error != undefined) {
//             const message = 'Error during authorization code validation';
//             console.log(message);
//             throw new Error(message);
//         }
//
//         return {
//             accessToken: responseJson.access_token,
//             refreshToken: responseJson.refresh_token,
//             expirationTime: new Date().getTime() + responseJson.expires_in * 1000
//         }
//     } catch (err) {
//         throw err;
//     }
// };

module.exports = router;