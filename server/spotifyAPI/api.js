const SpotifyWebApi = require('spotify-web-api-node');

const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

const spotifyApi = new SpotifyWebApi(credentials);

module.exports = spotifyApi;