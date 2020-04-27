const SpotifyWebApi = require('spotify-web-api-node');

const credentials = {
    clientId: 'someClientId',
    clientSecret: 'someClientSecret',
    redirectUri: 'http://www.michaelthelin.se/test-callback'
};

const spotifyApi = new SpotifyWebApi(credentials);

module.exports = spotifyApi;