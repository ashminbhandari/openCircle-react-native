const mongoose = require('mongoose');
const connection = mongoose.connection; //Get the database connection
const httpStatus = require('http-status-codes');
const User = require('../database/models/users');
const spotifyApi = require('../spotifyAPI/api');
const CryptoJS = require('crypto-js');

//Extracting the user id
//
module.exports = {
    async updateSessionLocation(req) {
        let result;
        try {
            //Gather information from the request object
            let user = req.session.passport.user; //User ID
            let latitude = req.body.location.coords.latitude; //User's latitude
            let longitude = req.body.location.coords.longitude; //User's longitude

            //Add the location to user's session
            req.session.latitude = latitude;
            req.session.longitude = longitude;

            //If we reach here means the update was without trouble
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
            };

            return result;
        } catch (error) {
            console.log('Error at updateSessionLocation in spotifyService', error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'Session location could not be updated...'
            };
            return result;
        }
    },

    async gatherOnlineUsers() {
        let result;
        try {
            //Get the session collection
            let sessionColl = await connection.collection('sessions');

            //Get a sample of 100 users
            let sample = await sessionColl.aggregate({$sample: {size: 100}});

            //Convert the sample cursor object into an array
            let sampleArray = await sample.toArray();

            //Map into an array of user ID's and their location
            let userArray = sampleArray.map(user => {
                return {
                    id: JSON.parse(user.session).passport.user,
                    latitude: JSON.parse(user.session).latitude,
                    longitude: JSON.parse(user.session).longitude
                }
            });

            //If we reached here means everything went OK, so construct the response object
            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
                data: userArray
            };

            return result;
        } catch (error) {
            console.log(error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'User data could not be gathered.'
            };
            return result;
        }
    },

    async getUserSpotifyData(user) {
        try {
            //Find the user by their ID
            let theUser = await User.findById(user);

            //Refresh the access token
            spotifyApi.setRefreshToken(CryptoJS.AES.decrypt(theUser.refresh_token, process.env.TOKENS_HASHER).toString(CryptoJS.enc.Utf8));
            let response = await spotifyApi.refreshAccessToken();
            let accessToken = response.body.access_token;

            spotifyApi.setAccessToken(accessToken);

            let topTracks = await spotifyApi.getMyTopTracks({
                time_range: 'long_term',
                limit: 20
            });

            let topArtists = await spotifyApi.getMyTopArtists({
                time_range: 'long_term',
                limit: 20
            });

            let recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
                limit: 20
            });

            let savedTracks = await spotifyApi.getMySavedTracks({
                limit: 20
            });

            let currentlyPlaying = await spotifyApi.getMyCurrentPlayingTrack();

            let filterTopArtists = topArtists.body.items.map((artist) => {
                return ({
                    title: artist.name ? artist.name : '',
                    id: artist.id ? artist.id : '',
                    image: artist.images[0].url ? artist.images[0].url : '',
                    subtitle: artist.genres ? artist.genres.slice(0, Math.min(artist.genres.length, 3)).join(", ") : []
                })
            });

            let filterTopTracks = topTracks.body.items.map((track) => {
                return ({
                    title: track.name ? track.name : '',
                    id: track.id ? track.id : '',
                    image: track.album.images[0].url ? track.album.images[0].url : '',
                    subtitle: track.artists[0].name ? track.artists[0].name : '',
                    preview: track.preview_url
                })
            });

            let filterRecentlyPlayed = recentlyPlayed.body.items.map((item) => {
                if (item.track) {
                    return ({
                        title: item.track.name ? item.track.name : '',
                        image: item.track.album.images[0].url ? item.track.album.images[0].url : '',
                        id: item.track.id ? item.track.id : '',
                        time: item.played_at ? item.played_at : '',
                        subtitle: item.track.artists[0].name ? item.track.artists[0].name : '',
                        preview: item.track.preview_url
                    })
                }
            })

            let filterCurrentlyPlaying = '';
            if (currentlyPlaying.body.item) {
                filterCurrentlyPlaying = {
                    title: currentlyPlaying.body.item.name ? currentlyPlaying.body.item.name : '',
                    id: currentlyPlaying.body.item.id ? currentlyPlaying.body.item.id : '',
                    image: currentlyPlaying.body.item.album.images[0].url ? currentlyPlaying.body.item.album.images[0].url : '',
                    subtitle: currentlyPlaying.body.item.artists[0].name ? currentlyPlaying.body.item.artists[0].name : '',
                    preview: currentlyPlaying.body.item.preview_url
                }
            }

            let filterSavedTracks = savedTracks.body.items.map((item) => {
                return ({
                    title: item.track.name ? item.track.name : '',
                    id: item.track.id ? item.track.id : '',
                    url: item.track.external_urls.spotify ? item.track.external_urls.spotify : '',
                    image: item.track.album.images[0].url ? item.track.album.images[0].url : '',
                    subtitle: item.track.artists[0].name ? item.track.artists[0].name : '',
                    time: item.added_at ? item.added_at : '',
                    preview: item.track.preview_url
                })
            })

            let result = {
                httpStatus: httpStatus.OK,
                status: 'success',
                userName: theUser.name,
                topTracks: filterTopTracks,
                topArtists: filterTopArtists,
                recentlyPlayed: filterRecentlyPlayed,
                currentlyPlaying: filterCurrentlyPlaying,
                savedTracks: filterSavedTracks
            };

            return result;
        } catch (error) {
            console.debug('Error at getUserSpotify in spotifyService', error);
            return {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
                errorDetails: 'INTERNAL SERVER ERROR'
            }
        }
    },

    async saveTracks(user, tracks) {
        let result;

        try {
            //Find the user by their ID
            let theUser = await User.findById(user);

            //Refresh the access token
            spotifyApi.setRefreshToken(CryptoJS.AES.decrypt(theUser.refresh_token, process.env.TOKENS_HASHER).toString(CryptoJS.enc.Utf8));
            let response = await spotifyApi.refreshAccessToken();
            let accessToken = response.body.access_token;

            //Set the token
            spotifyApi.setAccessToken(accessToken);

            //Add the tracks
            await spotifyApi.addToMySavedTracks(tracks);

            result = {
                httpStatus: httpStatus.OK,
                status: 'success',
            };

            return result;
        } catch (error) {
            console.log(error);
            result = {
                httpStatus: httpStatus.INTERNAL_SERVER_ERROR,
                status: 'failed',
            };
            return result;
        }
    }
};